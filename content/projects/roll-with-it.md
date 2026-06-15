---
title: Roll With It
summary: A personal-finance app that started life as a Next.js web app and grew into a cross-platform mobile product, complete with an AI "Pocket CFO".
tags: [Next.js, React Native, Expo, TypeScript, Stripe, OpenAI]
role: Creator & Lead Engineer
year: "2025 – present"
coverImage: /assets/images/roll-with-it.png
liveUrl: https://www.roll-with-it.com.au/
featured: true
publishedAt: "2025-05-08"
updatedAt: "2026-06-15"
sortOrder: 1
---

**Roll With It** is a personal-finance app I've been building since May 2025 — and it's still very much ongoing. It began as a **Next.js** web app and has since grown into a true cross-platform product, with a dedicated **React Native (Expo)** app delivering a real native mobile experience alongside the web.

## What it does

The goal is to make money management feel less like a spreadsheet and more like a conversation. It tracks income and expenses, models **recurring bills and income**, and surfaces it all through a **"Pocket CFO"** — an AI assistant (built on the OpenAI Agents SDK) that can answer questions about your finances and help you plan ahead.

## Tech & architecture

- **Monorepo** managed with pnpm workspaces + Turborepo (`apps/web`, `apps/mobile`, shared packages).
- **Web**: Next.js 15, React 19, Tailwind and Radix UI primitives.
- **Data**: Prisma over PostgreSQL, with Supabase in the mix.
- **Payments**: Stripe for subscriptions and billing.
- **AI**: OpenAI + the `@openai/agents` SDK powering the Pocket CFO.
- **Mobile**: a native **React Native** app built with **Expo** (developed against Expo Go), sharing types and logic with the web through the monorepo's shared packages, with native push via Firebase.

## Why it matters

This is my flagship personal product — the place I get to own the whole stack end to end, from schema and payments to the AI layer and the native release pipeline. The monorepo architecture lets me ship the Next.js web app continuously while versioning the React Native mobile releases independently.
