import { about } from "@/lib/profile";
import { SectionHeading } from "./SectionHeading";
import { Scribble } from "@/components/sketch/Scribble";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-y-2 border-dashed border-ink/25 bg-paper-soft py-16 dark:border-paper/15 dark:bg-chalk-soft sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading eyebrow="a bit about me" title={about.heading} />
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr]">
          <div className="space-y-5">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="font-sans text-lg leading-relaxed text-ink-soft dark:text-paper/75">
                {p}
              </p>
            ))}
          </div>
          <ul className="space-y-4">
            {about.stats.map((stat, i) => (
              <li key={stat.label} className="sketch-card flex items-baseline gap-4 p-5">
                <span className="font-sans text-3xl font-black tracking-tight">
                  {i === 0 ? (
                    <Scribble type="highlight" color="highlight">
                      {stat.value}
                    </Scribble>
                  ) : (
                    stat.value
                  )}
                </span>
                <span className="font-hand text-lg text-ink-soft dark:text-paper/70">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
