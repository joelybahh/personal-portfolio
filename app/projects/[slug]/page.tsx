import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProject, getProjects } from "@/lib/projects";
import { site } from "@/lib/site";
import { Markdown } from "@/components/Markdown";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@/components/icons";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

function formatDate(value?: string) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project not found" };

  const image = project.heroImage ?? project.coverImage ?? site.ogImage;
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.summary,
      url: `${site.url}/projects/${project.slug}`,
      images: [{ url: image, alt: project.title }],
      publishedTime: project.publishedAt,
      modifiedTime: project.updatedAt,
      authors: [site.url],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      images: [image],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const published = formatDate(project.publishedAt);
  const image = project.heroImage ?? project.coverImage;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.title,
    description: project.summary,
    image: image ? `${site.url}${image}` : undefined,
    datePublished: project.publishedAt,
    dateModified: project.updatedAt ?? project.publishedAt,
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: { "@type": "Person", name: site.name },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.url}/projects/${project.slug}`,
    },
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <Link
        href="/#work"
        className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-ink-soft transition-colors hover:text-marker dark:text-paper/70"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to work
      </Link>

      <header className="mt-6">
        {(project.role || project.year) && (
          <p className="font-hand text-xl text-marker">
            {[project.role, project.year].filter(Boolean).join(" · ")}
          </p>
        )}
        <h1 className="mt-1 font-sans text-4xl font-black tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 font-sans text-lg leading-relaxed text-ink-soft dark:text-paper/75">
          {project.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-faint">
          {published && <span className="font-mono">{published}</span>}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-sans font-semibold text-marker hover:underline"
            >
              See it in action <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-sans font-semibold text-marker hover:underline"
            >
              Source <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </header>

      {image && (
        <div className="relative my-8 aspect-[16/9] w-full overflow-hidden rounded-sketch border-2 border-ink shadow-sketch-lg dark:border-paper/80">
          <Image
            src={image}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      )}

      <Markdown>{project.content}</Markdown>

      <div className="mt-12 border-t-2 border-dashed border-ink/25 pt-6 dark:border-paper/20">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-ink-soft transition-colors hover:text-marker dark:text-paper/70"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          All projects
        </Link>
      </div>
    </article>
  );
}
