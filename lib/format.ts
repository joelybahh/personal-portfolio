/**
 * Strips inline markup (e.g. the `<em>` spans used to drive the highlighter
 * effect in titles) down to plain text. Used for metadata, SEO and JSON-LD
 * where raw HTML must not appear.
 */
export function stripTitleMarkup(text: string): string {
  return text.replace(/<[^>]+>/g, "");
}
