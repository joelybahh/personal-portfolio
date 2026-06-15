import type { Metadata } from "next";
import { getProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Star } from "@/components/sketch/Doodles";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Work",
  description: "Projects and platforms built by Joel Gabriel — 3D web, CMS systems and developer tooling.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsIndexPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <p className="eyebrow mb-1 inline-flex items-center gap-2">
        <Star className="h-4 w-4" /> the full list
      </p>
      <h1 className="section-title text-balance">Everything I&apos;ve built</h1>
      <p className="mt-4 max-w-2xl font-sans text-lg leading-relaxed text-ink-soft dark:text-paper/70">
        Commercial platforms, 3D web experiments and the odd developer tool. Click any card for the deeper story.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} priority={i < 3} />
        ))}
      </div>
    </div>
  );
}
