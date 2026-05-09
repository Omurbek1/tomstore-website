"use client";

import { Fragment, startTransition, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Drawer } from "antd";
import { useTheme } from "styled-components";
import { IconLayoutGrid, IconList } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

import Box from "@component/Box";
import Card from "@component/Card";
import Select from "@component/Select";
import Icon from "@component/icon/Icon";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import { IconButton } from "@component/buttons";
import { H1, Paragraph } from "@component/Typography";
import ProductGridView from "@component/products/ProductGrid";
import ProductListView from "@component/products/ProductList";
import ProductFilterCard from "@component/products/ProductFilterCard";
import useWindowSize from "@hook/useWindowSize";
import Product from "@models/product.model";
import { useInfiniteStorefrontProducts } from "@hook/useStorefrontCatalog";
import { useRouter, usePathname } from "next/navigation";
import type {
  StorefrontCatalogFilters,
  StorefrontCatalogParams,
} from "@utils/__api__/storefront";

const SORT_MAP: Record<string, string> = {
  relevance: "popular",
  date: "newest",
  priceLowToHigh: "price_asc",
  priceHighToLow: "price_desc",
};

const SORT_KEY_BY_BACKEND_VALUE: Record<string, string> = Object.fromEntries(
  Object.entries(SORT_MAP).map(([key, value]) => [value, key]),
);

type Props = {
  products: Product[];
  query: string;
  searchType?: "text" | "category";
  catalogParams?: StorefrontCatalogParams;
  initialFilters?: StorefrontCatalogFilters;
};

export default function SearchResult({
  products,
  query: rawQuery,
  searchType = "text",
  catalogParams,
  initialFilters,
}: Props) {
  const theme = useTheme();
  const width = useWindowSize();
  const t = useTranslations("search");
  const filtersT = useTranslations("product.filters");
  const query = decodeURIComponent(rawQuery || "");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [drawerOpen, setDrawerOpen] = useState(false);

  // ── Filter state from URL ───────────────────────────────────────────────
  const view = (searchParams.get("view") as "grid" | "list") || "grid";

  const sortKey =
    searchParams.get("filterSort") ||
    (typeof catalogParams?.sort === "string"
      ? SORT_KEY_BY_BACKEND_VALUE[catalogParams.sort] || "relevance"
      : "relevance");

  const selectedCategory =
    searchParams.get("filterCategory") ||
    (typeof catalogParams?.category === "string" ? catalogParams.category : undefined) ||
    undefined;

  const selectedBrand = searchParams.get("filterBrand") || undefined;

  const selectedMinPrice = searchParams.get("filterMinPrice")
    ? Number(searchParams.get("filterMinPrice"))
    : undefined;

  const selectedMaxPrice = searchParams.get("filterMaxPrice")
    ? Number(searchParams.get("filterMaxPrice"))
    : undefined;

  const selectedOnSale = searchParams.get("filterOnSale") === "1";
  const selectedInStock = searchParams.get("filterInStock") === "1";
  const selectedFeatured = searchParams.get("filterFeatured") === "1";

  // ── URL updater ─────────────────────────────────────────────────────────
  const updateUrl = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === undefined || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
      const qs = params.toString();
      startTransition(() => {
        router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
      });
    },
    [router, pathname, searchParams],
  );

  // ── Live catalog params ─────────────────────────────────────────────────
  const baseParams: StorefrontCatalogParams =
    catalogParams ?? (searchType === "category" ? { category: query } : { q: query });

  const liveCatalogParams: StorefrontCatalogParams = {
    ...baseParams,
    ...(selectedCategory !== undefined ? { category: selectedCategory } : {}),
    ...(selectedBrand !== undefined ? { brand: selectedBrand } : {}),
    ...(selectedMinPrice !== undefined ? { minPrice: selectedMinPrice } : {}),
    ...(selectedMaxPrice !== undefined ? { maxPrice: selectedMaxPrice } : {}),
    ...(selectedOnSale
      ? { label: "sale" }
      : selectedFeatured
        ? { label: "hit" }
        : {}),
    ...(selectedInStock ? { availability: "in_stock" } : {}),
    sort: SORT_MAP[sortKey] ?? "popular",
  };

  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteStorefrontProducts(liveCatalogParams, products);

  const liveProducts = data?.pages.flatMap((p) => p.items) ?? products;
  const liveFilters = data?.pages[0]?.filters ?? initialFilters;
  const total = data?.pages[0]?.total;

  // ── Infinite scroll sentinel ─────────────────────────────────────────────
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "300px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // ── Handlers ────────────────────────────────────────────────────────────
  const sortOptions = [
    { label: t("sortOptions.relevance"), value: "relevance" },
    { label: t("sortOptions.date"), value: "date" },
    { label: t("sortOptions.priceLowToHigh"), value: "priceLowToHigh" },
    { label: t("sortOptions.priceHighToLow"), value: "priceHighToLow" },
  ];

  const handleSortChange = useCallback(
    (option: { value: string } | null) => {
      if (option) updateUrl({ filterSort: option.value });
    },
    [updateUrl],
  );

  const handleCategoryChange = useCallback(
    (category?: string) =>
      updateUrl({
        filterCategory: category,
        filterBrand: undefined,
        filterMinPrice: undefined,
        filterMaxPrice: undefined,
        filterOnSale: undefined,
        filterInStock: undefined,
        filterFeatured: undefined,
      }),
    [updateUrl],
  );

  const handleBrandChange = useCallback(
    (brand?: string) => updateUrl({ filterBrand: brand }),
    [updateUrl],
  );

  const handlePriceChange = useCallback(
    ({ minPrice, maxPrice }: { minPrice?: number; maxPrice?: number }) => {
      updateUrl({
        filterMinPrice: minPrice !== undefined ? String(minPrice) : undefined,
        filterMaxPrice: maxPrice !== undefined ? String(maxPrice) : undefined,
      });
    },
    [updateUrl],
  );

  const handleOnSaleChange = useCallback(
    (checked: boolean) => {
      const updates: Record<string, string | undefined> = {
        filterOnSale: checked ? "1" : undefined,
      };
      if (checked) updates.filterFeatured = undefined;
      updateUrl(updates);
    },
    [updateUrl],
  );

  const handleInStockChange = useCallback(
    (checked: boolean) => updateUrl({ filterInStock: checked ? "1" : undefined }),
    [updateUrl],
  );

  const handleFeaturedChange = useCallback(
    (checked: boolean) => {
      const updates: Record<string, string | undefined> = {
        filterFeatured: checked ? "1" : undefined,
      };
      if (checked) updates.filterOnSale = undefined;
      updateUrl(updates);
    },
    [updateUrl],
  );

  const filterCardProps = {
    catalogParams: liveCatalogParams,
    selectedCategory,
    selectedBrand,
    selectedMinPrice,
    selectedMaxPrice,
    selectedOnSale,
    selectedInStock,
    selectedFeatured,
    initialFilters: liveFilters,
    onCategoryChange: handleCategoryChange,
    onBrandChange: handleBrandChange,
    onPriceChange: handlePriceChange,
    onOnSaleChange: handleOnSaleChange,
    onInStockChange: handleInStockChange,
    onFeaturedChange: handleFeaturedChange,
  };

  const isTablet = width ? width < 1025 : false;
  const showDesktopFilters = !isTablet;
  const isFetchingFirstPage = isFetching && !isFetchingNextPage;

  return (
    <Fragment>
      {/* ── Toolbar ── */}
      <FlexBox
        as={Card}
        mb="55px"
        p="1.25rem"
        elevation={5}
        flexWrap="wrap"
        borderRadius={12}
        alignItems="center"
        justifyContent="space-between"
      >
        <div>
          <H1 fontSize="16px" fontWeight="600" mb="0" mt="0" color="text.primary">
            {t("searchingFor", { query })}
          </H1>
          <Paragraph color="text.muted">
            {isFetchingFirstPage
              ? "…"
              : total !== undefined
                ? t("resultsFound", { count: total })
                : t("resultsFound", { count: liveProducts.length })}
          </Paragraph>
        </div>

        <FlexBox alignItems="center" flexWrap="wrap" style={{ gap: "0.5rem" }}>
          <Paragraph color="text.muted">{t("sortBy")}</Paragraph>

          <Box minWidth="160px">
            <Select
              placeholder={t("sortPlaceholder")}
              value={sortOptions.find((o) => o.value === sortKey)}
              options={sortOptions}
              onChange={handleSortChange}
            />
          </Box>

          <Paragraph color="text.muted">{t("view")}</Paragraph>

          <IconButton onClick={toggleView("grid", updateUrl)} aria-label="Grid view" title="Grid view">
            <IconLayoutGrid
              size={22}
              color={view === "grid" ? theme.colors.primary.main : "currentColor"}
            />
          </IconButton>

          <IconButton onClick={toggleView("list", updateUrl)} aria-label="List view" title="List view">
            <IconList
              size={22}
              color={view === "list" ? theme.colors.primary.main : "currentColor"}
            />
          </IconButton>

          {isTablet && (
            <Fragment>
              <IconButton
                onClick={() => setDrawerOpen(true)}
                aria-label={filtersT("title")}
                title={filtersT("title")}
              >
                <Icon>options</Icon>
              </IconButton>

              <Drawer
                placement="left"
                size={320}
                open={drawerOpen}
                title={filtersT("title")}
                onClose={() => setDrawerOpen(false)}
                destroyOnHidden
                styles={{ body: { padding: 16, background: theme.colors.body.paper } }}
              >
                <ProductFilterCard {...filterCardProps} />
              </Drawer>
            </Fragment>
          )}
        </FlexBox>
      </FlexBox>

      {/* ── Content ── */}
      <Grid container spacing={6}>
        {showDesktopFilters && (
          <Grid item lg={3} xs={12}>
            <ProductFilterCard {...filterCardProps} />
          </Grid>
        )}

        <Grid item lg={showDesktopFilters ? 9 : 12} xs={12}>
          <div style={{ opacity: isFetchingFirstPage ? 0.55 : 1, transition: "opacity 0.25s ease" }}>
            {view === "grid" ? (
              <ProductGridView products={liveProducts} />
            ) : (
              <ProductListView products={liveProducts} />
            )}
          </div>

          {/* Infinite scroll sentinel */}
          <div ref={sentinelRef} style={{ height: 1 }} />

          {/* Loading next page indicator */}
          {isFetchingNextPage && (
            <FlexBox justifyContent="center" py="2rem">
              <Paragraph color="text.muted">
                {liveProducts.length} / {total ?? "…"}
              </Paragraph>
            </FlexBox>
          )}

          {/* End of results */}
          {!hasNextPage && liveProducts.length > 0 && !isFetchingFirstPage && (
            <FlexBox justifyContent="center" py="2rem">
              <Paragraph color="text.muted" fontSize="13px">
                {liveProducts.length} / {total ?? liveProducts.length}
              </Paragraph>
            </FlexBox>
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
}

function toggleView(
  v: "grid" | "list",
  updateUrl: (u: Record<string, string | undefined>) => void,
) {
  return () => updateUrl({ view: v });
}
