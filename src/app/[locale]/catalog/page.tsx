import { Suspense } from "react";
import AppLayout from "@component/layout/layout-3";
import Box from "@component/Box";
import SearchResult from "../product/search/[slug]/SearchResult";
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

const toNumberParam = (value?: string) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
};

export default async function CatalogRootPage({ params, searchParams }: CatalogRootPageProps) {
  const [{ locale }, sp] = await Promise.all([params, searchParams]);
  const t = await getTranslations({ locale, namespace: "home" });

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

  let displayQuery = locale === "en" ? "Catalog" : "Каталог";
  if (sp.label === "sale") displayQuery = t("flashDeals");
  else if (sp.label === "new") displayQuery = t("newArrivals");
  else if (sp.category) displayQuery = sp.category;
  else if (sp.q) displayQuery = sp.q;

  const catalog = await getSafeStorefrontCatalog({
    ...filterParams,
    pageSize: 48,
    sort: (filterParams.sort as string) || "popular",
  });
  const products = catalog?.items.map(mapStorefrontProduct) || [];

  return (
    <AppLayout>
      <Box pt="20px">
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
