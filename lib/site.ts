export const site = {
  name: "Joel Gabriel",
  role: "Tech Lead & Full-Stack Engineer",
  shortTagline: "Hands-on tech lead & full-stack engineer",
  description:
    "Joel Gabriel is a hands-on tech lead who manages engineers, shapes technical strategy and roadmaps, and still builds the APIs, databases, infrastructure and tooling behind web and mobile products.",
  url: "https://joelgabriel.com.au",
  email: "joelybahh@gmail.com",
  locale: "en_AU",
  profileImage: "/assets/images/profile-1.webp",
  ogImage: "/assets/images/og-image.jpg",
  nav: [
    { label: "About", href: "/#about" },
    { label: "Work", href: "/#work" },
    { label: "Writing", href: "/blog" },
    { label: "Awards", href: "/#awards" },
    { label: "Contact", href: "/#contact" },
  ],
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/joelybahh",
      handle: "joelybahh",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/joelgabriel/",
      handle: "joelgabriel",
    },
    { label: "X", href: "https://twitter.com/joelybahh", handle: "joelybahh" },
    {
      label: "Instagram",
      href: "https://www.instagram.com/joelybahh/",
      handle: "joelybahh",
    },
  ],
} as const;

export type Social = (typeof site.socials)[number];
