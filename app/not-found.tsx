import Link from "next/link";
import { Scribble } from "@/components/sketch/Scribble";
import { ArrowLeftIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="font-hand text-7xl text-marker">404</p>
      <h1 className="mt-2 section-title">
        This page went{" "}
        <Scribble type="strike-through" color="coral">
          missing
        </Scribble>
      </h1>
      <p className="mt-4 font-sans text-lg text-ink-soft dark:text-paper/70">
        Either it never existed, or my pencil rubbed it out. Let&apos;s get you back.
      </p>
      <Link href="/" className="btn-sketch mt-8">
        <ArrowLeftIcon className="h-4 w-4" />
        Back home
      </Link>
    </div>
  );
}
