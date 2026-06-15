"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { site } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink/90 bg-paper/85 backdrop-blur dark:border-paper/20 dark:bg-chalk/85">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label={site.name}>
          <span className="relative inline-block h-10 w-10 shrink-0 -rotate-3 overflow-hidden rounded-sketch border-2 border-ink dark:border-paper">
            <Image
              src={site.profileImage}
              alt={`${site.name} portrait`}
              fill
              sizes="40px"
              className="object-cover grayscale"
            />
          </span>
          <span className="leading-tight">
            <span className="block font-sans text-base font-extrabold tracking-tight">{site.name}</span>
            <span className="block font-hand text-base text-marker">{site.role}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 font-sans text-sm font-semibold text-ink-soft transition-colors hover:bg-paper-soft hover:text-ink dark:text-paper/70 dark:hover:bg-chalk-soft dark:hover:text-paper"
            >
              {item.label}
            </Link>
          ))}
          <span className="mx-1 h-6 w-px bg-ink/15 dark:bg-paper/15" />
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            className="icon-btn"
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-5 w-5">
              {open ? <path d="M6 6l12 12M6 18 18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t-2 border-dashed border-ink/30 bg-paper px-4 py-3 dark:border-paper/20 dark:bg-chalk md:hidden">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 font-sans text-base font-semibold hover:bg-paper-soft dark:hover:bg-chalk-soft"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
