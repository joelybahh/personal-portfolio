import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Project, BlogPost } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/** Rough words-per-minute estimate used for the "x min read" label. */
export function estimateReadingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function toProject(slug: string, raw: string): Project {
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    summary: data.summary ?? "",
    content: content.trim(),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    category: data.category === "personal" ? "personal" : "work",
    role: data.role ?? undefined,
    year: data.year ? String(data.year) : undefined,
    coverImage: data.coverImage ?? undefined,
    heroImage: data.heroImage ?? data.coverImage ?? undefined,
    liveUrl: data.liveUrl ?? undefined,
    repoUrl: data.repoUrl ?? undefined,
    featured: Boolean(data.featured),
    publishedAt: data.publishedAt ? String(data.publishedAt) : undefined,
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
    sortOrder: typeof data.sortOrder === "number" ? data.sortOrder : 999,
  };
}

/** Reads every markdown file in /content/projects as the local fallback source. */
export function readLocalProjects(): Project[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      return toProject(slug, raw);
    });
}

function toPost(slug: string, raw: string): BlogPost {
  const { data, content } = matter(raw);
  const body = content.trim();
  return {
    slug,
    title: data.title ?? slug,
    summary: data.summary ?? "",
    content: body,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    coverImage: data.coverImage ?? undefined,
    heroImage: data.heroImage ?? data.coverImage ?? undefined,
    readingTime: estimateReadingTime(body),
    featured: Boolean(data.featured),
    publishedAt: data.publishedAt ? String(data.publishedAt) : undefined,
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
    sortOrder: typeof data.sortOrder === "number" ? data.sortOrder : 999,
  };
}

/** Reads every markdown file in /content/blog as the local fallback source. */
export function readLocalPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      return toPost(slug, raw);
    });
}
