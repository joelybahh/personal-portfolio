"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";

type Spark = {
  id: number;
  left: string;
  top: string;
  size: string;
  dx: string;
  dy: string;
  rotate: string;
  duration: string;
  variant: "warm" | "cool";
};

const SPARK_COUNT = 3;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createSpark(id: number): Spark {
  return {
    id,
    left: `${randomBetween(8, 92).toFixed(2)}%`,
    top: `${randomBetween(18, 82).toFixed(2)}%`,
    size: `${randomBetween(0.28, 0.46).toFixed(3)}em`,
    dx: `${randomBetween(-0.1, 0.16).toFixed(3)}em`,
    dy: `${randomBetween(-0.26, 0.12).toFixed(3)}em`,
    rotate: `${randomBetween(-24, 24).toFixed(1)}deg`,
    duration: `${Math.round(randomBetween(720, 1180))}ms`,
    variant: Math.random() > 0.55 ? "cool" : "warm",
  };
}

export function MagicText({ children }: { children: ReactNode }) {
  const [sparkles, setSparkles] = useState<Array<Spark | null>>(
    Array.from({ length: SPARK_COUNT }, () => null),
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timeouts = new Set<number>();

    const schedule = (index: number, delay: number) => {
      const timeoutId = window.setTimeout(() => {
        timeouts.delete(timeoutId);
        setSparkles((current) => {
          const next = [...current];
          next[index] = createSpark(Date.now() + index);
          return next;
        });
        schedule(index, randomBetween(1400, 3200));
      }, delay);

      timeouts.add(timeoutId);
    };

    for (let index = 0; index < SPARK_COUNT; index += 1) {
      schedule(index, randomBetween(220, 1800));
    }

    return () => {
      for (const timeoutId of timeouts) {
        window.clearTimeout(timeoutId);
      }
      timeouts.clear();
    };
  }, []);

  return (
    <span className="md-magic">
      <span className="md-magic-text">{children}</span>
      <span className="md-magic-sparks" aria-hidden="true">
        {sparkles.map((sparkle) =>
          sparkle ? (
            <span
              key={sparkle.id}
              className={`md-magic-spark md-magic-spark--${sparkle.variant}`}
              style={
                {
                  "--magic-left": sparkle.left,
                  "--magic-top": sparkle.top,
                  "--magic-size": sparkle.size,
                  "--magic-dx": sparkle.dx,
                  "--magic-dy": sparkle.dy,
                  "--magic-rotate": sparkle.rotate,
                  "--magic-duration": sparkle.duration,
                } as CSSProperties
              }
            />
          ) : null,
        )}
      </span>
    </span>
  );
}
