import type { SVGProps } from "react";

export function SquiggleDivider({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 24"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      <path
        d="M2 12c40-12 80 12 120 0s80-12 120 0 80 12 120 0 80-12 120 0 80 12 120 0 80-12 120 0 80 12 120 0 80-12 120 0 80 12 120 0"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Star({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className} {...props}>
      <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
    </svg>
  );
}

export function CurvedArrow({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className} {...props}>
      <path d="M6 14c18-6 40 2 46 24" />
      <path d="M40 36c5 1 9 1 12-2M52 38c1-4 2-7 0-11" />
    </svg>
  );
}

export function Underline({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 220 16" fill="none" preserveAspectRatio="none" aria-hidden>
      <path
        d="M3 9c40-5 120-7 214-3M5 13c60-4 140-4 210 0"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
