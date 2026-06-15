import Link from "next/link";
import { getProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionHeading } from "./SectionHeading";
import { ArrowUpRightIcon } from "@/components/icons";

export async function Work() {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.featured);
  // Show featured first, then fill up to 6 with the rest.
  const shown = [...featured, ...projects.filter((p) => !p.featured)].slice(0, 6);

  return (
    <section id="work" className="scroll-mt-20 border-t-2 border-dashed border-ink/25 bg-paper-soft py-16 dark:border-paper/15 dark:bg-chalk-soft sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="selected work" title="Things I've built">
            A mix of commercial platforms and personal tools. Each one&apos;s a deeper write-up — click in.
          </SectionHeading>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((project, i) => (
            <ProjectCard key={project.slug} project={project} priority={i < 3} />
          ))}
        </div>
        {projects.length > shown.length && (
          <div className="mt-10 text-center">
            <Link href="/projects" className="btn-ghost-sketch">
              See all {projects.length} projects
              <ArrowUpRightIcon className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
