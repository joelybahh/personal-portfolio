import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="eyebrow mb-1">{eyebrow}</p>
      <h2 className="section-title text-balance">{title}</h2>
      {children && (
        <p className="mt-4 font-sans text-lg leading-relaxed text-ink-soft dark:text-paper/70">
          {children}
        </p>
      )}
    </div>
  );
}
