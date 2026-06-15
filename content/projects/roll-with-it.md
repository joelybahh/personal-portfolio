---
title: Roll With It
summary: A personal-finance app that started life as a Next.js web app and grew into a cross-platform mobile product, complete with an AI "Pocket CFO".
tags: [Next.js, TypeScript, Capacitor, Prisma, Stripe, OpenAI]
role: Creator & Lead Engineer
year: "2025 – present"
liveUrl: https://www.roll-with-it.com.au/
featured: true
publishedAt: "2025-05-08"
updatedAt: "2026-06-15"
sortOrder: 1
---

**Roll With It** is a personal-finance app I've been building since May 2025 — and it's still very much ongoing. It began as a Next.js web app and has since grown into a cross-platform product, wrapped for mobile with **Capacitor** so the native apps always load the latest live web experience.

## What it does

The goal is to make money management feel less like a spreadsheet and more like a conversation. It tracks income and expenses, models **recurring bills and income**, and surfaces it all through a **"Pocket CFO"** — an AI assistant (built on the OpenAI Agents SDK) that can answer questions about your finances and help you plan ahead.

## Tech & architecture

- **Monorepo** managed with pnpm workspaces + Turborepo (`apps/web`, `apps/mobile`, shared packages).
- **Web**: Next.js 15, React 19, Tailwind and Radix UI primitives.
- **Data**: Prisma over PostgreSQL, with Supabase in the mix.
- **Payments**: Stripe for subscriptions and billing.
- **AI**: OpenAI + the `@openai/agents` SDK powering the Pocket CFO.
- **Mobile**: a Capacitor wrapper shipping to Android, loading the live web app so web and mobile stay in lockstep (with native push handled by the wrapper via Firebase).

## Why it matters

This is my flagship personal product — the place I get to own the whole stack end to end, from schema and payments to the AI layer and the native release pipeline. The dual-repo, web-first architecture means I can ship to the web continuously while versioning mobile releases independently.
