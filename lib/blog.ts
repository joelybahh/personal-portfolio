import "server-only";
import { getSupabase } from "./supabase";
import { readLocalPosts, estimateReadingTime } from "./content";
import type { BlogPost } from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any */
function fromRow(row: any): BlogPost {
  const content = row.content ?? "";
  return {
    slug: row.slug,
    title: row.title,
    summary: row.summary ?? "",
    content,
    tags: Array.isArray(row.tags) ? row.tags : [],
    coverImage: row.cover_image ?? undefined,
    heroImage: row.hero_image ?? row.cover_image ?? undefined,
    readingTime:
      typeof row.reading_time === "number" && row.reading_time > 0
        ? row.reading_time
        : estimateReadingTime(content),
    featured: Boolean(row.featured),
    publishedAt: row.published_at ?? undefined,
    updatedAt: row.updated_at ?? undefined,
    sortOrder: typeof row.sort_order === "number" ? row.sort_order : 999,
  };
}

function sortPosts(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    const ad = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const bd = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return bd - ad;
  });
}

/**
 * Source of truth: Supabase (`posts` table) when configured, otherwise the
 * local markdown files in /content/blog. Either way the post list is fully
 * auto-indexed — add a row or a markdown file and it appears on the site,
 * sitemap and feeds.
 */
export async function getPosts(): Promise<BlogPost[]> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("published", true);
    if (error) {
      console.error("[blog] Supabase error, using local fallback:", error.message);
      return sortPosts(readLocalPosts());
    }
    if (data && data.length > 0) return sortPosts(data.map(fromRow));
  }
  return sortPosts(readLocalPosts());
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  return (await getPosts()).filter((p) => p.featured);
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getPostSlugs(): Promise<string[]> {
  return (await getPosts()).map((p) => p.slug);
}
