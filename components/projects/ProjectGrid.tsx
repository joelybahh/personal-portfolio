"use client";

import { useMemo, useState } from "react";
import type { ProjectCategory, ProjectMeta } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";

type Filter = "all" | ProjectCategory;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "work", label: "At work" },
  { id: "personal", label: "On the side" },
];

export function ProjectGrid({
  projects,
  limit,
}: {
  projects: ProjectMeta[];
  /** When set, only show this many projects (used on the home page). */
  limit?: number;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    const list =
      filter === "all" ? projects : projects.filter((p) => p.category === filter);
    return limit ? list.slice(0, limit) : list;
  }, [projects, filter, limit]);

  const counts = useMemo(
    () => ({
      all: projects.length,
      work: projects.filter((p) => p.category === "work").length,
      personal: projects.filter((p) => p.category === "personal").length,
    }),
    [projects],
  );

  return (
    <div>
      <div
        className="mb-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter projects"
      >
        {filters.map(({ id, label }) => {
          const active = filter === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(id)}
              className={
                active
                  ? "btn-sketch py-2 text-sm"
                  : "btn-ghost-sketch py-2 text-sm"
              }
            >
              {label}
              <span className="font-mono text-xs opacity-70">({counts[id]})</span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="font-sans text-ink-soft dark:text-paper/70">
          Nothing in this bucket yet — check another filter.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <ProjectCard key={project.slug} project={project} priority={i < 3} />
          ))}
        </div>
      )}
    </div>
  );
}
