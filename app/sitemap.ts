import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";
import { getPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);

  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${site.url}/projects/${p.slug}`,
    lastModified: p.updatedAt ?? p.publishedAt ?? new Date().toISOString(),
    changeFrequency: "monthly",
    priority: p.featured ? 0.8 : 0.6,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: p.updatedAt ?? p.publishedAt ?? new Date().toISOString(),
    changeFrequency: "monthly",
    priority: p.featured ? 0.8 : 0.6,
  }));

  return [
    {
      url: site.url,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/projects`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${site.url}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...projectEntries,
    ...postEntries,
  ];
}
