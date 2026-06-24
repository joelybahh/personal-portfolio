import type { ReactNode } from "react";
import { MagicText } from "./MagicText";
import { PointArrows } from "./PointArrows";
import { Scribble } from "./Scribble";

/* eslint-disable @typescript-eslint/no-explicit-any */

const SCRIBBLE_TYPES = [
  "underline",
  "box",
  "circle",
  "highlight",
  "strike-through",
  "crossed-off",
  "bracket",
] as const;

/**
 * Renders the inner text of a `{{effect:…}}` markdown span (see
 * {@link "@/lib/markdown-effects"}). `flicker` is a CSS animation;
 * `arrow` draws corner arrows via {@link PointArrows}; the remaining names
 * map to the hand-drawn {@link Scribble} annotations.
 */
export function TextEffect({ effect, children }: { effect: string; children: ReactNode }) {
  if (effect === "flicker") {
    return <span className="md-flicker">{children}</span>;
  }

  if (effect === "blur") {
    return <span className="md-blur">{children}</span>;
  }

  if (effect === "magic") {
    return <MagicText>{children}</MagicText>;
  }

  if (effect === "arrow") {
    return <PointArrows>{children}</PointArrows>;
  }

  if ((SCRIBBLE_TYPES as readonly string[]).includes(effect)) {
    return (
      <Scribble
        type={effect as any}
        color={effect === "highlight" ? "highlight" : "marker"}
      >
        {children}
      </Scribble>
    );
  }

  return <>{children}</>;
}
