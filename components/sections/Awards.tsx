import { awards } from "@/lib/profile";
import { SectionHeading } from "./SectionHeading";

export function Awards() {
  return (
    <section id="awards" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading eyebrow="the receipts" title="Awards, honours & certifications" />
      <div className="grid gap-5 sm:grid-cols-2">
        {awards.map((award, i) => (
          <div key={award.title} className={`sketch-card p-5 ${i % 2 === 0 ? "-rotate-1" : "rotate-1"}`}>
            <div className="flex items-start gap-4">
              <span className="select-none text-3xl leading-none" aria-hidden>
                {award.icon}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-sans text-base font-extrabold tracking-tight">{award.title}</h3>
                  {award.year && (
                    <span className="font-hand text-base text-marker">{award.year}</span>
                  )}
                </div>
                <p className="mt-1.5 font-sans text-sm leading-relaxed text-ink-soft dark:text-paper/70">
                  {award.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
