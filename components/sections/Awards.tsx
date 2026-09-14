import { awards } from "@/lib/profile";
import { SectionHeading } from "./SectionHeading";

export function Awards() {
  return (
    <section id="awards" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading eyebrow="the receipts" title="Awards, honours & certifications" />
      <div className="space-y-3">
        {awards.map((award, i) => (
          <div
            key={award.title}
            className={`sketch-card flex items-center gap-4 px-5 py-3 ${i % 2 === 0 ? "-rotate-[0.4deg]" : "rotate-[0.4deg]"}`}
          >
            <span className="select-none text-2xl leading-none" aria-hidden>
              {award.icon}
            </span>
            <h3 className="flex-1 font-sans text-sm font-extrabold tracking-tight sm:text-base">
              {award.title}
            </h3>
            {award.year && (
              <span className="shrink-0 font-hand text-base text-marker">{award.year}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
