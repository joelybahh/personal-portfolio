# joelgabriel.com.au

Personal portfolio for **Joel Gabriel** — a hand-drawn "sketchbook" site built with
Next.js (App Router), TypeScript and Tailwind CSS.

## Why it's built this way

- **Add a project by adding a file.** Projects live as markdown in
  [`content/projects`](content/projects). Drop in a new `.md` file and it's
  automatically indexed on the home page, the `/projects` list, the sitemap and
  the social/SEO metadata — no manual wiring.
- **Supabase-backed, markdown-first.** In production, project content is pulled
  from a Supabase `projects` table via ISR (so frequently-changing content can be
  edited without a redeploy). With no Supabase env vars set, the site falls back
  to the markdown files — so local dev and previews work with zero infrastructure.
- **SEO handled for you.** Per-page `generateMetadata`, Open Graph/Twitter cards,
  JSON-LD (`Person` + `Article`), a dynamic `sitemap.xml` and `robots.txt` are all
  generated from the same content source.

## Tech

| | |
|---|---|
| Framework | Next.js (App Router) + React + TypeScript |
| Styling | Tailwind CSS, `@tailwindcss/typography` |
| Sketch UI | hand-drawn borders (CSS), `react-rough-notation` scroll-in annotations |
| Content | Markdown (`react-markdown` + `remark-gfm` + `rehype-highlight`) |
| Data | Supabase (optional) with local markdown fallback |
| Theme | `next-themes` (light / dark / system) |

## Local development

```bash
npm install
npm run dev
```

Visit http://localhost:3000. No env vars are required — it reads the markdown in
`content/projects`.

## Adding / editing a project

Create `content/projects/<slug>.md` with frontmatter:

```md
---
title: My New Project
summary: One-line description used on cards and meta tags.
tags: [Next.js, TypeScript]
role: Lead Engineer
year: "2025"
coverImage: /assets/images/my-project.webp
heroImage: /assets/images/my-project-hero.webp   # optional, defaults to coverImage
liveUrl: https://example.com                      # optional
repoUrl: https://github.com/...                   # optional
featured: true                                    # show in the home "work" grid
publishedAt: "2025-01-01"
sortOrder: 1                                       # lower sorts first
---

Markdown body goes here...
```

Drop the cover image in `public/assets/images/`. That's it.

## Supabase (optional)

1. Create a Supabase project and run [`supabase/schema.sql`](supabase/schema.sql)
   in the SQL editor.
2. Copy `.env.example` to `.env.local` and fill in the values.
3. Push the markdown content into the table:

   ```bash
   npm run seed
   ```

Once `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set (locally
and on Vercel), the site reads from Supabase instead of the markdown files.

## Deploy

Deploys to **Vercel** as a standard Next.js app. Set the Supabase env vars in the
Vercel project settings if you want DB-backed content; otherwise it ships the
markdown content as-is.
