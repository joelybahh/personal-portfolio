import Link from "next/link";
import Image from "next/image";
import type { ProjectMeta } from "@/lib/types";
import { ArrowUpRightIcon } from "@/components/icons";

export function ProjectCard({ project, priority = false }: { project: ProjectMeta; priority?: boolean }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="sketch-card group flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-sketch-lg"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b-2 border-ink dark:border-paper/80">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-paper-soft font-hand text-2xl text-ink-faint dark:bg-chalk">
            {project.title}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h3 className="font-sans text-lg font-extrabold tracking-tight">{project.title}</h3>
          <ArrowUpRightIcon className="h-5 w-5 shrink-0 text-ink-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-marker" />
        </div>

        {(project.role || project.year) && (
          <p className="mb-2 font-hand text-base text-marker">
            {[project.role, project.year].filter(Boolean).join(" · ")}
          </p>
        )}

        <p className="mb-4 flex-1 font-sans text-sm leading-relaxed text-ink-soft dark:text-paper/70">
          {project.summary}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
