import type { Metadata } from "next";
import { Suspense } from "react";
import AppLayout from "@component/layout/layout-3";
import Box from "@component/Box";
import SearchResult from "../product/search/[slug]/SearchResult";
import Breadcrumbs from "@component/seo/Breadcrumbs";
import { getSafeStorefrontCatalog, mapStorefrontProduct } from "@utils/__api__/storefront";
import { getTranslations } from "next-intl/server";

type CatalogRootPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    q?: string;
    category?: string;
    brand?: string;
    availability?: string;
    label?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
};

import { SITE_URL } from "@lib/siteUrl";

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

const toNumberParam = (value?: string) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
};

export default async function CatalogRootPage({ params, searchParams }: CatalogRootPageProps) {
  const [{ locale }, sp] = await Promise.all([params, searchParams]);

  const filterParams = Object.fromEntries(
    Object.entries({
      q: sp.q,
      category: sp.category,
      brand: sp.brand,
      availability: sp.availability,
      label: sp.label,
      sort: sp.sort,
      minPrice: toNumberParam(sp.minPrice),
      maxPrice: toNumberParam(sp.maxPrice),
    }).filter(([, v]) => v !== undefined && v !== ""),
  );

  const [t, catalog] = await Promise.all([
    getTranslations({ locale, namespace: "home" }),
    getSafeStorefrontCatalog({
      ...filterParams,
      pageSize: 48,
      sort: (filterParams.sort as string) || "popular",
    }),
  ]);

  let displayQuery = locale === "en" ? "Catalog" : "Каталог";
  if (sp.label === "sale") displayQuery = t("flashDeals");
  else if (sp.label === "new") displayQuery = t("newArrivals");
  else if (sp.category) displayQuery = sp.category;
  else if (sp.q) displayQuery = sp.q;
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
            catalogParams={filterParams}
            initialFilters={catalog?.filters}
          />
        </Suspense>
      </Box>
    </AppLayout>
  );
}
