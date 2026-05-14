import type { Metadata } from "next";
import { Suspense } from "react";
import AppLayout from "@component/layout/main-layout";
import Box from "@component/Box";
import SearchResult from "../product/search/[slug]/SearchResult";
import Breadcrumbs from "@component/seo/Breadcrumbs";
import { getSafeStorefrontCatalog, mapStorefrontProduct } from "@utils/__api__/storefront";
import { getTranslations } from "next-intl/server";

type CatalogRootPageProps = {
  params: Promise<{ locale: string }>;
};

import { SITE_URL } from "@lib/siteUrl";

export const revalidate = 60;

export async function generateMetadata({ params }: CatalogRootPageProps): Promise<Metadata> {
  const { locale } = await params;
  const url = `${SITE_URL}/${locale}/catalog`;
  const title = locale === "en" ? "Catalog" : "Каталог";
  const description =
    locale === "en"
      ? "Full catalog of electronics: laptops, printers, PCs and accessories in Bishkek. Warranty, installment, delivery. TomStore."
      : "Полный каталог электроники: ноутбуки, принтеры, ПК и аксессуары в Бишкеке. Гарантия, рассрочка, доставка. TomStore.";

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ru: `${SITE_URL}/ru/catalog`,
        en: `${SITE_URL}/en/catalog`,
        ky: `${SITE_URL}/ky/catalog`,
      },
    },
    openGraph: { title, description, url, type: "website" },
  };
}

export default async function CatalogRootPage({ params }: CatalogRootPageProps) {
  const { locale } = await params;

  const [t, catalog] = await Promise.all([
    getTranslations({ locale, namespace: "home" }),
    getSafeStorefrontCatalog({ pageSize: 24, sort: "popular" }),
  ]);

  const displayQuery = locale === "en" ? "Catalog" : "Каталог";
  const products = catalog?.items.map(mapStorefrontProduct) || [];
  const homeLabel = locale === "en" ? "Home" : locale === "ky" ? "Башкы бет" : "Главная";
  const catalogLabel = locale === "en" ? "Catalog" : "Каталог";

  return (
    <AppLayout>
      <Box pt="20px">
        <Breadcrumbs
          items={[{ label: homeLabel, href: "/" }, { label: catalogLabel }]}
          locale={locale}
        />
        <Suspense>
          <SearchResult
            products={products}
            query={displayQuery}
            searchType="text"
            catalogParams={{}}
            initialFilters={catalog?.filters}
          />
        </Suspense>
      </Box>
    </AppLayout>
  );
}
