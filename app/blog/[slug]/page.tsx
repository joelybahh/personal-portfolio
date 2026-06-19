import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPost, getPosts } from "@/lib/blog";
import { site } from "@/lib/site";
import { stripTitleMarkup } from "@/lib/format";
import { Markdown } from "@/components/Markdown";
import { HighlightedTitle } from "@/components/sketch/HighlightedTitle";
import { ArrowLeftIcon } from "@/components/icons";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

function formatDate(value?: string) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };

  const title = stripTitleMarkup(post.title);
  const ogImage = `/blog/${post.slug}/opengraph-image`;
  return {
    title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description: post.summary,
      url: `${site.url}/blog/${post.slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [site.url],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.summary,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const published = formatDate(post.publishedAt);
  const image = post.heroImage ?? post.coverImage;
  const plainTitle = stripTitleMarkup(post.title);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: stripTitleMarkup(post.title),
    description: post.summary,
    image: `${site.url}/blog/${post.slug}/opengraph-image`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: { "@type": "Person", name: site.name },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.url}/blog/${post.slug}`,
    },
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-ink-soft transition-colors hover:text-marker dark:text-paper/70"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to writing
      </Link>

      <header className="mt-6">
        <h1 className="mt-1 font-sans text-4xl font-black tracking-tight sm:text-5xl">
          <HighlightedTitle text={post.title} />
        </h1>
        <p className="mt-4 font-sans text-lg leading-relaxed text-ink-soft dark:text-paper/75">
          {post.summary}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-sm text-ink-faint">
          {published && <span>{published}</span>}
          {published && <span aria-hidden>·</span>}
          <span>{post.readingTime} min read</span>
        </div>

        {post.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {image && (
        <div className="relative my-8 aspect-[16/9] w-full overflow-hidden rounded-sketch border-2 border-ink shadow-sketch-lg dark:border-paper/80">
          <Image
            src={image}
            alt={plainTitle}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      )}

      <div className={image ? undefined : "mt-8"}>
        <Markdown>{post.content}</Markdown>
      </div>

      <div className="mt-12 border-t-2 border-dashed border-ink/25 pt-6 dark:border-paper/20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-ink-soft transition-colors hover:text-marker dark:text-paper/70"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          All writing
        </Link>
      </div>
    </article>
  );
}
