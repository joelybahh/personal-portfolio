"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { DOODLE_COLORS, FACE_DOODLE } from "./faceDoodle";

/**
 * The hero portrait with a playful easter egg: hover (desktop) or tap (mobile)
 * to watch the doodle (drawn in /doodle, stored in faceDoodle.ts) get sketched
 * onto the photo, one stroke at a time.
 *
 * The drawing effect is the classic self-drawing SVG trick: every stroke sets
 * `pathLength={1}` so its length is normalised to 1, then we animate
 * `stroke-dashoffset` from 1.1 (parked off the path) to 0 (fully drawn). Each
 * stroke is delayed a little after the previous one for the hand-drawn,
 * being-sketched feel.
 */

const STEP = 85; // ms between successive strokes starting to draw
const DRAW_MS = 380; // how long each stroke takes to draw on

// Returns the props that drive one stroke's draw-on animation.
// The "1 2" dash (a 1-long dash + 2-long gap) plus a hidden offset of 1.1 parks
// the dash — round caps and all — fully off the path, so nothing leaks idle.
function stroke(active: boolean, delay: number, duration = DRAW_MS) {
  return {
    pathLength: 1,
    style: {
      strokeDasharray: "1 2",
      strokeDashoffset: active ? 0 : 1.1,
      transition: `stroke-dashoffset ${duration}ms ${active ? "ease-out" : "ease-in"} ${delay}ms`,
    } as CSSProperties,
  };
}

export function DoodleFace({ src, alt }: { src: string; alt: string }) {
  const [active, setActive] = useState(false);

  return (
    <div
      className="group relative mx-auto aspect-square w-56 cursor-pointer select-none rotate-2 overflow-hidden rounded-sketch border-2 border-ink shadow-sketch-lg outline-none focus-visible:ring-2 focus-visible:ring-marker dark:border-paper sm:w-64"
      // Desktop: draw on hover. Touch: tap toggles. Keyboard: focus draws.
      onPointerEnter={(e) => e.pointerType === "mouse" && setActive(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setActive(false)}
      onPointerDown={(e) => e.pointerType !== "mouse" && setActive((v) => !v)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      tabIndex={0}
      role="button"
      aria-label="Doodle on the portrait"
      title="psst… give me a makeover"
    >
      <Image
        src={src}
        alt={alt}
        fill
        loading="eager"
        priority
        sizes="256px"
        className="object-cover grayscale"
      />

      <svg
        viewBox="0 0 100 100"
        className="pointer-events-none absolute inset-0 h-full w-full"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {FACE_DOODLE.map((s, i) => (
          <path
            key={i}
            d={s.d}
            stroke={DOODLE_COLORS[s.color] ?? s.color}
            strokeWidth={s.width}
            {...stroke(active, i * STEP)}
          />
        ))}
      </svg>
    </div>
  );
}
