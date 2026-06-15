---
title: Mailman
summary: An open-source, offline-first desktop API client — a Postman-style workflow in Rust with no account wall, no forced sync, and encrypted-at-rest environments.
tags: [Rust, Desktop App, Cryptography, Open Source]
role: Creator
year: "2026"
featured: true
publishedAt: "2026-02-01"
sortOrder: 4
---

**Mailman** is a lightweight, offline-first desktop API client for developers who want a Postman-style workflow without cloud lock-in. No account wall, no forced sync, no surprise workspace limits — just send requests, manage environments securely, and keep full control of your local data. Built in **Rust** and cross-platform across macOS, Windows and Linux.

## Why it exists

A lot of developers reached for Postman because it was quick and easy — then watched pricing and free-tier limits change. Mailman is a simple, local-first alternative that works entirely offline and stores your environment variables encrypted at rest.

## Core features

- **Persistent request tabs** restored on launch, with per-tab drafts that retain unsaved changes until you save.
- **Full request builder** — all common HTTP methods, and body modes for `raw`, `urlencoded`, `form-data` and `binary`.
- **Environment variables** with placeholder support (`${token}`), plus Postman compatibility (`{{token}}` is normalised on import).
- **Response scripts** that extract JSON values from 2xx responses into environment variables.
- **One-click cURL copy**, and a response viewer with status, timing, headers and pretty JSON.
- **Postman import** from collections, environments, cache/LevelDB and requester logs, with intelligent de-duplication and merging.
- **Encrypted bundle export/import** for moving or backing up workspaces across machines.

## Security model

Environment files are encrypted at rest using **Argon2id** key derivation and **XChaCha20-Poly1305** encryption. The master password is never stored — only an encrypted verifier is kept to validate unlock attempts. Optional "keep me signed in" sessions cache just the derived unlock key in the **OS keychain**; the raw password never touches disk. Lose the master password and the encrypted values genuinely can't be recovered.

## Packaging

Pre-configured for `cargo-packager` to produce native installers: `.app`/`.dmg` on macOS, `.deb` on Linux, and `.msi`/`.exe` (NSIS) on Windows.
