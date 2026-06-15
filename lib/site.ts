export const site = {
  name: "Joel Gabriel",
  role: "Lead Full-Stack Engineer",
  shortTagline: "Full-stack engineer & tech educator",
  description:
    "Joel Gabriel is a lead full-stack engineer with nearly a decade of experience across game, software and web development — building web and mobile products, CMS systems and developer tooling.",
  url: "https://joelgabriel.com.au",
  email: "hello@joelgabriel.com.au",
  locale: "en_AU",
  profileImage: "/assets/images/profile-1.png",
  ogImage: "/assets/images/og-image.jpg",
  nav: [
    { label: "About", href: "/#about" },
    { label: "Work", href: "/#work" },
    { label: "Awards", href: "/#awards" },
    { label: "Contact", href: "/#contact" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/joelybahh", handle: "joelybahh" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/joelgabriel/", handle: "joelgabriel" },
    { label: "X", href: "https://twitter.com/joelybahh", handle: "joelybahh" },
    { label: "Instagram", href: "https://www.instagram.com/joelybahh/", handle: "joelybahh" },
  ],
} as const;

export type Social = (typeof site.socials)[number];
