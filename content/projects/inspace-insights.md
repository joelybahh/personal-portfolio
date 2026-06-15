---
title: Inspace Insights
summary: Multi-tenant lead intelligence on Inspace analytics — plus an MCP that authenticates end users via Auth0 so they can action inventory and experiences from their favourite AI tools.
tags: [Next.js, TypeScript, Auth0, TanStack, MCP]
category: work
role: Lead Engineer
year: "2026 – present"
coverImage: /assets/images/inspace-insights.png
featured: true
publishedAt: "2026-05-01"
sortOrder: 3
---

**Inspace Insights** is a lead-intelligence platform built on top of Inspace's analytics data. It surfaces companies detected visiting your assets, enables enrichment with leases and contacts, and provides the tooling to search, qualify and action those leads — all in one place. Started in May 2026 and ongoing.

It also ships an **MCP (Model Context Protocol) server** — the first use case is internal **customer success**, but the architecture is built to authenticate **Inspace end users via Auth0** and expose tools inside their favourite AI interface (Cursor, Claude Desktop, etc.). That opens the door to automating experience creation, inventory updates like space descriptions, and other product workflows without leaving the chat. Patterns from this work were proven out earlier in R&D projects like **Inspace Intelligence**.

## Architecture

The app is **multi-tenant** via an `[orgAlias]` URL prefix — every authenticated screen lives under `/<orgAlias>/…`. It's built on **Next.js 16** (App Router, Turbopack) with **Auth0** Universal Login, and most API routes are thin server-side proxies that attach the Auth0 token before forwarding to upstream Inspace services, keeping tokens out of the browser.

The **MCP layer** reuses the same identity model: tools are scoped to the authenticated org/user, so what works for CS today can extend to customer-facing automation tomorrow — e.g. "update this listing description", "draft an experience from this precinct data", or "qualify these detected companies" — all from an AI client the user already has open.

## What I worked on

- **Detected Companies** — the core view: a high-performance, virtualised table (TanStack Table + Virtual) with server-driven sorting, filtering and column state, saved views, density modes, column resize/reorder, and inline + bulk attribution actions.
- **Dashboard** — a rolling 7-day summary with trend badges, inline sparklines and industry/city breakdowns.
- **Company search & profiles** — search across the whole Inspace network with enriched lease and contact data, plus per-company drill-downs.
- **Opportunities** — a pipeline view with editable per-org statuses.
- **Org settings** — tabbed Members / Integrations / Customisation, with self-service invite acceptance and role gating (super-admin, insights-admin, member).
- **MCP & AI tooling** — protocol server and tool design for internal CS workflows, with Auth0-backed auth designed to extend to end-user automation (inventory, DXP/experience builder, lead actioning).

## Stack highlights

Next.js 16, Auth0 v4, TanStack Table / Query / Virtual, dnd-kit, base-ui + shadcn, cmdk, Tailwind CSS v4, MCP, and a typed CDN asset layer serving SVG icons inline. Invites are fire-and-forget through a notifications microservice, with resend resolving the recipient server-side to avoid becoming an open relay.
