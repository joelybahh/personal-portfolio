import "server-only";

import { createHash, randomUUID } from "node:crypto";
import { cookies, headers } from "next/headers";
import { getSupabaseAdmin, isReactionsConfigured } from "./supabase-admin";
import {
  REACTION_IDS,
  emptyReactionCounts,
  type PostPulse,
  type ReactionId,
} from "./reactions-shared";

export type { PostPulse, ReactionId } from "./reactions-shared";
export { REACTION_OPTIONS } from "./reactions-shared";

/** HttpOnly device token — opaque name on purpose. */
const VOTER_COOKIE = "_bpv";

function voterSecret() {
  return process.env.REACTIONS_VOTER_SECRET ?? "";
}

function hashVoter(token: string) {
  return createHash("sha256").update(`${voterSecret()}:voter:${token}`).digest("hex");
}

function hashIp(ip: string) {
  return createHash("sha256").update(`${voterSecret()}:ip:${ip}`).digest("hex").slice(0, 40);
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

async function clientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return h.get("x-real-ip") ?? "unknown";
}

/** Read voter hash from cookie, optionally minting a new HttpOnly token. */
async function voterHash(mint: boolean): Promise<string | null> {
  if (!voterSecret()) return null;

  const jar = await cookies();
  let token = jar.get(VOTER_COOKIE)?.value;

  if (!token || !isUuid(token)) {
    if (!mint) return null;
    token = randomUUID();
    jar.set(VOTER_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 400,
      path: "/",
    });
  }

  return hashVoter(token);
}

async function consumeRateLimit(
  bucket: string,
  limit: number,
  windowSeconds: number,
): Promise<boolean> {
  const admin = getSupabaseAdmin();
  if (!admin) return false;

  const now = new Date();
  const { data } = await admin
    .from("reaction_rate_limits")
    .select("hits, window_start")
    .eq("bucket", bucket)
    .maybeSingle();

  if (!data) {
    await admin.from("reaction_rate_limits").insert({
      bucket,
      hits: 1,
      window_start: now.toISOString(),
    });
    return true;
  }

  const elapsed = (now.getTime() - new Date(data.window_start).getTime()) / 1000;

  if (elapsed > windowSeconds) {
    await admin
      .from("reaction_rate_limits")
      .update({ hits: 1, window_start: now.toISOString() })
      .eq("bucket", bucket);
    return true;
  }

  if (data.hits >= limit) return false;

  await admin
    .from("reaction_rate_limits")
    .update({ hits: data.hits + 1 })
    .eq("bucket", bucket);

  return true;
}

async function fetchCounts(postSlug: string): Promise<Record<ReactionId, number>> {
  const admin = getSupabaseAdmin();
  const counts = emptyReactionCounts();
  if (!admin) return counts;

  const { data, error } = await admin
    .from("post_reaction_totals")
    .select("reaction, total")
    .eq("post_slug", postSlug);

  if (error) {
    console.error("[reactions] count fetch failed:", error.message);
    return counts;
  }

  for (const row of data ?? []) {
    if (REACTION_IDS.has(row.reaction)) {
      counts[row.reaction as ReactionId] = row.total;
    }
  }

  return counts;
}

async function fetchYours(postSlug: string, voter: string | null): Promise<ReactionId | null> {
  if (!voter) return null;
  const admin = getSupabaseAdmin();
  if (!admin) return null;

  const { data, error } = await admin
    .from("post_reactions")
    .select("reaction")
    .eq("post_slug", postSlug)
    .eq("voter_hash", voter)
    .maybeSingle();

  if (error || !data || !REACTION_IDS.has(data.reaction)) return null;
  return data.reaction as ReactionId;
}

export async function getPostPulse(postSlug: string): Promise<PostPulse> {
  if (!isReactionsConfigured()) {
    return { enabled: false, counts: emptyReactionCounts(), yours: null };
  }

  const voter = await voterHash(false);
  const [counts, yours] = await Promise.all([
    fetchCounts(postSlug),
    fetchYours(postSlug, voter),
  ]);

  return { enabled: true, counts, yours };
}

export async function syncPostPulse(
  postSlug: string,
  reaction: string,
): Promise<{ ok: true; pulse: PostPulse } | { ok: false; error: string }> {
  if (!isReactionsConfigured()) {
    return { ok: false, error: "Reactions are not configured." };
  }

  if (!REACTION_IDS.has(reaction)) {
    return { ok: false, error: "Unknown take." };
  }

  const voter = await voterHash(true);
  if (!voter) {
    return { ok: false, error: "Could not mint device token." };
  }

  const ip = await clientIp();
  const ipBucket = `ip:${hashIp(ip)}`;
  const voterBucket = `voter:${voter.slice(0, 40)}`;

  const [ipOk, voterOk] = await Promise.all([
    consumeRateLimit(ipBucket, 48, 3600),
    consumeRateLimit(voterBucket, 24, 3600),
  ]);

  if (!ipOk || !voterOk) {
    return { ok: false, error: "Slow down — try again in a bit." };
  }

  const admin = getSupabaseAdmin();
  if (!admin) {
    return { ok: false, error: "Reactions are not configured." };
  }

  const { data: existing } = await admin
    .from("post_reactions")
    .select("reaction, updated_at")
    .eq("post_slug", postSlug)
    .eq("voter_hash", voter)
    .maybeSingle();

  if (existing) {
    const elapsed = Date.now() - new Date(existing.updated_at).getTime();
    if (elapsed < 2000) {
      return { ok: false, error: "Give it a second before switching." };
    }
    if (existing.reaction === reaction) {
      const pulse = await getPostPulse(postSlug);
      return { ok: true, pulse };
    }
  }

  const { error } = await admin.from("post_reactions").upsert(
    {
      post_slug: postSlug,
      reaction,
      voter_hash: voter,
    },
    { onConflict: "post_slug,voter_hash" },
  );

  if (error) {
    console.error("[reactions] upsert failed:", error.message);
    return { ok: false, error: "Could not save your take." };
  }

  const pulse = await getPostPulse(postSlug);
  return { ok: true, pulse };
}
