import Link from "next/link";
import type { BlogPostMeta } from "@/lib/types";
import { HighlightedTitle } from "@/components/sketch/HighlightedTitle";
import { ArrowUpRightIcon } from "@/components/icons";

function formatDate(value?: string) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-AU", { year: "numeric", month: "short", day: "numeric" });
}

/** Wide, single-post teaser used on the home page under the work grid. */
export function LatestPost({ post }: { post: BlogPostMeta }) {
  const date = formatDate(post.publishedAt);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="sketch-card group block p-6 hover:shadow-sketch-lg sm:p-8"
    >
      <div className="flex items-center gap-2 font-mono text-xs text-ink-faint">
        <span className="font-hand text-base text-marker">Latest</span>
        <span aria-hidden>·</span>
        {date && <span>{date}</span>}
        {date && <span aria-hidden>·</span>}
        <span>{post.readingTime} min read</span>
      </div>

      <div className="mt-2 flex items-start justify-between gap-3">
        <h3 className="font-sans text-2xl font-extrabold tracking-tight sm:text-3xl">
          <HighlightedTitle text={post.title} />
        </h3>
        <ArrowUpRightIcon className="mt-1.5 h-6 w-6 shrink-0 text-ink-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-marker" />
      </div>

      <p className="mt-3 max-w-3xl font-sans text-base leading-relaxed text-ink-soft dark:text-paper/70">
        {post.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {post.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="chip">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
