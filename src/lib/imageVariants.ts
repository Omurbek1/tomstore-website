// URL transformation utilities for the multi-size image pipeline.
//
// New-pipeline URLs contain a size segment in the path:
//   products/thumb-300/{uuid}.webp
//   products/medium-800/{uuid}.webp
//   products/large-1400/{uuid}.webp
//   products/original/{uuid}.webp
//
// Legacy URLs (no size segment) are returned unchanged so Next.js Image
// optimization handles them via /_next/image as a fallback.

const SIZE_SEGMENTS = ["/thumb-300/", "/medium-800/", "/large-1400/", "/original/"] as const;

function swapSize(url: string, target: string): string {
  for (const seg of SIZE_SEGMENTS) {
    if (url.includes(seg)) {
      let result = url.replace(seg, `/${target}/`);
      // Banners/categories store AVIF originals; thumb+medium are always WebP
      if (target !== "original" && target !== "large-1400" && result.endsWith(".avif")) {
        result = `${result.slice(0, -5)}.webp`;
      }
      return result;
    }
  }
  return url; // legacy URL: leave unchanged, Next.js will optimize
}

export const getThumbUrl = (url?: string | null): string =>
  url ? swapSize(url, "thumb-300") : "";

export const getMediumUrl = (url?: string | null): string =>
  url ? swapSize(url, "medium-800") : "";

export const getLargeUrl = (url?: string | null): string =>
  url ? swapSize(url, "large-1400") : "";

export const getOriginalUrl = (url?: string | null): string =>
  url ?? "";
