export const about = {
  heading: "Dad first, engineer always.",
  paragraphs: [
    "I'm a tech lead who's been shipping software since 2017, nearing a decade across game, desktop and web development experience. These days I focus on NextJS, React and TypeScript, building high-quality, intuitive products and leading the teams that ship them.",
    "I started out writing games in C# and Unity and moved through desktop software in C# and C++ before settling into modern full-stack product engineering. That game-engine grounding still sharpens how I think about performance and architecture, but these days the work is shipping polished web and mobile products end to end.",
    // something about homelabs, starting side projects,
    "Outside of work I'm a dad of 3 boys, 3, 5 and 9, love to hit up the gym and do weights training, I also setup and run my own home lab to manage our family password vault, and photos",
  ],
  stats: [
    { value: "2017", label: "Writing software since" },
    { value: "9+ yrs", label: "Game · software · web" },
    { value: "Web + mobile", label: "Full-stack product focus" },
  ],
};

export type SkillGroup = {
  label: string;
  accent: "marker" | "coral" | "leaf" | "ink";
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Niche",
    accent: "coral",
    skills: ["Mapbox", "BabylonJS", "Unity 3D", "3D Web (legacy)"],
  },
  {
    label: "Languages & Frameworks",
    accent: "marker",
    skills: ["TypeScript", "React", "Next.js", "React Native", "Python"],
  },
  {
    label: "A past life",
    accent: "coral",
    skills: ["Ruby", "PHP", "Rust", "C++", "C#", "Bash", "Inno Setup"],
  },
  {
    label: "Backend & Auth",
    accent: "leaf",
    skills: ["PostgreSQL", "Supabase", "Auth0", "Azure Functions", "Stripe"],
  },
  {
    label: "Platform & AI",
    accent: "ink",
    skills: ["Monorepos", "MCP", "TanStack", "Expo", "OpenAI"],
  },
  {
    label: "Leading",
    accent: "marker",
    skills: ["Leadership", "Mentorship", "Problem Solving", "Communication"],
  },
];

export type Award = {
  icon: string;
  title: string;
  description: string;
  year?: string;
};

export const awards: Award[] = [
  {
    icon: "🏆",
    year: "Diploma",
    title: "Outstanding Programmer Award",
    description:
      "The highest award given to a single student in the Advanced Diploma of Professional Games Development — Programming.",
  },
  {
    icon: "🎓",
    title: "Advanced Diploma of Professional Games Development — Programming",
    description:
      "Graduated top of the cohort across all students in the course.",
  },
  {
    icon: "📚",
    title: "Microfrontends with React: A Complete Developer's Guide",
    year: "Udemy",
    description:
      "Splitting apps, sharing data, CI/CD and AWS CloudFront deployment with CSS-scoping — and judging when microfrontends actually fit.",
  },
  {
    icon: "📚",
    title: "Mastering React 16 — Coding With Mosh",
    description:
      "Reusable components, advanced data handling (pagination, sorting, searching), form validation, routing and robust auth.",
  },
  {
    icon: "🏅",
    year: "2015",
    title: "Finalist — NSW Year 12 Industrial Technology Competition",
    description:
      "For my major HSC project: an Ice-Cream Tycoon game built in C# and MonoGame, shipped to GameJolt and CD.",
  },
  {
    icon: "🧾",
    title: "Certificate III — Information, Digital Media & Technology",
    description:
      "Built a 3D game with C# and Unity over an intensive holiday course.",
  },
  {
    icon: "🧾",
    title: "Certificate II — Information, Digital Media & Technology",
    description:
      "Learned the fundamentals of digital media by building a 2D game with C# and MonoGame.",
  },
  {
    icon: "🧾",
    title: "Higher School Certificate",
    description:
      "Graduated Year 12 with standout results in Computer Science and Digital Media.",
  },
];
