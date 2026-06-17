#!/usr/bin/env node
/**
 * Pushes every markdown file in content/projects and content/blog into the
 * Supabase `projects` and `posts` tables. Run once to seed, and again any time
 * you want the DB to match the markdown (it upserts on `slug`).
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
const BLOG_DIR = path.join(__dirname, "..", "content", "blog");

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
    category: data.category === "personal" ? "personal" : "work",
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

function estimateReadingTime(markdown) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function toPostRow(slug, raw) {
  const { data, content } = matter(raw);
  const body = content.trim();
  return {
    slug,
    title: data.title ?? slug,
    summary: data.summary ?? "",
    content: body,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    cover_image: data.coverImage ?? null,
    hero_image: data.heroImage ?? data.coverImage ?? null,
    reading_time: estimateReadingTime(body),
    featured: Boolean(data.featured),
    published: data.published === undefined ? true : Boolean(data.published),
    sort_order: typeof data.sortOrder === "number" ? data.sortOrder : 999,
    published_at: data.publishedAt ? new Date(data.publishedAt).toISOString() : null,
  };
}

function readDir(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
}

async function seed(table, dir, mapper) {
  const files = readDir(dir);
  if (files.length === 0) {
    console.log(`No markdown in ${path.relative(process.cwd(), dir)} — skipping ${table}.`);
    return;
  }
  const rows = files.map((file) =>
    mapper(file.replace(/\.mdx?$/, ""), fs.readFileSync(path.join(dir, file), "utf8"))
  );
  const { error } = await supabase.from(table).upsert(rows, { onConflict: "slug" });
  if (error) {
    console.error(`Seed failed for ${table}:`, error.message);
    process.exit(1);
  }
  console.log(`Seeded ${rows.length} ${table} row(s): ${rows.map((r) => r.slug).join(", ")}`);
}

await seed("projects", CONTENT_DIR, toRow);
await seed("posts", BLOG_DIR, toPostRow);
