/* eslint-disable @typescript-eslint/no-explicit-any */

const EFFECT_RE = /\{\{([\w-]+):([^{}]+)\}\}/g;

/**
 * rehype plugin. Rewrites `{{effect:some text}}` in body copy into
 *   <span class="md-effect effect-<name>">some text</span>
 * so the Markdown renderer can swap in a hand-drawn or animated text effect
 * (see {@link "@/components/sketch/TextEffect"}). `code`/`pre` subtrees are
 * skipped so snippets are never rewritten.
 *
 * Example: `## The Claude Code {{flicker:Flicker}} Problem`
 */
export function rehypeTextEffects() {
  return (tree: any) => visit(tree);
}

function visit(node: any): void {
  if (!node || !Array.isArray(node.children)) return;
  if (node.type === "element" && (node.tagName === "code" || node.tagName === "pre")) {
    return;
  }

  const next: any[] = [];
  for (const child of node.children) {
    if (child.type === "text" && child.value.includes("{{")) {
      next.push(...splitText(child.value));
    } else {
      visit(child);
      next.push(child);
    }
  }
  node.children = next;
}

function splitText(value: string): any[] {
  const out: any[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  EFFECT_RE.lastIndex = 0;
  while ((match = EFFECT_RE.exec(value)) !== null) {
    if (match.index > last) {
      out.push({ type: "text", value: value.slice(last, match.index) });
    }
    out.push({
      type: "element",
      tagName: "span",
      properties: { className: ["md-effect", `effect-${match[1]}`] },
      children: [{ type: "text", value: match[2] }],
    });
    last = match.index + match[0].length;
  }
  if (last < value.length) {
    out.push({ type: "text", value: value.slice(last) });
  }
  return out;
}
