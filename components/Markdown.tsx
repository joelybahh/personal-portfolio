import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { rehypeTextEffects } from "@/lib/markdown-effects";
import { TextEffect } from "@/components/sketch/TextEffect";

export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose-sketch prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeTextEffects,
          rehypeSlug,
          [rehypeHighlight, { detect: true, ignoreMissing: true }],
        ]}
        components={{
          a: ({ href, children, ...props }) => {
            const external = href?.startsWith("http");
            return (
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                {...props}
              >
                {children}
              </a>
            );
          },
          span: ({ className, children, ...props }) => {
            const classes = typeof className === "string" ? className.split(" ") : [];
            if (classes.includes("md-effect")) {
              const effect =
                classes.find((c) => c.startsWith("effect-"))?.slice("effect-".length) ?? "";
              return <TextEffect effect={effect}>{children}</TextEffect>;
            }
            return (
              <span className={className} {...props}>
                {children}
              </span>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
