#!/usr/bin/env node
// Renders scripts/og/projects.json through scripts/og/project-card.html into
// public/assets/images/og/<slug>.png with headless Chrome. Pass slugs to render a subset.
// The home card is separate: see scripts/og/home.html.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "..", "..");
const outDir = path.join(root, "public", "assets", "images", "og");
const template = fs.readFileSync(path.join(here, "project-card.html"), "utf8");
const cards = JSON.parse(fs.readFileSync(path.join(here, "projects.json"), "utf8"));
const chrome =
  process.env.CHROME ||
  (process.platform === "darwin"
    ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    : "google-chrome");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const only = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });

for (const card of cards) {
  if (only.length && !only.includes(card.slug)) continue;
  const title = card.title;
  const titleSize = card.titleSize ?? (title.length <= 8 ? 84 : title.length <= 14 ? 72 : 60);
  const stats = (card.stats ?? [])
    .map((s) => `<div><b class="${s.tone ?? ""}">${esc(s.value)}</b><span>${esc(s.label)}</span></div>`)
    .join("");
  const cover = card.cover ? "file://" + path.join(root, "public", card.cover) : "";
  const html = template
    .replace(/{{eyebrow}}/g, esc(card.eyebrow))
    .replace(/{{title}}/g, esc(title))
    .replace(/{{titleSize}}/g, String(titleSize))
    .replace(/{{summary}}/g, card.summary) // trusted authoring source; allows <b>
    .replace(/{{stats}}/g, stats)
    .replace(/{{cover}}/g, cover)
    .replace(/{{coverClass}}/g, [card.cover ? "" : "none", stats ? "" : "nostats"].join(" ").trim());
  const tmp = path.join(os.tmpdir(), `og-${card.slug}.html`);
  fs.writeFileSync(tmp, html);
  const out = path.join(outDir, `${card.slug}.png`);
  execFileSync(
    chrome,
    [
      "--headless=new", "--disable-gpu", "--hide-scrollbars", "--window-size=1200,630",
      "--virtual-time-budget=8000", `--screenshot=${out}`, `file://${tmp}`,
    ],
    { stdio: "ignore" },
  );
  console.log(`rendered ${path.relative(root, out)}`);
}
