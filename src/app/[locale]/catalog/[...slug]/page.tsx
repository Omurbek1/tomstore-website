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
  type StorefrontCatalogParams,
} from "@utils/__api__/storefront";
import { getTranslations } from "next-intl/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tomstore.kg";

type CatalogPageProps = {
  params: Promise<{ locale: string; slug: string[] }>;
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

const normalizeCatalogSegment = (segment: string) =>
  decodeURIComponent(segment)
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
  const currentLocaleTitle = await getLocalizedCatalogTitle(locale, path);

  return {
    displayQuery: currentLocaleTitle || segmentQuery,
    candidates: [currentLocaleTitle || segmentQuery],
    categorySlug: decodeURIComponent(lastSegment).trim(),
  };
};

const normalizeCatalogQuery = (segments: string[]) => {
  const lastSegment = segments.at(-1) || "";
  return decodeURIComponent(lastSegment)
    .replace(/[-_]+/g, " ")
    .trim();
};

const toNumberParam = (value?: string) => {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : undefined;
};

const getCatalogParamsFromSearch = (
  searchParams: Awaited<CatalogPageProps["searchParams"]>,
): StorefrontCatalogParams => {
  const params: StorefrontCatalogParams = {
    q: searchParams.q,
    category: searchParams.category,
    brand: searchParams.brand,
    availability: searchParams.availability,
    label: searchParams.label,
    sort: searchParams.sort,
    minPrice: toNumberParam(searchParams.minPrice),
    maxPrice: toNumberParam(searchParams.maxPrice),
  };

  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ""),
  );
};

const hasDirectCatalogParams = (params: StorefrontCatalogParams) =>
  Object.keys(params).length > 0;

const getDirectCatalogTitle = async (
  locale: string,
  fallbackQuery: string,
  params: StorefrontCatalogParams,
) => {
  const homeT = await getTranslations({ locale, namespace: "home" });

  if (params.label === "sale") return homeT("flashDeals");
  if (params.label === "new") return homeT("newArrivals");
  if (params.category && typeof params.category === "string") return params.category;
  if (params.q && typeof params.q === "string") return params.q;
  if (fallbackQuery.toLowerCase() === "all") {
    if (locale === "en") return "Catalog";
    if (locale === "ky") return "Каталог";
    return "Каталог";
  }
  return fallbackQuery;
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

export default async function CatalogPage({ params, searchParams }: CatalogPageProps) {
  const [{ locale, slug }, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const fallbackQuery = normalizeCatalogQuery(slug);
  const directCatalogParams = getCatalogParamsFromSearch(resolvedSearchParams);
  const useDirectCatalog = hasDirectCatalogParams(directCatalogParams);
  const { displayQuery, candidates, categorySlug } = useDirectCatalog
    ? {
        displayQuery: await getDirectCatalogTitle(
          locale,
          fallbackQuery,
          directCatalogParams,
        ),
        candidates: [],
        categorySlug: "",
      }
    : await resolveCatalogQuery(locale, slug);
  const catalogParams = useDirectCatalog
    ? directCatalogParams
    : categorySlug
      ? { category: categorySlug }
      : candidates[0]
        ? { q: candidates[0] }
        : { q: fallbackQuery };
  const catalog = await getSafeStorefrontCatalog({
    ...catalogParams,
    pageSize: 48,
    sort: catalogParams.sort || "popular",
  });
  const products = catalog?.items.map(mapStorefrontProduct) || [];
  const t = await getTranslations({ locale, namespace: "" });
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
