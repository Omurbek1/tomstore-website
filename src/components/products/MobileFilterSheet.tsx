"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import styled from "styled-components";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";
import { useStorefrontCatalog } from "@hook/useStorefrontCatalog";
import type {
  StorefrontCatalogFilters,
  StorefrontCatalogParams,
} from "@utils/__api__/storefront";

// ── Types ────────────────────────────────────────────────────────────────────

type Props = {
  catalogParams?: StorefrontCatalogParams;
  selectedCategory?: string;
  selectedBrand?: string;
  selectedMinPrice?: number;
  selectedMaxPrice?: number;
  selectedOnSale?: boolean;
  selectedInStock?: boolean;
  selectedFeatured?: boolean;
  initialFilters?: StorefrontCatalogFilters;
  total?: number;
  onCategoryChange?: (category?: string) => void;
  onBrandChange?: (brand?: string) => void;
  onPriceChange?: (range: { minPrice?: number; maxPrice?: number }) => void;
  onOnSaleChange?: (checked: boolean) => void;
  onInStockChange?: (checked: boolean) => void;
  onFeaturedChange?: (checked: boolean) => void;
  onResetAll?: () => void;
  onClose?: () => void;
};

// ── Styled ───────────────────────────────────────────────────────────────────

const Sheet = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 0 8px;
`;

const Section = styled.div`
  padding: 20px 16px 4px;
`;

const SectionLabel = styled.div`
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text.hint};
  margin-bottom: 12px;
`;

const Sep = styled.div`
  height: 1px;
  background: ${({ theme }) =>
    theme.isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)"};
  margin: 12px 16px 0;
`;

const ChipsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Chip = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 8px 14px;
  border-radius: 24px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
  border: 1.5px solid
    ${({ theme, $active }) =>
      $active
        ? theme.colors.primary.main
        : theme.isDark
          ? "rgba(255,255,255,0.15)"
          : "rgba(0,0,0,0.12)"};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary.light : "transparent"};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary.main : theme.colors.text.primary};
  &:active {
    transform: scale(0.96);
  }
`;

const ChipCount = styled.span`
  font-size: 11px;
  font-weight: 500;
  opacity: 0.65;
`;

const ShowMoreBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 14px;
  border-radius: 24px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: 1.5px dashed
    ${({ theme }) =>
      theme.isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"};
  background: transparent;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PriceInputWrap = styled.div`
  flex: 1;
  position: relative;
`;

const PriceLabel = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.hint};
  pointer-events: none;
`;

const PriceInput = styled.input`
  width: 100%;
  height: 46px;
  padding: 0 12px 0 36px;
  border-radius: 12px;
  border: 1.5px solid
    ${({ theme }) =>
      theme.isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"};
  background: ${({ theme }) => theme.colors.gray[200]};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 14px;
  font-weight: 500;
  outline: none;
  appearance: textfield;
  -moz-appearance: textfield;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
    background: ${({ theme }) => theme.colors.primary.light};
  }
`;

const PriceSep = styled.div`
  width: 12px;
  height: 1.5px;
  background: ${({ theme }) =>
    theme.isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"};
  flex-shrink: 0;
`;

const ToggleRow = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  cursor: pointer;
  border-bottom: 1px solid
    ${({ theme }) =>
      theme.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"};
  &:last-child {
    border-bottom: none;
  }
`;

const ToggleLabel = styled.span`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ToggleSwitch = styled.div<{ $active?: boolean }>`
  width: 46px;
  height: 26px;
  border-radius: 13px;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary.main : theme.colors.gray[400]};
  position: relative;
  flex-shrink: 0;
  transition: background 0.2s;
  &::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.gray.white};
    top: 3px;
    left: ${({ $active }) => ($active ? "23px" : "3px")};
    transition: left 0.2s;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
`;

const Footer = styled.div`
  padding: 12px 16px 16px;
  border-top: 1px solid
    ${({ theme }) =>
      theme.isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"};
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ApplyBtn = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 14px;
  border: none;
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.primary.text};
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: opacity 0.15s;
  &:active {
    opacity: 0.85;
  }
`;

const ResetBtn = styled.button`
  width: 100%;
  height: 38px;
  border-radius: 12px;
  border: 1.5px solid
    ${({ theme }) =>
      theme.isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"};
  background: transparent;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  &:active {
    border-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

// ── Component ─────────────────────────────────────────────────────────────────

const BRANDS_INITIAL_COUNT = 10;

export default function MobileFilterSheet({
  catalogParams,
  selectedCategory,
  selectedBrand,
  selectedMinPrice,
  selectedMaxPrice,
  selectedOnSale,
  selectedInStock,
  selectedFeatured,
  initialFilters,
  total,
  onCategoryChange,
  onBrandChange,
  onPriceChange,
  onOnSaleChange,
  onInStockChange,
  onFeaturedChange,
  onResetAll,
  onClose,
}: Props) {
  const t = useTranslations("product.filters");

  const { data: catalog } = useStorefrontCatalog({
    ...catalogParams,
    category: undefined,
    pageSize: 1,
  });

  const filters = catalog?.filters ?? initialFilters;
  const categories = filters?.categories ?? [];
  const brands = dedupeBrands(filters?.brands ?? []);

  const [showAllBrands, setShowAllBrands] = useState(false);
  const visibleBrands = showAllBrands ? brands : brands.slice(0, BRANDS_INITIAL_COUNT);

  // ── Price range ─────────────────────────────────────────────────────────────
  const [minPrice, setMinPrice] = useState(selectedMinPrice?.toString() ?? "");
  const [maxPrice, setMaxPrice] = useState(selectedMaxPrice?.toString() ?? "");
  const priceChangeRef = useRef(onPriceChange);
  priceChangeRef.current = onPriceChange;

  useEffect(() => { setMinPrice(selectedMinPrice?.toString() ?? ""); }, [selectedMinPrice]);
  useEffect(() => { setMaxPrice(selectedMaxPrice?.toString() ?? ""); }, [selectedMaxPrice]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      priceChangeRef.current?.({
        minPrice: toPriceFilter(minPrice),
        maxPrice: toPriceFilter(maxPrice),
      });
    }, 500);
    return () => window.clearTimeout(timer);
  }, [minPrice, maxPrice]);

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleCategory = useCallback(
    (slug: string) => {
      onCategoryChange?.(selectedCategory === slug ? undefined : slug);
    },
    [onCategoryChange, selectedCategory],
  );

  const handleBrand = useCallback(
    (slug: string) => {
      onBrandChange?.(selectedBrand === slug ? undefined : slug);
    },
    [onBrandChange, selectedBrand],
  );

  const hasActiveFilters =
    !!selectedCategory ||
    !!selectedBrand ||
    selectedMinPrice !== undefined ||
    selectedMaxPrice !== undefined ||
    !!selectedOnSale ||
    !!selectedInStock ||
    !!selectedFeatured;

  return (
    <Sheet>
      <Body>
        {/* ── Categories ── */}
        {categories.length > 0 && (
          <>
            <Section>
              <SectionLabel>{t("categories")}</SectionLabel>
              <ChipsWrap>
                {categories.map((item) => (
                  <Chip
                    key={item.slug}
                    $active={selectedCategory === item.slug}
                    onClick={() => handleCategory(item.slug)}
                  >
                    {selectedCategory === item.slug && (
                      <IconCheck size={13} strokeWidth={3} />
                    )}
                    {item.name}
                    <ChipCount>{item.totalProducts}</ChipCount>
                  </Chip>
                ))}
              </ChipsWrap>
            </Section>
            <Sep />
          </>
        )}

        {/* ── Price range ── */}
        <Section>
          <SectionLabel>{t("priceRange")}</SectionLabel>
          <PriceRow>
            <PriceInputWrap>
              <PriceLabel>{t("priceFrom")}</PriceLabel>
              <PriceInput
                type="number"
                inputMode="numeric"
                min={0}
                placeholder={filters?.minPrice ? String(filters.minPrice) : "0"}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </PriceInputWrap>
            <PriceSep />
            <PriceInputWrap>
              <PriceLabel>{t("priceTo")}</PriceLabel>
              <PriceInput
                type="number"
                inputMode="numeric"
                min={0}
                placeholder={filters?.maxPrice ? String(filters.maxPrice) : "∞"}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </PriceInputWrap>
          </PriceRow>
        </Section>

        {/* ── Brands ── */}
        {brands.length > 0 && (
          <>
            <Sep />
            <Section>
              <SectionLabel>{t("brands")}</SectionLabel>
              <ChipsWrap>
                {visibleBrands.map((item) => (
                  <Chip
                    key={item.slug}
                    $active={selectedBrand === item.slug}
                    onClick={() => handleBrand(item.slug)}
                  >
                    {selectedBrand === item.slug && (
                      <IconCheck size={13} strokeWidth={3} />
                    )}
                    {item.name}
                    <ChipCount>{item.totalProducts}</ChipCount>
                  </Chip>
                ))}
                {!showAllBrands && brands.length > BRANDS_INITIAL_COUNT && (
                  <ShowMoreBtn onClick={() => setShowAllBrands(true)}>
                    <IconChevronDown size={14} />
                    +{brands.length - BRANDS_INITIAL_COUNT}
                  </ShowMoreBtn>
                )}
              </ChipsWrap>
            </Section>
          </>
        )}

        {/* ── Boolean toggles ── */}
        <Sep />
        <Section style={{ paddingBottom: 16 }}>
          <ToggleRow onClick={() => onOnSaleChange?.(!selectedOnSale)}>
            <ToggleLabel>{t("otherOptions.onSale")}</ToggleLabel>
            <ToggleSwitch $active={!!selectedOnSale} />
          </ToggleRow>
          <ToggleRow onClick={() => onInStockChange?.(!selectedInStock)}>
            <ToggleLabel>{t("otherOptions.inStock")}</ToggleLabel>
            <ToggleSwitch $active={!!selectedInStock} />
          </ToggleRow>
          <ToggleRow onClick={() => onFeaturedChange?.(!selectedFeatured)}>
            <ToggleLabel>{t("otherOptions.featured")}</ToggleLabel>
            <ToggleSwitch $active={!!selectedFeatured} />
          </ToggleRow>
        </Section>
      </Body>

      {/* ── Footer ── */}
      <Footer>
        <ApplyBtn onClick={onClose}>
          {total !== undefined
            ? `Показать ${total} товаров`
            : "Применить фильтры"}
        </ApplyBtn>
        {hasActiveFilters && (
          <ResetBtn onClick={() => { onResetAll?.(); }}>
            {t("resetAll")}
          </ResetBtn>
        )}
      </Footer>
    </Sheet>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

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
    (a, b) => b.totalProducts - a.totalProducts || a.name.localeCompare(b.name, "ru"),
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
