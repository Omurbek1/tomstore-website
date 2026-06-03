import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AppLayout from "@component/layout/layout-1";
import Navbar from "@component/navbar/Navbar";
import HomePage from "@sections/home/HomePage";
import WebSiteJsonLd from "@component/seo/WebSiteJsonLd";
import { SITE_URL } from "@lib/siteUrl";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LocaleLayout" });
  const title = t("title");
  const description = t("description");
  const url = `${SITE_URL}/${locale}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ru: `${SITE_URL}/ru`,
        en: `${SITE_URL}/en`,
        ky: `${SITE_URL}/ky`,
        "x-default": `${SITE_URL}/ru`,
      },
    },
    openGraph: {
      title,
      description,
      url,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default function Home() {
  return (
    <AppLayout navbar={<Navbar />}>
      {/* OrganizationJsonLd теперь рендерится глобально в корневом app/layout.tsx */}
      <WebSiteJsonLd />
      <HomePage />
    </AppLayout>
  );
}
