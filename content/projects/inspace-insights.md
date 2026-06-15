---
title: Inspace Insights
summary: A multi-tenant lead-intelligence platform built on Inspace's analytics — surfacing companies visiting your assets, then enriching, qualifying and actioning them.
tags: [Next.js, TypeScript, Auth0, TanStack, Tailwind]
role: Lead Engineer
year: "2026 – present"
featured: true
publishedAt: "2026-05-01"
sortOrder: 3
---

**Inspace Insights** is a lead-intelligence platform built on top of Inspace's analytics data. It surfaces companies detected visiting your assets, enables enrichment with leases and contacts, and provides the tooling to search, qualify and action those leads — all in one place. Started in May 2026 and ongoing.

## Architecture

The app is **multi-tenant** via an `[orgAlias]` URL prefix — every authenticated screen lives under `/<orgAlias>/…`. It's built on **Next.js 16** (App Router, Turbopack) with **Auth0** Universal Login, and most API routes are thin server-side proxies that attach the Auth0 token before forwarding to upstream Inspace services, keeping tokens out of the browser.

## What I worked on

- **Detected Companies** — the core view: a high-performance, virtualised table (TanStack Table + Virtual) with server-driven sorting, filtering and column state, saved views, density modes, column resize/reorder, and inline + bulk attribution actions.
- **Dashboard** — a rolling 7-day summary with trend badges, inline sparklines and industry/city breakdowns.
- **Company search & profiles** — search across the whole Inspace network with enriched lease and contact data, plus per-company drill-downs.
- **Opportunities** — a pipeline view with editable per-org statuses.
- **Org settings** — tabbed Members / Integrations / Customisation, with self-service invite acceptance and role gating (super-admin, insights-admin, member).

## Stack highlights

Next.js 16, Auth0 v4, TanStack Table / Query / Virtual, dnd-kit, base-ui + shadcn, cmdk, Tailwind CSS v4, and a typed CDN asset layer serving SVG icons inline. Invites are fire-and-forget through a notifications microservice, with resend resolving the recipient server-side to avoid becoming an open relay.
