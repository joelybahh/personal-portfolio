---
title: Inspace DXP — Experience Builder
summary: A digital experiences platform for building beautiful online and offline presentations directly from your real-estate data.
tags: [Next.js, TypeScript, PostgreSQL, Azure]
role: Lead Engineer
year: "2023 – 2025"
coverImage: /assets/images/dxp-platform.webp
featured: true
publishedAt: "2024-03-10"
sortOrder: 6
---

The **Digital Experiences Platform (DXP)** is a centralised tool for creating beautiful online and offline presentations and experiences straight from your data. Rather than rebuilding a deck every time, teams compose reusable experiences once and let the platform keep them in sync with the underlying records.

## What I worked on

- **Experience builder** — a composable editor where users assemble presentations from data-bound blocks instead of static slides.
- **Data binding** — experiences read from the same PostgreSQL source of truth as the rest of the suite, so content stays current automatically.
- **Online & offline output** — render experiences for the web, and export self-contained versions for offline presenting.
- **Architecture** — a Next.js front end backed by Azure Functions and Azure Blob storage for media.

## The hard part

The challenge with any builder is balancing flexibility with guardrails. Give users too much freedom and everything looks broken; too little and it's just another rigid template. DXP leans on a schema-driven component model — the same philosophy behind the mapping platform — so experiences stay on-brand while still feeling bespoke.
