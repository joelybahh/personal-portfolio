import Link from "next/link";
import { getProjects } from "@/lib/projects";
import { getPosts } from "@/lib/blog";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { LatestPost } from "@/components/blog/LatestPost";
import { SectionHeading } from "./SectionHeading";
import { ArrowUpRightIcon } from "@/components/icons";

export async function Work() {
  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);
  const latestPost = posts[0];

  return (
    <section
      id="work"
      className="scroll-mt-20 border-t-2 border-dashed border-ink/25 bg-paper-soft py-16 dark:border-paper/15 dark:bg-chalk-soft sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading eyebrow="selected work" title="Things I've built" />

        <ProjectGrid projects={projects} limit={3} />

        <div className="mt-10 text-center">
          <Link href="/projects" className="btn-ghost-sketch">
            See all {projects.length} projects
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </div>

        {latestPost && (
          <div className="mt-16 border-t-2 border-dashed border-ink/20 pt-12 dark:border-paper/15">
            <SectionHeading eyebrow="thinking out loud" title="Things I wrote" />

            <LatestPost post={latestPost} />

            <div className="mt-10 text-center">
              <Link href="/blog" className="btn-ghost-sketch">
                See all writing
                <ArrowUpRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
