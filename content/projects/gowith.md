---
title: GoWith
summary: "Be Human. GoWith. — a location-based social app for discovering and joining nearby activities, and my first real go at a B2C product."
tags: [React Native, Expo, TypeScript, Supabase, RevenueCat]
role: Creator & Lead Engineer
year: "2025 – 2026"
liveUrl: https://www.gowith.au/
featured: true
publishedAt: "2025-08-08"
updatedAt: "2026-04-27"
sortOrder: 2
---

**GoWith** — *"Be Human. GoWith."* — is a location-based social app for discovering and joining nearby activities, and connecting with people doing things you love, from coffee meetups to sports and adventures. It was my **first real go at a proper B2C product**, shipped to both the App Store and Play Store.

## What it does

GoWith puts real-world activities on a map. You can find what's happening near you, send friend requests and activity invitations, and get notified when people want to do something together. The whole experience is built around getting people off their phones and out doing things.

## Tech & architecture

- **Mobile**: React Native via **Expo** (SDK 55), with EAS for builds and OTA.
- **Backend**: Supabase (auth, data, storage) with a push-notifications pipeline.
- **Maps & location**: `react-native-maps` + Expo Location for nearby discovery.
- **Monetisation**: subscriptions via **RevenueCat**.
- **Analytics**: Amplitude, including session replay.
- **Marketing site**: a separate Next.js 15 site at [gowith.au](https://www.gowith.au/).

## Why it matters

Building GoWith meant learning the parts of shipping a consumer app that don't show up in a B2B context — app-store review, subscriptions and paywalls, push-notification UX, deep links and analytics-driven iteration. It reached version 1.11+ across a year of real-world releases.
