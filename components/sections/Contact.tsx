import { site } from "@/lib/site";
import { Scribble } from "@/components/sketch/Scribble";
import { SocialLinks } from "@/components/site/SocialLinks";
import { MailIcon } from "@/components/icons";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t-2 border-dashed border-ink/25 bg-paper-soft py-20 dark:border-paper/15 dark:bg-chalk-soft">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="eyebrow mb-1">say hello</p>
        <h2 className="section-title text-balance">
          Got something{" "}
          <Scribble type="highlight" color="highlight">
            worth building?
          </Scribble>
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-sans text-lg leading-relaxed text-ink-soft dark:text-paper/70">
          I&apos;m always up for an interesting problem. The fastest way to reach me is email — or find me on any of the usual places.
        </p>
        <div className="mt-8 flex flex-col items-center gap-5">
          <a href={`mailto:${site.email}`} className="btn-sketch text-base">
            <MailIcon className="h-5 w-5" />
            {site.email}
          </a>
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}
