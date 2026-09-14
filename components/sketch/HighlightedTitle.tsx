"use client";

import type { ReactNode } from "react";
import { Scribble } from "./Scribble";

const EM_RE = /<em>([\s\S]*?)<\/em>/gi;

/**
 * Renders a title string where any `<em>…</em>` span is wrapped in the
 * hand-drawn highlighter effect used elsewhere on the site. Everything outside
 * the tags renders as plain text, so titles without `<em>` are unaffected.
 */
export function HighlightedTitle({
  text,
  color = "highlight",
  delay = 250,
}: {
  text: string;
  color?: "highlight" | "marker" | "coral" | "leaf" | "ink";
  delay?: number;
}) {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  EM_RE.lastIndex = 0;
  while ((match = EM_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <Scribble key={key++} type="highlight" color={color} delay={delay}>
        {match[1]}
      </Scribble>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));

  return <>{parts}</>;
}
