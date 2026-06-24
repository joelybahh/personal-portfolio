import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

const palette = {
  paper: "#fbf9f4",
  ink: "#211e1a",
  inkSoft: "#4a463e",
  marker: "#2f6bd6",
  line: "#e4dfd2",
};

let fontsPromise: Promise<
  { name: string; data: Buffer; weight: 600 | 800; style: "normal" }[]
> | null = null;

async function loadFonts() {
  if (!fontsPromise) {
    const fontsDir = join(process.cwd(), "public/assets/fonts");
    fontsPromise = Promise.all([
      readFile(join(fontsDir, "Nunito-ExtraBold.woff")),
      readFile(join(fontsDir, "Caveat-SemiBold.woff")),
    ]).then(([nunito, caveat]) => [
      { name: "Nunito", data: nunito, weight: 800 as const, style: "normal" as const },
      { name: "Caveat", data: caveat, weight: 600 as const, style: "normal" as const },
    ]);
  }
  return fontsPromise;
}

function truncate(text: string, max: number) {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1).trimEnd()}…`;
}

function formatOgDate(value?: string) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-AU", { year: "numeric", month: "short", day: "numeric" });
}

function OgShell({
  eyebrow,
  title,
  description,
  footer,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  footer: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: palette.paper,
        backgroundImage: `radial-gradient(${palette.line} 1.5px, transparent 1.5px)`,
        backgroundSize: "22px 22px",
        fontFamily: "Nunito",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 1040,
          height: 520,
          padding: "52px 56px",
          border: `3px solid ${palette.ink}`,
          borderRadius: "28px 18px 24px 20px",
          backgroundColor: palette.paper,
          boxShadow: `8px 10px 0 0 ${palette.ink}`,
        }}
      >
        <div
          style={{
            fontFamily: "Caveat",
            fontSize: 36,
            color: palette.marker,
            marginBottom: 16,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: palette.ink,
            marginBottom: description ? 24 : 0,
          }}
        >
          {title}
        </div>
        {description ? (
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.45,
              color: palette.inkSoft,
              flex: 1,
            }}
          >
            {description}
          </div>
        ) : null}
        <div
          style={{
            marginTop: "auto",
            paddingTop: 28,
            borderTop: `2px dashed ${palette.line}`,
            fontSize: 22,
            color: palette.inkSoft,
          }}
        >
          {footer}
        </div>
      </div>
    </div>
  );
}

export async function createBlogIndexOgImage(siteName: string) {
  const fonts = await loadFonts();
  return new ImageResponse(
    (
      <OgShell
        eyebrow="Blog"
        title="Essays & notes"
        description="Software engineering, AI, and the realities of shipping products."
        footer={siteName}
      />
    ),
    { ...ogImageSize, fonts },
  );
}

export async function createBlogPostOgImage({
  title,
  summary,
  publishedAt,
  siteName,
}: {
  title: string;
  summary: string;
  publishedAt?: string;
  siteName: string;
}) {
  const fonts = await loadFonts();
  const date = formatOgDate(publishedAt);
  const eyebrow = date ? `Blog · ${date}` : "Blog";

  return new ImageResponse(
    (
      <OgShell
        eyebrow={eyebrow}
        title={truncate(title, 72)}
        description={truncate(summary, 140)}
        footer={siteName}
      />
    ),
    { ...ogImageSize, fonts },
  );
}
