import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

import { SITE_URL } from "@lib/siteUrl";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const isKy = locale === "ky";
  const url = `${SITE_URL}/${locale}/about`;

  const title = isEn
    ? "About TomStore — Electronics Store in Bishkek"
    : isKy
    ? "Биз жөнүндө — TomStore Бишкек"
    : "О магазине — TomStore Бишкек";

  const description = isEn
    ? "TomStore — your trusted electronics store in Bishkek, Kyrgyzstan. Laptops, printers, PCs and accessories with official warranty, installment plans, and expert advice."
    : isKy
    ? "TomStore — Бишкектеги ишенимдүү электроника дүкөнү. Ноутбуктар, принтерлер, ПК жана аксессуарлар расмий кепилдик, бөлүп төлөө жана эксперттик кеңеш менен."
    : "TomStore — ваш надёжный магазин электроники в Бишкеке. Ноутбуки, принтеры, ПК и аксессуары с официальной гарантией, рассрочкой и экспертной консультацией.";

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ru: `${SITE_URL}/ru/about`,
        en: `${SITE_URL}/en/about`,
        ky: `${SITE_URL}/ky/about`,
      },
    },
    openGraph: { title, description, url, type: "website" },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  return <AboutPageClient locale={locale} />;
}
