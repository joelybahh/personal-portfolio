"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "./useInView";

const CORNERS = [
  { className: "left-0 top-0 -translate-x-[85%] -translate-y-[70%]" },
  { className: "right-0 top-0 translate-x-[85%] -translate-y-[70%] scale-x-[-1]" },
  { className: "bottom-0 left-0 -translate-x-[85%] translate-y-[70%] scale-y-[-1]" },
  { className: "bottom-0 right-0 translate-x-[85%] translate-y-[70%] scale-[-1]" },
] as const;

const ARROW_SHAFT = "M6 14c18-6 40 2 46 24";
const ARROW_HEAD = "M40 36c5 1 9 1 12-2M52 38c1-4 2-7 0-11";

const ARROW_STEP_MS = 240;
const STROKE_MS = 380;

function stroke(active: boolean, delay: number) {
  return {
    pathLength: 1,
    style: {
      strokeDasharray: "1 2",
      strokeDashoffset: active ? 0 : 1.1,
      transition: `stroke-dashoffset ${STROKE_MS}ms ease-out ${delay}ms`,
    } as CSSProperties,
  };
}

/**
 * Hand-drawn arrows at all four corners pointing inward — for
 * `{{arrow:…}}` markdown spans (see {@link "@/components/sketch/TextEffect"}).
 * Each arrow draws on in sequence when scrolled into view.
 */
export function PointArrows({ children }: { children: ReactNode }) {
  const { ref, inView } = useInView<HTMLSpanElement>();

  return (
    <span ref={ref} className="relative mx-0.5 inline-block px-2 py-1">
      {CORNERS.map((corner, index) => {
        const baseDelay = index * ARROW_STEP_MS;

        return (
          <svg
            key={corner.className}
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className={[
              "pointer-events-none absolute h-7 w-7 text-marker/75 sm:h-8 sm:w-8",
              corner.className,
            ].join(" ")}
          >
            <path d={ARROW_SHAFT} {...stroke(inView, baseDelay)} />
            <path d={ARROW_HEAD} {...stroke(inView, baseDelay + STROKE_MS * 0.45)} />
          </svg>
        );
      })}
      <span className="relative z-10 font-semibold">{children}</span>
    </span>
  );
}
