import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Project } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

function toProject(slug: string, raw: string): Project {
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    summary: data.summary ?? "",
    content: content.trim(),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
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
