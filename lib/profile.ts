export const about = {
  heading: "Engineer first, builder always.",
  paragraphs: [
    "I'm a lead full-stack engineer who's been shipping software since 2017 — nearly a decade across game, desktop and web development. These days I focus on NextJS, React and TypeScript, building high-quality, intuitive products and leading the teams that ship them.",
    "I started out writing games in C# and Unity, moved through desktop software in C# and C++, and ended up with a genuinely niche specialty: real-time 3D rendering on the web. That blend of game-engine thinking and modern web architecture is what I bring to every product I work on.",
  ],
  stats: [
    { value: "2017", label: "Writing software since" },
    { value: "9+ yrs", label: "Game · software · web" },
    { value: "3D", label: "Real-time web rendering" },
  ],
};

export type SkillGroup = {
  label: string;
  accent: "marker" | "coral" | "leaf" | "ink";
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Specialised",
    accent: "coral",
    skills: ["Game & Software Dev", "Unity 3D", "3D Web Rendering", "BabylonJS", "Mapbox"],
  },
  {
    label: "Languages & Frameworks",
    accent: "marker",
    skills: ["TypeScript", "JavaScript", "React", "Next.js", "Node.js"],
  },
  {
    label: "Backend & Cloud",
    accent: "leaf",
    skills: ["Azure Functions", "Azure Blob / CDN", "PostgreSQL", "Amazon SES", "Amazon S3"],
  },
  {
    label: "Architecture",
    accent: "ink",
    skills: ["Monorepos", "Microfrontends", "CMS Systems", "DB Multi-tenancy", "Serverless"],
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
    description: "Built a 3D game with C# and Unity over an intensive holiday course.",
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
