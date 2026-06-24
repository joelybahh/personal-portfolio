import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DoodleStudio } from "@/components/sketch/DoodleStudio";

// Dev-only tool — never indexed, and 404s in production builds.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function DoodleStudioPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <DoodleStudio />;
}
