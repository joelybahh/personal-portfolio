import Link from "next/link";
import { site } from "@/lib/site";
import { SocialLinks } from "./SocialLinks";
import { SquiggleDivider } from "@/components/sketch/Doodles";

export function Footer() {
  return (
    <footer className="mt-24 border-t-2 border-ink/90 bg-paper-soft dark:border-paper/20 dark:bg-chalk-soft">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <SquiggleDivider className="mb-8 h-4 w-full text-marker/50" />
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="font-hand text-2xl text-marker">Let&apos;s build something.</p>
            <p className="mt-1 font-sans text-sm text-ink-soft dark:text-paper/60">
              © {new Date().getFullYear()} {site.name}. Hand-drawn with care.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 sm:items-end">
            <nav className="flex gap-4">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-sans text-sm font-semibold text-ink-soft underline-offset-4 hover:underline dark:text-paper/70"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <SocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}
