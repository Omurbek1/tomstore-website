import type { Metadata } from "next";
import { Suspense } from "react";
import AppLayout from "@component/layout/layout-3";
import Box from "@component/Box";
import SearchResult from "../../product/search/[slug]/SearchResult";
import Breadcrumbs from "@component/seo/Breadcrumbs";
import CategorySeo from "@component/seo/CategorySeo";
import navigations from "@data/navigations";
import localizeNavigations from "@utils/localizeNavigations";
import { buildCatalogBreadcrumbs } from "@utils/buildCatalogBreadcrumbs";
import {
  getSafeStorefrontCatalog,
  mapStorefrontProduct,
} from "@utils/__api__/storefront";
import { getTranslations } from "next-intl/server";

import { SITE_URL } from "@lib/siteUrl";

export const revalidate = 60;

type CatalogPageProps = {
  params: Promise<{ locale: string; slug: string[] }>;
};

const normalizeCatalogSegment = (segment: string) =>
  safeDecodeURIComponent(segment)
    .replace(/[-_]+/g, " ")
    .trim();

const normalizeCatalogPath = (segments: string[]) => `/catalog/${segments.join("/")}`;

const flattenLocalizedCatalogLinks = (
  items: ReturnType<typeof localizeNavigations>,
) => {
  const links: Array<{ href: string; title: string }> = [];

  for (const item of items) {
    links.push({ href: item.href, title: item.title });

    for (const group of item.menuData?.categories || []) {
      links.push({ href: group.href, title: group.title });

      for (const subCategory of group.subCategories || []) {
        links.push({ href: subCategory.href, title: subCategory.title });
      }
    }
  }

  return links;
};

const getLocalizedCatalogTitle = async (locale: string, path: string) => {
  const t = await getTranslations({ locale });
  const localizedNavigations = localizeNavigations(navigations, t);
  const links = flattenLocalizedCatalogLinks(localizedNavigations);

  return links.find((link) => link.href === path)?.title;
};

const resolveCatalogQuery = async (locale: string, segments: string[]) => {
  const path = normalizeCatalogPath(segments);
  const lastSegment = segments.at(-1) || "";
  const segmentQuery = normalizeCatalogSegment(lastSegment);

  // Get the title in the user's locale for display
  const [currentLocaleTitle, ruTitle] = await Promise.all([
    getLocalizedCatalogTitle(locale, path),
    // Always get the RU title for the API category filter (backend stores categories in Russian)
    getLocalizedCatalogTitle("ru", path),
  ]);

  // Use the RU category name if found (API understands it), otherwise fall back to the decoded segment
  const apiCategorySlug = ruTitle || safeDecodeURIComponent(lastSegment).trim();

  return {
    displayQuery: currentLocaleTitle || segmentQuery,
    candidates: [currentLocaleTitle || segmentQuery],
    categorySlug: apiCategorySlug,
  };
};

const normalizeCatalogQuery = (segments: string[]) => {
  const lastSegment = segments.at(-1) || "";
  return safeDecodeURIComponent(lastSegment)
    .replace(/[-_]+/g, " ")
    .trim();
};

const safeDecodeURIComponent = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};


export async function generateMetadata({ params }: CatalogPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const { displayQuery } = await resolveCatalogQuery(locale, slug);
  const path = normalizeCatalogPath(slug);
  const url = `${SITE_URL}/${locale}${path}`;
  const title = displayQuery
    ? locale === "en"
      ? `${displayQuery} — Buy in Bishkek | TomStore`
      : `${displayQuery} — купить в Бишкеке | TomStore`
    : "TomStore";
  const description =
    locale === "en"
      ? `${displayQuery} at the best prices in Bishkek. Warranty, installment, delivery. TomStore.`
      : `${displayQuery} по лучшим ценам в Бишкеке. Гарантия, рассрочка, доставка. TomStore.`;

  return {
    title: displayQuery,
    description,
    alternates: {
      canonical: url,
      languages: {
        ru: `${SITE_URL}/ru${path}`,
        en: `${SITE_URL}/en${path}`,
        ky: `${SITE_URL}/ky${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
  };
}

export default async function CatalogPage({ params }: CatalogPageProps) {
  const { locale, slug } = await params;
  const fallbackQuery = normalizeCatalogQuery(slug);
  const { displayQuery, categorySlug, candidates } = await resolveCatalogQuery(locale, slug);
  const catalogParams = categorySlug
    ? { category: categorySlug }
    : candidates[0]
      ? { q: candidates[0] }
      : { q: fallbackQuery };
  const [catalog, t] = await Promise.all([
    getSafeStorefrontCatalog({ ...catalogParams, pageSize: 48, sort: "popular" }),
    getTranslations({ locale }),
  ]);
  const products = catalog?.items.map(mapStorefrontProduct) || [];
  const homeLabel = locale === "en" ? "Home" : locale === "ky" ? "Башкы бет" : "Главная";
  const breadcrumbs = buildCatalogBreadcrumbs(slug, homeLabel, (key) => t(key as never));

  return (
    <AppLayout>
      <Box pt="20px">
        <Breadcrumbs items={breadcrumbs} locale={locale} />
        <Suspense>
          <SearchResult
            products={products}
            query={displayQuery || fallbackQuery}
            searchType="text"
            catalogParams={catalogParams}
            initialFilters={catalog?.filters}
          />
        </Suspense>
        <CategorySeo catalogPath={normalizeCatalogPath(slug)} locale={locale} />
      </Box>
    </AppLayout>
  );
}
