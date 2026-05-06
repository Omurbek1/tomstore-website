"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Card from "@component/Card";
import Rating from "@component/rating";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import CheckBox from "@component/CheckBox";
import TextField from "@component/text-field";
import { H5, H6, Paragraph, SemiSpan } from "@component/Typography";
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
}: ProductFilterCardProps) {
  const t = useTranslations("product.filters");
  const { data: catalog } = useStorefrontCatalog({
    ...catalogParams,
    pageSize: 1,
  });
  const filters = catalog?.filters || initialFilters;
  const categories = filters?.categories || [];
  const brands = dedupeBrands(filters?.brands || []);
  const [minPrice, setMinPrice] = useState(selectedMinPrice?.toString() || "");
  const [maxPrice, setMaxPrice] = useState(selectedMaxPrice?.toString() || "");

  useEffect(() => {
    setMinPrice(selectedMinPrice?.toString() || "");
  }, [selectedMinPrice]);

  useEffect(() => {
    setMaxPrice(selectedMaxPrice?.toString() || "");
  }, [selectedMaxPrice]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const nextMinPrice = toPriceFilter(minPrice);
      const nextMaxPrice = toPriceFilter(maxPrice);

      onPriceChange?.({
        minPrice: nextMinPrice,
        maxPrice: nextMaxPrice,
      });
    }, 400);

    return () => window.clearTimeout(timer);
  }, [maxPrice, minPrice, onPriceChange]);

  const handleBrandChange = useCallback(
    (brand: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      onBrandChange?.(event.target.checked ? brand : undefined);
    },
    [onBrandChange],
  );

  const handleCategoryChange = useCallback(
    (category: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      onCategoryChange?.(event.target.checked ? category : undefined);
    },
    [onCategoryChange],
  );

  return (
    <Card p="18px 27px" elevation={5} borderRadius={12}>
      <H6 mb="10px">{t("categories")}</H6>

      {categories.map((item) => (
        <CheckBox
          my="10px"
          key={item.slug}
          name="category"
          value={item.slug}
          checked={selectedCategory === item.slug}
          color="secondary"
          label={
            <SemiSpan color="inherit">
              {item.name} ({item.totalProducts})
            </SemiSpan>
          }
          onChange={handleCategoryChange(item.slug)}
        />
      ))}

      <Divider mt="18px" mb="24px" />

      {/* PRICE RANGE FILTER */}
      <H6 mb="16px">{t("priceRange")}</H6>
      <FlexBox justifyContent="space-between" alignItems="center">
        <TextField
          placeholder={filters?.minPrice ? String(filters.minPrice) : "0"}
          type="number"
          min={0}
          value={minPrice}
          fullWidth
          onChange={(event) => setMinPrice(event.target.value)}
        />

        <H5 color="text.muted" px="0.5rem">
          -
        </H5>

        <TextField
          placeholder={filters?.maxPrice ? String(filters.maxPrice) : "250"}
          type="number"
          min={0}
          value={maxPrice}
          fullWidth
          onChange={(event) => setMaxPrice(event.target.value)}
        />
      </FlexBox>

      <Divider my="24px" />

      {/* BRANDS FILTER */}
      <H6 mb="16px">{t("brands")}</H6>
      {brands.map((item) => (
        <CheckBox
          my="10px"
          key={item.slug}
          name="brand"
          value={item.slug}
          checked={selectedBrand === item.slug}
          color="secondary"
          label={
            <SemiSpan color="inherit">
              {item.name} ({item.totalProducts})
            </SemiSpan>
          }
          onChange={handleBrandChange(item.slug)}
        />
      ))}

      <Divider my="24px" />

      {/* STOCK AND SALES FILTERS */}
      {OTHER_OPTIONS.map((item) => (
        <CheckBox
          my="10px"
          key={item}
          name={item}
          value={item}
          checked={getOtherOptionChecked(item, { selectedOnSale, selectedInStock, selectedFeatured })}
          color="secondary"
          label={<SemiSpan color="inherit">{t(`otherOptions.${item}`)}</SemiSpan>}
          onChange={(e) =>
            handleOtherOptionChange(item, e.target.checked, {
              onOnSaleChange,
              onInStockChange,
              onFeaturedChange,
            })
          }
        />
      ))}

      <Divider my="24px" />

      {/* RATING FILTER */}
      <H6 mb="16px">{t("ratings")}</H6>
      {[5, 4, 3, 2, 1].map((item) => (
        <CheckBox
          my="10px"
          key={item}
          value={item}
          color="secondary"
          label={<Rating value={item} outof={5} color="warn" />}
          onChange={(e) => console.log(e.target.value, e.target.checked)}
        />
      ))}

    </Card>
  );
}

function getOtherOptionChecked(
  item: OtherOption,
  state: { selectedOnSale?: boolean; selectedInStock?: boolean; selectedFeatured?: boolean },
) {
  if (item === "onSale") return !!state.selectedOnSale;
  if (item === "inStock") return !!state.selectedInStock;
  if (item === "featured") return !!state.selectedFeatured;
  return false;
}

function handleOtherOptionChange(
  item: OtherOption,
  checked: boolean,
  handlers: {
    onOnSaleChange?: (checked: boolean) => void;
    onInStockChange?: (checked: boolean) => void;
    onFeaturedChange?: (checked: boolean) => void;
  },
) {
  if (item === "onSale") handlers.onOnSaleChange?.(checked);
  else if (item === "inStock") handlers.onInStockChange?.(checked);
  else if (item === "featured") handlers.onFeaturedChange?.(checked);
}

function toPriceFilter(value: string) {
  const price = Number(value);
  if (!value.trim() || !Number.isFinite(price) || price < 0) return undefined;
  return price;
}

function dedupeBrands<T extends { name: string; slug: string; totalProducts: number }>(
  brands: T[],
) {
  const grouped = new Map<string, T>();

  for (const brand of brands) {
    const key = normalizeBrandKey(brand.slug || brand.name);
    const current = grouped.get(key);

    if (!current) {
      grouped.set(key, brand);
      continue;
    }

    grouped.set(key, {
      ...current,
      name: pickBrandDisplayName(current.name, brand.name),
      totalProducts: current.totalProducts + brand.totalProducts,
    });
  }

  return Array.from(grouped.values()).sort(
    (left, right) =>
      right.totalProducts - left.totalProducts ||
      left.name.localeCompare(right.name, "ru"),
  );
}

function normalizeBrandKey(value: string) {
  return value.trim().toLowerCase();
}

function pickBrandDisplayName(current: string, candidate: string) {
  const currentScore = getBrandDisplayScore(current);
  const candidateScore = getBrandDisplayScore(candidate);
  if (candidateScore !== currentScore) {
    return candidateScore > currentScore ? candidate : current;
  }
  return candidate.length < current.length ? candidate : current;
}

function getBrandDisplayScore(value: string) {
  const letters = value.replace(/[^A-Za-zА-Яа-яЁё]/g, "");
  if (!letters) return 0;
  const upper = letters.replace(/[^A-ZА-ЯЁ]/g, "").length;
  const lower = letters.replace(/[^a-zа-яё]/g, "").length;
  if (upper > 1 && lower === 0) return 3;
  if (upper === 1 && lower > 0) return 2;
  return 1;
}
