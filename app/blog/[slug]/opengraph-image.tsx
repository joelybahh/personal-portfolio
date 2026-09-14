import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/blog";
import { stripTitleMarkup } from "@/lib/format";
import { site } from "@/lib/site";
import { createBlogPostOgImage, ogImageContentType, ogImageSize } from "@/lib/og-image";

export const alt = "Blog post";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return createBlogPostOgImage({
    title: stripTitleMarkup(post.title),
    summary: post.summary,
    publishedAt: post.publishedAt,
    siteName: site.name,
  });
}
