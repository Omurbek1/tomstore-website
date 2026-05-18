"use client";

import { Fragment, startTransition, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Drawer } from "antd";
import styled, { useTheme } from "styled-components";
import {
  IconLayoutGrid,
  IconList,
  IconX,
  IconCheck,
  IconFilter,
  IconArrowsSort,
  IconSearch,
} from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import dynamic from "next/dynamic";

import Box from "@component/Box";
import Card from "@component/Card";
import Select from "@component/Select";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import { IconButton } from "@component/buttons";
import { H1, Paragraph } from "@component/Typography";
import ProductFilterCard from "@component/products/ProductFilterCard";
import MobileFilterSheet from "@component/products/MobileFilterSheet";
import useWindowSize from "@hook/useWindowSize";
import Product from "@models/product.model";
import { useInfiniteStorefrontProducts } from "@hook/useStorefrontCatalog";
import { useRouter, usePathname } from "next/navigation";
import type {
  StorefrontCatalogFilters,
  StorefrontCatalogParams,
} from "@utils/__api__/storefront";

const ProductGridView = dynamic(() => import("@component/products/ProductGrid"), {
  ssr: false,
  loading: () => <ProductViewSkeleton />,
});
const ProductListView = dynamic(() => import("@component/products/ProductList"), {
  ssr: false,
  loading: () => <ProductViewSkeleton />,
});

function ProductViewSkeleton() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          style={{
            borderRadius: 12,
            height: 320,
            background: "var(--sk-color, #e8eaf0)",
            animation: "pulse 1.4s ease-in-out infinite",
          }}
        />
      ))}
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.45} }
        [data-theme="dark"] { --sk-color: #192036; }
        @media(prefers-color-scheme:dark) { :root:not([data-theme="light"]) { --sk-color: #192036; } }
        @media(min-width:1025px) { .pv-sk { grid-template-columns: repeat(3,1fr) !important; } }
      `}</style>
    </div>
  );
}

// ── Styled ─────────────────────────────────────────────────────────────────────

const ActiveChip = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px 4px 12px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.primary.main};
  background: ${({ theme }) =>
    theme.isDark ? "rgba(206,22,46,0.12)" : theme.colors.primary.light};
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: background 0.15s;
  &:hover {
    background: ${({ theme }) =>
      theme.isDark ? "rgba(206,22,46,0.22)" : "#ffd7dc"};
  }
`;

const ResetAllBtn = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.text.hint};
  background: transparent;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: border-color 0.15s, color 0.15s;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const DesktopSortRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const ChipsScrollRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  @media (max-width: 1024px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    padding-bottom: 2px;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;


const FilterCountBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
  margin-left: 2px;
`;

/* Sort + view toggle row — visible on mobile only, sits above the product list */
const MobileSortViewBar = styled.div`
  display: none;
  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 12px;
  }
`;

const MobileSortBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 12px 7px 10px;
  border-radius: 10px;
  border: 1px solid
    ${({ theme }) =>
      theme.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.09)"};
  background: transparent;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  min-width: 0;
  flex: 1;
  max-width: 220px;
`;

const MobileSortLabel = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  text-align: left;
`;

const MobileViewToggleInline = styled.div`
  display: flex;
  border-radius: 10px;
  border: 1px solid
    ${({ theme }) =>
      theme.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.09)"};
  overflow: hidden;
  flex-shrink: 0;
`;

const MobileViewBtnInline = styled.button<{ $active?: boolean }>`
  width: 36px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-right: 1px solid
    ${({ theme }) =>
      theme.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.07)"};
  background: ${({ theme, $active }) =>
    $active
      ? theme.isDark
        ? "rgba(206,22,46,0.14)"
        : theme.colors.primary.light
      : "transparent"};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary.main : theme.colors.text.hint};
  cursor: pointer;
  transition: all 0.15s;
  &:last-child {
    border-right: none;
  }
`;

/* Filter button that appears inside the toolbar on mobile (right side) */
const MobileFilterBtn = styled.button<{ $active?: boolean }>`
  display: none;
  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    gap: 6px;
    height: 36px;
    padding: 0 14px;
    border-radius: 20px;
    flex-shrink: 0;
    border: 1.5px solid
      ${({ theme, $active }) =>
        $active
          ? theme.colors.primary.main
          : theme.isDark
            ? "rgba(255,255,255,0.14)"
            : "rgba(0,0,0,0.12)"};
    background: ${({ theme, $active }) =>
      $active
        ? theme.isDark
          ? "rgba(206,22,46,0.16)"
          : "#fff0f2"
        : "transparent"};
    color: ${({ theme, $active }) =>
      $active ? theme.colors.primary.main : theme.colors.text.primary};
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.15s;
  }
`;

/* Full-screen filter modal (mobile only, slides up from bottom) */
const FilterModal = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1200;
  background: ${({ theme }) => theme.colors.body.paper};
  display: flex;
  flex-direction: column;
  animation: fmUp 0.28s cubic-bezier(0.32, 0.72, 0, 1);
  @keyframes fmUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const FilterModalHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 56px;
  flex-shrink: 0;
  border-bottom: 1px solid
    ${({ theme }) =>
      theme.isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"};
`;

const FilterModalTitle = styled.span`
  font-size: 17px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const FilterModalClose = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) =>
    theme.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  &:active {
    background: ${({ theme }) =>
      theme.isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.1)"};
  }
`;

const FilterModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
`;

const SortOptionItem = styled.button<{ $active?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 4px;
  border: none;
  border-bottom: 1px solid
    ${({ theme }) =>
      theme.isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"};
  background: transparent;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary.main : theme.colors.text.primary};
  font-size: 15px;
  font-weight: ${({ $active }) => ($active ? "600" : "400")};
  cursor: pointer;
  text-align: left;
  transition: background 0.1s;
  &:last-child {
    border-bottom: none;
  }
  &:active {
    background: ${({ theme }) =>
      theme.isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"};
  }
`;

// ── Constants ─────────────────────────────────────────────────────────────────

const SORT_MAP: Record<string, string> = {
  relevance: "popular",
  date: "newest",
  priceLowToHigh: "price_asc",
  priceHighToLow: "price_desc",
};

const SORT_KEY_BY_BACKEND_VALUE: Record<string, string> = Object.fromEntries(
  Object.entries(SORT_MAP).map(([key, value]) => [value, key]),
);

// ── Component ─────────────────────────────────────────────────────────────────

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

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sortDrawerOpen, setSortDrawerOpen] = useState(false);

  // ── Filter state from URL ──────────────────────────────────────────────────
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

  // ── URL updater ────────────────────────────────────────────────────────────
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

  // ── Live catalog params ────────────────────────────────────────────────────
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

  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteStorefrontProducts(liveCatalogParams, products);

  const liveProducts = data?.pages.flatMap((p) => p.items) ?? products;
  const liveFilters = data?.pages[0]?.filters ?? initialFilters;
  const total = data?.pages[0]?.total;

  // ── Infinite scroll sentinel ───────────────────────────────────────────────
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

  // ── Sort options ───────────────────────────────────────────────────────────
  const sortOptions = [
    { label: t("sortOptions.relevance"), value: "relevance" },
    { label: t("sortOptions.date"), value: "date" },
    { label: t("sortOptions.priceLowToHigh"), value: "priceLowToHigh" },
    { label: t("sortOptions.priceHighToLow"), value: "priceHighToLow" },
  ];

  // ── Handlers ──────────────────────────────────────────────────────────────
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

  const handleResetAllFilters = useCallback(() => {
    startTransition(() => {
      router.push(`/${locale}/catalog`);
    });
  }, [locale, router]);

  const hasActiveFilters =
    !!selectedCategory ||
    !!selectedBrand ||
    selectedMinPrice !== undefined ||
    selectedMaxPrice !== undefined ||
    selectedOnSale ||
    selectedInStock ||
    selectedFeatured;

  const activeFilterCount = [
    !!selectedCategory,
    !!selectedBrand,
    selectedMinPrice !== undefined,
    selectedMaxPrice !== undefined,
    selectedOnSale,
    selectedInStock,
    selectedFeatured,
  ].filter(Boolean).length;

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
    onResetAll: handleResetAllFilters,
  };

  const isTablet = width ? width < 1025 : false;
  const showDesktopFilters = !isTablet;
  const isFetchingFirstPage = isFetching && !isFetchingNextPage;
  const currentSortLabel = sortOptions.find((o) => o.value === sortKey)?.label;

  // Lock body scroll when filter modal is open on mobile
  useEffect(() => {
    if (drawerOpen && isTablet) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen, isTablet]);

  const drawerBg = theme.colors.body.paper;
  const drawerBorder = theme.isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";

  return (
    <Fragment>
      {/* ── Toolbar ── */}
      <FlexBox
        as={Card}
        mb="1.25rem"
        p="1rem 1.25rem"
        elevation={5}
        flexWrap="wrap"
        borderRadius={12}
        flexDirection="column"
        style={{ gap: "0.75rem" }}
      >
        <FlexBox
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
          style={{ gap: "0.5rem" }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <FlexBox alignItems="center" style={{ gap: 6 }}>
              <IconSearch
                size={15}
                style={{ flexShrink: 0, opacity: 0.45 }}
              />
              <H1
                fontSize="15px"
                fontWeight="600"
                mb="0"
                mt="0"
                color="text.primary"
                style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
              >
                {query}
              </H1>
            </FlexBox>
            <Paragraph color="text.muted" fontSize="13px">
              {isFetchingFirstPage
                ? "…"
                : total !== undefined
                  ? t("resultsFound", { count: total })
                  : t("resultsFound", { count: liveProducts.length })}
            </Paragraph>
          </div>

          {/* Mobile: filter button on the right */}
          <MobileFilterBtn
            $active={hasActiveFilters}
            onClick={() => setDrawerOpen(true)}
          >
            <IconFilter size={14} />
            {filtersT("title")}
            {activeFilterCount > 0 && (
              <FilterCountBadge>{activeFilterCount}</FilterCountBadge>
            )}
          </MobileFilterBtn>

          {/* Desktop-only sort + view controls */}
          <DesktopSortRow>
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
            <IconButton
              onClick={toggleView("grid", updateUrl)}
              aria-label="Grid view"
              title="Grid view"
            >
              <IconLayoutGrid
                size={22}
                color={view === "grid" ? theme.colors.primary.main : "currentColor"}
              />
            </IconButton>
            <IconButton
              onClick={toggleView("list", updateUrl)}
              aria-label="List view"
              title="List view"
            >
              <IconList
                size={22}
                color={view === "list" ? theme.colors.primary.main : "currentColor"}
              />
            </IconButton>
          </DesktopSortRow>
        </FlexBox>

        {/* Active filter chips — horizontal scroll on mobile */}
        {hasActiveFilters && (
          <ChipsScrollRow>
            {selectedCategory && (
              <ActiveChip onClick={() => handleCategoryChange(undefined)}>
                {selectedCategory}
                <IconX size={12} strokeWidth={2.5} />
              </ActiveChip>
            )}
            {selectedBrand && (
              <ActiveChip onClick={() => handleBrandChange(undefined)}>
                {selectedBrand}
                <IconX size={12} strokeWidth={2.5} />
              </ActiveChip>
            )}
            {(selectedMinPrice !== undefined || selectedMaxPrice !== undefined) && (
              <ActiveChip onClick={() => handlePriceChange({})}>
                {selectedMinPrice !== undefined && selectedMaxPrice !== undefined
                  ? `${selectedMinPrice} — ${selectedMaxPrice}`
                  : selectedMinPrice !== undefined
                    ? `${filtersT("priceFrom")} ${selectedMinPrice}`
                    : `${filtersT("priceTo")} ${selectedMaxPrice}`}
                <IconX size={12} strokeWidth={2.5} />
              </ActiveChip>
            )}
            {selectedOnSale && (
              <ActiveChip onClick={() => handleOnSaleChange(false)}>
                {filtersT("otherOptions.onSale")}
                <IconX size={12} strokeWidth={2.5} />
              </ActiveChip>
            )}
            {selectedInStock && (
              <ActiveChip onClick={() => handleInStockChange(false)}>
                {filtersT("otherOptions.inStock")}
                <IconX size={12} strokeWidth={2.5} />
              </ActiveChip>
            )}
            {selectedFeatured && (
              <ActiveChip onClick={() => handleFeaturedChange(false)}>
                {filtersT("otherOptions.featured")}
                <IconX size={12} strokeWidth={2.5} />
              </ActiveChip>
            )}
            <ResetAllBtn onClick={handleResetAllFilters}>
              {filtersT("resetAll")}
            </ResetAllBtn>
          </ChipsScrollRow>
        )}
      </FlexBox>

      {/* ── Content ── */}
      <Grid container spacing={6}>
        {showDesktopFilters && (
          <Grid item lg={3} xs={12}>
            <ProductFilterCard {...filterCardProps} />
          </Grid>
        )}

        <Grid item lg={showDesktopFilters ? 9 : 12} xs={12}>
          {/* Sort + view toggle — mobile only, above product list */}
          <MobileSortViewBar>
            <MobileSortBtn onClick={() => setSortDrawerOpen(true)}>
              <IconArrowsSort size={14} />
              <MobileSortLabel>{currentSortLabel ?? t("sortBy")}</MobileSortLabel>
            </MobileSortBtn>
            <MobileViewToggleInline>
              <MobileViewBtnInline $active={view === "grid"} onClick={toggleView("grid", updateUrl)}>
                <IconLayoutGrid size={16} />
              </MobileViewBtnInline>
              <MobileViewBtnInline $active={view === "list"} onClick={toggleView("list", updateUrl)}>
                <IconList size={16} />
              </MobileViewBtnInline>
            </MobileViewToggleInline>
          </MobileSortViewBar>

          <div
            style={{
              opacity: isFetchingFirstPage ? 0.55 : 1,
              transition: "opacity 0.25s ease",
            }}
          >
            {view === "grid" ? (
              <ProductGridView products={liveProducts} />
            ) : (
              <ProductListView products={liveProducts} />
            )}
          </div>

          <div ref={sentinelRef} style={{ height: 1 }} />

          {isFetchingNextPage && (
            <FlexBox justifyContent="center" py="2rem">
              <Paragraph color="text.muted">
                {liveProducts.length} / {total ?? "…"}
              </Paragraph>
            </FlexBox>
          )}

          {!hasNextPage && liveProducts.length > 0 && !isFetchingFirstPage && (
            <FlexBox justifyContent="center" py="2rem">
              <Paragraph color="text.muted" fontSize="13px">
                {liveProducts.length} / {total ?? liveProducts.length}
              </Paragraph>
            </FlexBox>
          )}
        </Grid>
      </Grid>


      {/* ── Full-screen filter modal (mobile) ── */}
      {isTablet && drawerOpen && (
        <FilterModal>
          <FilterModalHead>
            <FilterModalTitle>
              {filtersT("title")}
              {activeFilterCount > 0 && (
                <FilterCountBadge style={{ marginLeft: 8 }}>
                  {activeFilterCount}
                </FilterCountBadge>
              )}
            </FilterModalTitle>
            <FilterModalClose onClick={() => setDrawerOpen(false)}>
              <IconX size={18} strokeWidth={2.5} />
            </FilterModalClose>
          </FilterModalHead>
          <FilterModalBody>
            <MobileFilterSheet
              {...filterCardProps}
              total={total}
              onClose={() => setDrawerOpen(false)}
            />
          </FilterModalBody>
        </FilterModal>
      )}

      {/* ── Sort bottom sheet ── */}
      <Drawer
        placement="bottom"
        size={320}
        open={sortDrawerOpen}
        title={t("sortBy")}
        onClose={() => setSortDrawerOpen(false)}
        destroyOnHidden
        styles={{
          wrapper: {
            borderRadius: "20px 20px 0 0",
            overflow: "hidden",
          },
          body: {
            padding: "4px 16px 16px",
            background: drawerBg,
          },
          header: {
            background: drawerBg,
            borderBottom: `1px solid ${drawerBorder}`,
          },
        }}
      >
        {sortOptions.map((option) => (
          <SortOptionItem
            key={option.value}
            $active={sortKey === option.value}
            onClick={() => {
              handleSortChange(option);
              setSortDrawerOpen(false);
            }}
          >
            {option.label}
            {sortKey === option.value && <IconCheck size={18} strokeWidth={2.5} />}
          </SortOptionItem>
        ))}
      </Drawer>
    </Fragment>
  );
}

function toggleView(
  v: "grid" | "list",
  updateUrl: (u: Record<string, string | undefined>) => void,
) {
  return () => updateUrl({ view: v });
}
