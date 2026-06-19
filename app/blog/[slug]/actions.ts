"use server";

import { syncPostPulse, type PostPulse, type ReactionId } from "@/lib/reactions";

export async function applyPulseTake(
  postSlug: string,
  reaction: ReactionId,
): Promise<{ ok: true; pulse: PostPulse } | { ok: false; error: string }> {
  return syncPostPulse(postSlug, reaction);
}
