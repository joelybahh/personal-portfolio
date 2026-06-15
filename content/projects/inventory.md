---
title: Inspace Inventory — CRE Data CMS
summary: A centralised platform for managing commercial real-estate data — store, sync and manage property, leasing and media in real time.
tags: [Next.js, TypeScript, PostgreSQL, Azure]
role: Lead Engineer
year: "2022 – 2025"
coverImage: /assets/images/inventory-platform.webp
featured: true
publishedAt: "2024-02-15"
sortOrder: 7
---

**Inventory** is the data backbone of the Inspace suite — a centralised CMS for commercial real-estate data that lets users store, sync and manage property and leasing information and media in real time. Everything else (mapping, reporting, experiences) reads from here.

## What I worked on

- **Multi-tenant data model** — a PostgreSQL schema designed for clean separation between organisations while sharing a single platform.
- **Real-time sync** — edits propagate to the products that consume the data, so a change to a listing shows up everywhere immediately.
- **Media management** — uploads, processing and delivery through Azure Blob storage and CDN.
- **Serverless API** — Azure Functions exposing the data with the complex querying the downstream products need.

## Why it matters

A CMS is only as good as the products built on top of it. Treating Inventory as the single source of truth meant the rest of the suite could stay thin and focused, and new features could assume the data was already there, structured and current.
