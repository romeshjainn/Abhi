"use client";

type LoaderArgs = { src: string; width: number; quality?: number };

/**
 * Resizes Unsplash photos through their CDN, so next/image gets responsive
 * sizes without needing an image-optimisation server.
 * Local images (e.g. /images/hero.jpg in /public) are served as-is.
 */
export default function imageLoader({ src, width, quality }: LoaderArgs): string {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "max");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 72));
    return url.toString();
  }
  return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
}
