import Link from "next/link";
import { getProjects } from "@/lib/projects";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { SectionHeading } from "./SectionHeading";
import { ArrowUpRightIcon } from "@/components/icons";

export async function Work() {
  const projects = await getProjects();

  return (
    <section id="work" className="scroll-mt-20 border-t-2 border-dashed border-ink/25 bg-paper-soft py-16 dark:border-paper/15 dark:bg-chalk-soft sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading eyebrow="selected work" title="Things I've built" />

        <ProjectGrid projects={projects} />

        <div className="mt-10 text-center">
          <Link href="/projects" className="btn-ghost-sketch">
            See all {projects.length} projects
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
