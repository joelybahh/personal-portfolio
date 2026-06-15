---
title: Roll With It
summary: A household budgeting app we built because nothing else fit — bill alerts in one place, mortgage paydown projections, and story-like month & year reviews for couples and families.
tags: [Next.js, React Native, Expo, TypeScript, Stripe, OpenAI]
category: personal
role: Creator & Lead Engineer
year: "2025 – present"
coverImage: /assets/images/roll-with-it.png
liveUrl: https://www.roll-with-it.com.au/
featured: true
publishedAt: "2025-05-08"
updatedAt: "2026-06-15"
sortOrder: 1
---

**Roll With It** is a personal-finance app my partner Erica and I built because no budgeting tool actually worked for our setup. It started in May 2025 as a **Next.js** web app and has grown into a true cross-platform product — a dedicated **React Native (Expo)** mobile app alongside the web — and it's still very much ongoing.

## Why we built it

Every app we tried either assumed a single person, ignored how couples actually share money, or made bill tracking feel like a second job. We wanted something that worked **for us at the core**: enter a bill once, get **one notification**, and nothing catches us off guard. Mortgage **paydown projections** so we could see the long game, not just this month. And reviews that feel like **stories**, not spreadsheets — because I'm very data-oriented and Erica is more visual and wants the gist. The app bleeds those two modes together.

At its heart it's built for **couples and families** — shared household view, rollover budgets that match real life, and month-in-review / year-in-review narratives worth actually watching.

## What it does

- **Unified bill notifications** — recurring bills and income in one place; one alert, not five.
- **Rollover budgeting** — unspent budget rolls into next month the way we actually manage money.
- **Mortgage & net-worth tracking** — offset, mortgage, and account snapshots with paydown projections.
- **Story-like reviews** — month-in-review and year-in-review experiences (not just charts).
- **Pocket CFO** — an AI assistant (OpenAI Agents SDK) for questions and planning when you want a conversation, not a pivot table.

## Tech & architecture

- **Monorepo** with pnpm workspaces + Turborepo (`apps/web`, `apps/mobile`, shared packages).
- **Web**: Next.js 15, React 19, Tailwind and Radix UI.
- **Mobile**: native **React Native** with **Expo** (Expo Go in dev), shared types/logic via packages, Firebase push.
- **Data**: Prisma over PostgreSQL, Supabase in the mix.
- **Payments**: Stripe subscriptions.

## Why it matters

This is my flagship personal product — the place I own the whole stack, from schema and payments to AI and the native release pipeline. The monorepo lets me ship the Next.js web app continuously while versioning React Native releases independently — and every feature is grounded in a real household that needed it, not a generic finance-app template.
