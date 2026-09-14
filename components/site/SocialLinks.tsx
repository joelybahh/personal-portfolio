import { site } from "@/lib/site";
import { SocialIcon } from "@/components/icons";

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {site.socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="icon-btn"
        >
          <SocialIcon label={s.label} className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
