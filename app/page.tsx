import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Work } from "@/components/sections/Work";
import { Awards } from "@/components/sections/Awards";
import { Contact } from "@/components/sections/Contact";
import { site } from "@/lib/site";

export const revalidate = 3600;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  image: `${site.url}${site.profileImage}`,
  description: site.description,
  sameAs: site.socials.map((s) => s.href),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Hero />
      <About />
      <Skills />
      <Work />
      <Awards />
      <Contact />
    </>
  );
}
