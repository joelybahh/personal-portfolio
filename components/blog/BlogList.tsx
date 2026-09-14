import type { BlogPostMeta } from "@/lib/types";
import { BlogCard } from "./BlogCard";

export function BlogList({ posts }: { posts: BlogPostMeta[] }) {
  if (posts.length === 0) {
    return (
      <p className="font-sans text-ink-soft dark:text-paper/70">
        Nothing published yet — check back soon.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
