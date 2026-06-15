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
  className,
}: {
  children: ReactNode;
  type?: ScribbleType;
  color?: keyof typeof palette;
  strokeWidth?: number;
  delay?: number;
  multiline?: boolean;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();

  return (
    <span ref={ref} className={className}>
      <RoughNotation
        type={type}
        show={inView}
        color={palette[color]}
        strokeWidth={strokeWidth}
        animationDuration={700}
        animationDelay={delay}
        padding={type === "highlight" ? 2 : type === "box" || type === "circle" ? 6 : 1}
        iterations={2}
        multiline={multiline}
      >
        {children}
      </RoughNotation>
    </span>
  );
}
