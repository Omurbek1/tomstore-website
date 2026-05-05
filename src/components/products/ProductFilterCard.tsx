"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Card from "@component/Card";
import Avatar from "@component/avatar";
import Rating from "@component/rating";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import CheckBox from "@component/CheckBox";
import TextField from "@component/text-field";
import { H5, H6, Paragraph, SemiSpan } from "@component/Typography";
import { useStorefrontCatalog } from "@hook/useStorefrontCatalog";
import type { StorefrontCatalogParams } from "@utils/__api__/storefront";

const OTHER_OPTIONS = ["onSale", "inStock", "featured"] as const;
const COLORS = ["#1C1C1C", "#FF7A7A", "#FFC672", "#84FFB5", "#70F6FF", "#6B7AFF"];

type ProductFilterCardProps = {
  catalogParams?: StorefrontCatalogParams;
  selectedCategory?: string;
  selectedBrand?: string;
  selectedMinPrice?: number;
  selectedMaxPrice?: number;
  onCategoryChange?: (category?: string) => void;
  onBrandChange?: (brand?: string) => void;
  onPriceChange?: (range: { minPrice?: number; maxPrice?: number }) => void;
};

export default function ProductFilterCard({
  catalogParams,
  selectedCategory,
  selectedBrand,
  selectedMinPrice,
  selectedMaxPrice,
  onCategoryChange,
  onBrandChange,
  onPriceChange,
}: ProductFilterCardProps) {
  const t = useTranslations("product.filters");
  const { data: catalog } = useStorefrontCatalog({
    ...catalogParams,
    pageSize: 1,
  });
  const categories = catalog?.filters.categories || [];
  const brands = catalog?.filters.brands || [];
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
          placeholder={catalog?.filters.minPrice ? String(catalog.filters.minPrice) : "0"}
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
          placeholder={catalog?.filters.maxPrice ? String(catalog.filters.maxPrice) : "250"}
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
          color="secondary"
          label={<SemiSpan color="inherit">{t(`otherOptions.${item}`)}</SemiSpan>}
          onChange={(e) => console.log(e.target.value, e.target.checked)}
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

      <Divider my="24px" />

      {/* COLORS FILTER */}
      <H6 mb="16px">{t("colors")}</H6>
      <FlexBox mb="1rem">
        {COLORS.map((item, ind) => (
          <Avatar key={ind} bg={item} size={25} mr="10px" style={{ cursor: "pointer" }} />
        ))}
      </FlexBox>
    </Card>
  );
}

function toPriceFilter(value: string) {
  const price = Number(value);
  if (!value.trim() || !Number.isFinite(price) || price < 0) return undefined;
  return price;
}
