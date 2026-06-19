import type { Metadata } from "next";
import { getPosts } from "@/lib/blog";
import { BlogList } from "@/components/blog/BlogList";
import { Star } from "@/components/sketch/Doodles";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays and notes by Joel Gabriel on software engineering, AI, and building products.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <p className="eyebrow mb-1 inline-flex items-center gap-2">
        <Star className="h-4 w-4" /> thinking out loud
      </p>
      <h1 className="section-title text-balance">Writing</h1>
      <p className="mt-4 max-w-2xl font-sans text-lg leading-relaxed text-ink-soft dark:text-paper/70">
        Essays and notes on software engineering, AI, and the realities of shipping products — the stuff I keep coming back to.
      </p>

      <div className="mt-10">
        <BlogList posts={posts} />
      </div>
    </div>
  );
}
