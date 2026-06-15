import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { Scribble } from "@/components/sketch/Scribble";
import { SocialLinks } from "@/components/site/SocialLinks";
import { CurvedArrow, Star } from "@/components/sketch/Doodles";
import { ArrowUpRightIcon, MailIcon } from "@/components/icons";

export function Hero() {
  return (
    <section className="relative mx-auto max-w-5xl px-4 pb-12 pt-14 sm:px-6 sm:pt-20">
      <div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 font-hand text-2xl text-marker">
            <Star className="h-5 w-5" /> Hey, I&apos;m
          </p>
          <h1 className="font-sans text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
            Joel Gabriel
          </h1>
          <p className="mt-5 max-w-xl font-sans text-xl leading-relaxed text-ink-soft dark:text-paper/75">
            A{" "}
            <Scribble type="underline" color="marker">
              lead full-stack engineer
            </Scribble>{" "}
            who&apos;s been shipping software since{" "}
            <Scribble type="circle" color="coral" strokeWidth={2}>
              2017
            </Scribble>
            . I build web & mobile products, CMS systems and developer tooling — and lead the teams that ship them.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/#work" className="btn-sketch">
              See my work
              <ArrowUpRightIcon className="h-4 w-4" />
            </Link>
            <Link href="/#contact" className="btn-ghost-sketch">
              <MailIcon className="h-4 w-4" />
              Get in touch
            </Link>
            <SocialLinks className="ml-1" />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xs md:max-w-none">
          <div className="relative mx-auto aspect-square w-56 rotate-2 overflow-hidden rounded-sketch border-2 border-ink shadow-sketch-lg dark:border-paper sm:w-64">
            <Image
              src={site.profileImage}
              alt={`${site.name} portrait`}
              fill
              priority
              sizes="256px"
              className="object-cover grayscale"
            />
          </div>
          <p className="absolute -bottom-2 right-2 -rotate-6 font-hand text-xl text-coral sm:right-6">
            that&apos;s me 👋
          </p>
          <CurvedArrow className="absolute -left-2 bottom-4 hidden h-12 w-12 -scale-x-100 text-marker/70 md:block" />
        </div>
      </div>
    </section>
  );
}
