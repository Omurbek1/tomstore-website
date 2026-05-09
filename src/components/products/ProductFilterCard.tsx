"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Card from "@component/Card";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import CheckBox from "@component/CheckBox";
import TextField from "@component/text-field";
import { H5, H6, SemiSpan } from "@component/Typography";
import { useStorefrontCatalog } from "@hook/useStorefrontCatalog";
import type {
  StorefrontCatalogFilters,
  StorefrontCatalogParams,
} from "@utils/__api__/storefront";

const OTHER_OPTIONS = ["onSale", "inStock", "featured"] as const;
type OtherOption = (typeof OTHER_OPTIONS)[number];

type ProductFilterCardProps = {
  catalogParams?: StorefrontCatalogParams;
  selectedCategory?: string;
  selectedBrand?: string;
  selectedMinPrice?: number;
  selectedMaxPrice?: number;
  selectedOnSale?: boolean;
  selectedInStock?: boolean;
  selectedFeatured?: boolean;
  initialFilters?: StorefrontCatalogFilters;
  onCategoryChange?: (category?: string) => void;
  onBrandChange?: (brand?: string) => void;
  onPriceChange?: (range: { minPrice?: number; maxPrice?: number }) => void;
  onOnSaleChange?: (checked: boolean) => void;
  onInStockChange?: (checked: boolean) => void;
  onFeaturedChange?: (checked: boolean) => void;
  onResetAll?: () => void;
};

export default function ProductFilterCard({
  catalogParams,
  selectedCategory,
  selectedBrand,
  selectedMinPrice,
  selectedMaxPrice,
  selectedOnSale,
  selectedInStock,
  selectedFeatured,
  initialFilters,
  onCategoryChange,
  onBrandChange,
  onPriceChange,
  onOnSaleChange,
  onInStockChange,
  onFeaturedChange,
  onResetAll,
}: ProductFilterCardProps) {
  const t = useTranslations("product.filters");

  const hasActiveFilters =
    !!selectedCategory ||
    !!selectedBrand ||
    selectedMinPrice !== undefined ||
    selectedMaxPrice !== undefined ||
    !!selectedOnSale ||
    !!selectedInStock ||
    !!selectedFeatured;

  // Fetch filter options WITHOUT the selected category so the full categories list
  // is always visible regardless of what's currently selected. Brands ARE filtered
  // by brand selection so users see counts specific to the active brand.
  const { data: catalog } = useStorefrontCatalog({
    ...catalogParams,
    category: undefined,
    pageSize: 1,
  });

  const filters = catalog?.filters ?? initialFilters;
  const categories = filters?.categories ?? [];
  const brands = dedupeBrands(filters?.brands ?? []);

  // ── Price range local state (debounced) ─────────────────────────────────
  const [minPrice, setMinPrice] = useState(selectedMinPrice?.toString() ?? "");
  const [maxPrice, setMaxPrice] = useState(selectedMaxPrice?.toString() ?? "");
  const priceChangeRef = useRef(onPriceChange);
  priceChangeRef.current = onPriceChange;

  // Sync controlled value when parent resets it
  useEffect(() => {
    setMinPrice(selectedMinPrice?.toString() ?? "");
  }, [selectedMinPrice]);

  useEffect(() => {
    setMaxPrice(selectedMaxPrice?.toString() ?? "");
  }, [selectedMaxPrice]);

  // Debounce price updates (400ms)
  useEffect(() => {
    const timer = window.setTimeout(() => {
      priceChangeRef.current?.({
        minPrice: toPriceFilter(minPrice),
        maxPrice: toPriceFilter(maxPrice),
      });
    }, 400);
    return () => window.clearTimeout(timer);
  }, [minPrice, maxPrice]);

  // ── Handlers ────────────────────────────────────────────────────────────
  const handleCategoryChange = useCallback(
    (slug: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onCategoryChange?.(e.target.checked ? slug : undefined);
    },
    [onCategoryChange],
  );

  const handleBrandChange = useCallback(
    (slug: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onBrandChange?.(e.target.checked ? slug : undefined);
    },
    [onBrandChange],
  );

  const handleOtherChange = useCallback(
    (item: OtherOption) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      if (item === "onSale") onOnSaleChange?.(checked);
      else if (item === "inStock") onInStockChange?.(checked);
      else if (item === "featured") onFeaturedChange?.(checked);
    },
    [onOnSaleChange, onInStockChange, onFeaturedChange],
  );

  const getOtherChecked = (item: OtherOption) => {
    if (item === "onSale") return !!selectedOnSale;
    if (item === "inStock") return !!selectedInStock;
    if (item === "featured") return !!selectedFeatured;
    return false;
  };

  return (
    <Card p="18px 27px" elevation={5} borderRadius={12}>
      {/* ── Header: title + reset button ── */}
      <FlexBox alignItems="center" justifyContent="space-between" mb="16px">
        <H5 color="text.primary" fontWeight="700">{t("title")}</H5>
        {hasActiveFilters && onResetAll && (
          <button
            onClick={onResetAll}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--reset-btn-color, #CE162E)",
              padding: "2px 0",
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
          >
            {t("resetAll")}
          </button>
        )}
      </FlexBox>

      {/* ── Categories ── */}
      <H6 mb="10px" color="text.primary">{t("categories")}</H6>

      {categories.length === 0 ? (
        <SemiSpan color="text.muted" fontSize="0.8rem">—</SemiSpan>
      ) : (
        categories.map((item) => (
          <CheckBox
            my="10px"
            key={item.slug}
            name="category"
            value={item.slug}
            checked={selectedCategory === item.slug}
            color="primary"
            label={
              <SemiSpan color="text.primary">
                {item.name} ({item.totalProducts})
              </SemiSpan>
            }
            onChange={handleCategoryChange(item.slug)}
          />
        ))
      )}

      <Divider mt="18px" mb="24px" />

      {/* ── Price range ── */}
      <H6 mb="16px" color="text.primary">{t("priceRange")}</H6>
      <FlexBox justifyContent="space-between" alignItems="center" style={{ gap: "0.5rem" }}>
        <TextField
          placeholder={filters?.minPrice ? String(filters.minPrice) : "0"}
          type="number"
          min={0}
          value={minPrice}
          fullWidth
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <H5 color="text.muted" style={{ flexShrink: 0 }}>—</H5>
        <TextField
          placeholder={filters?.maxPrice ? String(filters.maxPrice) : "∞"}
          type="number"
          min={0}
          value={maxPrice}
          fullWidth
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </FlexBox>

      <Divider my="24px" />

      {/* ── Brands ── */}
      <H6 mb="16px" color="text.primary">{t("brands")}</H6>

      {brands.length === 0 ? (
        <SemiSpan color="text.muted" fontSize="0.8rem">—</SemiSpan>
      ) : (
        brands.map((item) => (
          <CheckBox
            my="10px"
            key={item.slug}
            name="brand"
            value={item.slug}
            checked={selectedBrand === item.slug}
            color="primary"
            label={
              <SemiSpan color="text.primary">
                {item.name} ({item.totalProducts})
              </SemiSpan>
            }
            onChange={handleBrandChange(item.slug)}
          />
        ))
      )}

      <Divider my="24px" />

      {/* ── Quick filters: onSale / inStock / featured ── */}
      {OTHER_OPTIONS.map((item) => (
        <CheckBox
          my="10px"
          key={item}
          name={item}
          value={item}
          checked={getOtherChecked(item)}
          color="primary"
          label={<SemiSpan color="text.primary">{t(`otherOptions.${item}`)}</SemiSpan>}
          onChange={handleOtherChange(item)}
        />
      ))}
    </Card>
  );
}

// ── Pure helpers ────────────────────────────────────────────────────────────

function toPriceFilter(value: string): number | undefined {
  const price = Number(value);
  if (!value.trim() || !Number.isFinite(price) || price < 0) return undefined;
  return price;
}

function dedupeBrands<T extends { name: string; slug: string; totalProducts: number }>(
  brands: T[],
): T[] {
  const grouped = new Map<string, T>();

  for (const brand of brands) {
    const key = (brand.slug || brand.name).trim().toLowerCase();
    const current = grouped.get(key);

    if (!current) {
      grouped.set(key, brand);
    } else {
      grouped.set(key, {
        ...current,
        name: pickBrandDisplayName(current.name, brand.name),
        totalProducts: current.totalProducts + brand.totalProducts,
      });
    }
  }

  return Array.from(grouped.values()).sort(
    (a, b) =>
      b.totalProducts - a.totalProducts || a.name.localeCompare(b.name, "ru"),
  );
}

function pickBrandDisplayName(current: string, candidate: string): string {
  const score = (v: string) => {
    const letters = v.replace(/[^A-Za-zА-Яа-яЁё]/g, "");
    if (!letters) return 0;
    const upper = letters.replace(/[^A-ZА-ЯЁ]/g, "").length;
    const lower = letters.replace(/[^a-zа-яё]/g, "").length;
    if (upper > 1 && lower === 0) return 3;
    if (upper === 1 && lower > 0) return 2;
    return 1;
  };
  const cs = score(current);
  const cands = score(candidate);
  if (cands !== cs) return cands > cs ? candidate : current;
  return candidate.length < current.length ? candidate : current;
}
