import "server-only";
import { getSupabase } from "./supabase";
import { readLocalProjects } from "./content";
import type { Project } from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any */
function fromRow(row: any): Project {
  return {
    slug: row.slug,
    title: row.title,
    summary: row.summary ?? "",
    content: row.content ?? "",
    tags: Array.isArray(row.tags) ? row.tags : [],
    role: row.role ?? undefined,
    year: row.year ?? undefined,
    coverImage: row.cover_image ?? undefined,
    heroImage: row.hero_image ?? row.cover_image ?? undefined,
    liveUrl: row.live_url ?? undefined,
    repoUrl: row.repo_url ?? undefined,
    featured: Boolean(row.featured),
    publishedAt: row.published_at ?? undefined,
    updatedAt: row.updated_at ?? undefined,
    sortOrder: typeof row.sort_order === "number" ? row.sort_order : 999,
  };
}

function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    const ad = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const bd = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return bd - ad;
  });
}

/**
 * Source of truth: Supabase (`projects` table) when configured, otherwise the
 * local markdown files. Either way the project list is fully auto-indexed —
 * add a row or a markdown file and it appears on the site, sitemap and feeds.
 */
export async function getProjects(): Promise<Project[]> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("published", true);
    if (error) {
      console.error("[projects] Supabase error, using local fallback:", error.message);
      return sortProjects(readLocalProjects());
    }
    if (data && data.length > 0) return sortProjects(data.map(fromRow));
  }
  return sortProjects(readLocalProjects());
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.featured);
}

export async function getProject(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

export async function getProjectSlugs(): Promise<string[]> {
  return (await getProjects()).map((p) => p.slug);
}
