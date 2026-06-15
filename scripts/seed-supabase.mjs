#!/usr/bin/env node
/**
 * Pushes every markdown file in content/projects into the Supabase `projects`
 * table. Run once to seed, and again any time you want the DB to match the
 * markdown (it upserts on `slug`).
 *
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed-supabase.mjs
 *
 * (A .env / .env.local with those vars is also picked up automatically.)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, "..", "content", "projects");

// Lightweight .env loader (no extra deps).
for (const file of [".env.local", ".env"]) {
  const p = path.join(__dirname, "..", file);
  if (!fs.existsSync(p)) continue;
  for (const line of fs.readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "Missing SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY.\n" +
      "Set them in your environment or .env.local before seeding."
  );
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

function toRow(slug, raw) {
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    summary: data.summary ?? "",
    content: content.trim(),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    role: data.role ?? null,
    year: data.year ? String(data.year) : null,
    cover_image: data.coverImage ?? null,
    hero_image: data.heroImage ?? data.coverImage ?? null,
    live_url: data.liveUrl ?? null,
    repo_url: data.repoUrl ?? null,
    featured: Boolean(data.featured),
    published: data.published === undefined ? true : Boolean(data.published),
    sort_order: typeof data.sortOrder === "number" ? data.sortOrder : 999,
    published_at: data.publishedAt ? new Date(data.publishedAt).toISOString() : null,
  };
}

const files = fs
  .readdirSync(CONTENT_DIR)
  .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

const rows = files.map((file) =>
  toRow(file.replace(/\.mdx?$/, ""), fs.readFileSync(path.join(CONTENT_DIR, file), "utf8"))
);

const { error } = await supabase.from("projects").upsert(rows, { onConflict: "slug" });

if (error) {
  console.error("Seed failed:", error.message);
  process.exit(1);
}

console.log(`Seeded ${rows.length} project(s): ${rows.map((r) => r.slug).join(", ")}`);
