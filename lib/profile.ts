export const about = {
  heading: "Dad first, engineer always.",
  paragraphs: [
    "I'm a tech lead who's been shipping software since 2017. Day to day I lead the engineers at Inspace: technical strategy, roadmaps and planning, customer calls for implementations and custom integrations, and the comms that keep a team moving. The role still demands building, so most weeks I'm on the tools too, designing APIs, writing SQL functions, tuning and provisioning databases, and cutting architecture cost.",
    "I started out writing games in C# and Unity, moved through desktop software in C# and C++, built package installers for VR software and wrote plugins in Ruby, then settled into full-stack product engineering in TypeScript, React and Next.js, now AI-enabled and AI-accelerated. That game-engine grounding still sharpens how I think about performance and architecture, but the breadth is the point: every layer taught me something the next one needed.",
    "I'm cautiously optimistic about AI. I championed Inspace's AI efficiency rollout, working out how we lean on AI capability without a cost blowout, and I'm glad I built my skill set before the tools could do the thinking for me. On the leadership side I took the engineering seat in our compliance push, securing SOC 2 Type I and the first stage of ISO 27001 before cost reductions pushed the next stages off the roadmap.",
    "Outside work I'm a dad of three boys, 3, 5 and 9, I lift weights, and I run a home lab that keeps evolving: our family password vault, photos, and whatever I'm curious about next.",
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
    label: "Day to day",
    accent: "marker",
    skills: [
      "Team leadership",
      "Technical strategy",
      "Roadmaps & planning",
      "Customer integrations",
      "Cost reduction",
    ],
  },
  {
    label: "Backend & data",
    accent: "leaf",
    skills: ["PostgreSQL", "SQL functions", "Supabase", "Azure Functions", "Python", "Auth0", "Stripe"],
  },
  {
    label: "Frontend & mobile",
    accent: "marker",
    skills: ["TypeScript", "React", "Next.js", "React Native", "Expo", "TanStack"],
  },
  {
    label: "Platform & AI",
    accent: "ink",
    skills: ["Monorepos", "Developer tooling", "MCP", "OpenAI", "AI cost controls"],
  },
  {
    label: "Security & compliance",
    accent: "coral",
    skills: ["SOC 2 Type I", "ISO 27001 stage one", "ISMS policies", "Audit readiness"],
  },
  {
    label: "Past lives & side quests",
    accent: "coral",
    skills: [
      "Ruby plugins",
      "Inno Setup installers",
      "C#",
      "C++",
      "Rust",
      "PHP",
      "Bash",
      "Unity 3D",
      "Mapbox",
      "BabylonJS",
    ],
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
    icon: "🔐",
    year: "Inspace",
    title: "SOC 2 Type I — secured",
    description:
      "Led the engineering side of the compliance push: controls, policy set, evidence and auditor walkthroughs. Type II was pushed off the roadmap by cost reductions.",
  },
  {
    icon: "📋",
    year: "Inspace",
    title: "ISO 27001 — Stage 1 audit completed",
    description:
      "Took the ISMS through its first-stage audit, from documentation to business shape-up; the second stage was deprioritised alongside SOC 2 Type II.",
  },
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
