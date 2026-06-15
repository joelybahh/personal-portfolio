import type { Metadata } from "next";
import { getProjects } from "@/lib/projects";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { Star } from "@/components/sketch/Doodles";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects built by Joel Gabriel — Inspace platforms at work, and personal products like Roll With It, GoWith and Mailman.",
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
        Commercial platforms from my day job, and personal products I ship on my own time. Filter by context, or click any card for the deeper story.
      </p>

      <div className="mt-10">
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
