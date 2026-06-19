"use client";

import { RoughNotation } from "react-rough-notation";
import type { ReactNode } from "react";
import { useInView } from "./useInView";

type ScribbleType =
  | "underline"
  | "box"
  | "circle"
  | "highlight"
  | "strike-through"
  | "crossed-off"
  | "bracket";

const palette = {
  marker: "#2F6BD6",
  coral: "#E8654B",
  leaf: "#3F9E6E",
  highlight: "#FFE08A",
  ink: "#211E1A",
};

export function Scribble({
  children,
  type = "underline",
  color = "marker",
  strokeWidth = 2.5,
  delay = 0,
  multiline = true,
  brackets = ["left", "right"],
  className,
}: {
  children: ReactNode;
  type?: ScribbleType;
  color?: keyof typeof palette;
  strokeWidth?: number;
  delay?: number;
  multiline?: boolean;
  /** Which sides to draw for `type="bracket"`. */
  brackets?: ("left" | "right" | "top" | "bottom")[];
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();

  return (
    <span
      ref={ref}
      className={[className, type === "highlight" && "text-ink"].filter(Boolean).join(" ")}
    >
      <RoughNotation
        type={type}
        show={inView}
        color={palette[color]}
        strokeWidth={strokeWidth}
        animationDuration={700}
        animationDelay={delay}
        padding={
          type === "highlight" ? 2 : type === "box" || type === "circle" || type === "bracket" ? 6 : 1
        }
        brackets={brackets}
        iterations={2}
        multiline={multiline}
      >
        {children}
      </RoughNotation>
    </span>
  );
}
