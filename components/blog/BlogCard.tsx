import Link from "next/link";
import Image from "next/image";
import type { BlogPostMeta } from "@/lib/types";
import { stripTitleMarkup } from "@/lib/format";
import { HighlightedTitle } from "@/components/sketch/HighlightedTitle";
import { ArrowUpRightIcon } from "@/components/icons";

function formatDate(value?: string) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-AU", { year: "numeric", month: "short", day: "numeric" });
}

export function BlogCard({ post }: { post: BlogPostMeta }) {
  const date = formatDate(post.publishedAt);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="sketch-card group flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-sketch-lg"
    >
      {post.coverImage && (
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b-2 border-ink dark:border-paper/80">
          <Image
            src={post.coverImage}
            alt={stripTitleMarkup(post.title)}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2 font-mono text-xs text-ink-faint">
          {date && <span>{date}</span>}
          {date && <span aria-hidden>·</span>}
          <span>{post.readingTime} min read</span>
        </div>

        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-sans text-xl font-extrabold tracking-tight">
            <HighlightedTitle text={post.title} />
          </h3>
          <ArrowUpRightIcon className="mt-1 h-5 w-5 shrink-0 text-ink-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-marker" />
        </div>

        <p className="mb-4 flex-1 font-sans text-sm leading-relaxed text-ink-soft dark:text-paper/70">
          {post.summary}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
