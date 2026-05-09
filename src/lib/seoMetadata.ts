import type { Metadata } from "next";
import { SITE_URL } from "./siteUrl";

export const DEFAULT_SEO_TITLE = "TomStore — Электроника с доставкой по Кыргызстану";

export const DEFAULT_SEO_DESCRIPTION =
  "TomStore — интернет-магазин электроники с доставкой по всему Кыргызстану. Ноутбуки, принтеры, ПК, мониторы, гарантия и рассрочка.";

type FallbackMetadataOptions = {
  locale?: string;
  path?: string;
  title?: string;
  description?: string;
  type?: "website" | "article";
};

export function buildFallbackMetadata({
  locale = "ru",
  path = "",
  title = DEFAULT_SEO_TITLE,
  description = DEFAULT_SEO_DESCRIPTION,
  type = "website",
}: FallbackMetadataOptions = {}): Metadata {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${SITE_URL}/${locale}${normalizedPath === "/" ? "" : normalizedPath}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type,
    },
    twitter: {
      title,
      description,
    },
  };
}
