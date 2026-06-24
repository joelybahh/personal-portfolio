import { skillGroups } from "@/lib/profile";
import { SectionHeading } from "./SectionHeading";

const dot: Record<string, string> = {
  marker: "bg-marker",
  coral: "bg-coral",
  leaf: "bg-leaf",
  ink: "bg-ink dark:bg-paper",
};

export function Skills() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading eyebrow="the toolbox" title="What I work with" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <div key={group.label} className={`sketch-card p-5 ${i % 2 === 0 ? "-rotate-1" : "rotate-1"}`}>
            <div className="mb-3 flex items-center gap-2">
              <span className={`h-3 w-3 rounded-full ${dot[group.accent]}`} />
              <h3 className="font-hand text-2xl">{group.label}</h3>
            </div>
            <ul className="flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <li key={skill} className="chip">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
