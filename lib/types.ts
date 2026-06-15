export type ProjectCategory = "personal" | "work";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  /** Markdown body */
  content: string;
  tags: string[];
  category: ProjectCategory;
  role?: string;
  /** e.g. "2023 – 2025" */
  year?: string;
  coverImage?: string;
  heroImage?: string;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  publishedAt?: string;
  updatedAt?: string;
  /** Lower sorts first */
  sortOrder: number;
};

export type ProjectMeta = Omit<Project, "content">;
