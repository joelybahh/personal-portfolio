import { site } from "@/lib/site";
import { createBlogIndexOgImage, ogImageContentType, ogImageSize } from "@/lib/og-image";

export const alt = "Joel Gabriel — Blog";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return createBlogIndexOgImage(site.name);
}
