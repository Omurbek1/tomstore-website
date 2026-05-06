"use client";

import { useMemo } from "react";
import styled from "styled-components";

import Box from "@component/Box";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import { H5, H6, SemiSpan, Small } from "@component/Typography";
import useCurrency from "@hook/useCurrency";
import Product, { ProductVariant } from "@models/product.model";

type VariantKey = "cpu" | "ram" | "storage" | "color";

type Props = {
  product: Product;
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
};

const FILTERS: Array<{ key: VariantKey; title: string; format: (value: string | number) => string }> = [
  { key: "cpu", title: "Процессор", format: String },
  { key: "ram", title: "Оперативная память", format: (value) => `${value}GB` },
  { key: "storage", title: "Объём накопителя", format: String },
  { key: "color", title: "Цвет", format: String },
];

export default function ProductVariantSelector({
  product,
  selectedVariant,
  onSelectVariant,
}: Props) {
  const formatCurrency = useCurrency();
  const variants = product.variants?.filter(Boolean) ?? [];

  const options = useMemo(
    () =>
      FILTERS.reduce(
        (acc, filter) => {
          acc[filter.key] = uniqueValues(variants.map((variant) => variant[filter.key]));
          return acc;
        },
        {} as Record<VariantKey, Array<string | number>>,
      ),
    [variants],
  );

  if (variants.length === 0) return null;

  const selectByOption = (key: VariantKey, value: string | number) => {
    const nextVariant = findVariantForOption(variants, selectedVariant, key, value);
    if (nextVariant) onSelectVariant(nextVariant);
  };

  return (
    <VariantGrid>
      <Card p="20px" borderRadius="16px" boxShadow="small">
        <H5 mb="16px">Варианты покупки</H5>

        <VariantList>
          {variants.map((variant) => {
            const isSelected = variant.id === selectedVariant.id;

            return (
              <VariantCard
                key={variant.id}
                type="button"
                $selected={isSelected}
                disabled={!variant.inStock}
                onClick={() => variant.inStock && onSelectVariant(variant)}
              >
                <FlexBox justifyContent="space-between" alignItems="flex-start" style={{ gap: 12 }}>
                  <Box minWidth={0}>
                    <H6 mb="8px">{variant.title}</H6>
                    <SemiSpan display="block" color="text.muted">
                      {getVariantSpecs(variant)}
                    </SemiSpan>
                    <Small display="block" color="text.muted" mt="10px">
                      {variant.warehouse || "Склад TOMSTORE"}
                    </Small>
                  </Box>

                  <Box textAlign="right" flexShrink={0}>
                    <H6 color={PURPLE}>{formatCurrency(variant.price)}</H6>
                    <ChooseBadge $selected={isSelected}>
                      {isSelected ? "Выбрано" : "Выбрать"}
                    </ChooseBadge>
                  </Box>
                </FlexBox>
              </VariantCard>
            );
          })}
        </VariantList>
      </Card>

      <Card p="20px" borderRadius="16px" boxShadow="small">
        <H5 mb="16px">Конфигурация</H5>

        <FilterList>
          {FILTERS.map((filter) => (
            <Box key={filter.key}>
              <H6 mb="10px">{filter.title}</H6>
              <ChipRow>
                {options[filter.key].map((value) => {
                  const disabled = !hasAvailableVariant(
                    variants,
                    selectedVariant,
                    filter.key,
                    value,
                  );
                  const selected = selectedVariant[filter.key] === value;

                  return (
                    <Chip
                      key={`${filter.key}-${value}`}
                      type="button"
                      $selected={selected}
                      disabled={disabled}
                      onClick={() => selectByOption(filter.key, value)}
                    >
                      {filter.format(value)}
                    </Chip>
                  );
                })}
              </ChipRow>
            </Box>
          ))}
        </FilterList>
      </Card>
    </VariantGrid>
  );
}

function uniqueValues(values: Array<string | number>) {
  const seen = new Set<string>();

  return values.filter((value) => {
    const normalized = String(value).trim();
    if (!normalized || seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
}

function hasAvailableVariant(
  variants: ProductVariant[],
  selectedVariant: ProductVariant,
  key: VariantKey,
  value: string | number,
) {
  return variants.some(
    (variant) =>
      variant.inStock &&
      FILTERS.every((filter) =>
        filter.key === key
          ? variant[filter.key] === value
          : variant[filter.key] === selectedVariant[filter.key],
      ),
  );
}

function findVariantForOption(
  variants: ProductVariant[],
  selectedVariant: ProductVariant,
  key: VariantKey,
  value: string | number,
) {
  return variants.find(
    (variant) =>
      variant.inStock &&
      FILTERS.every((filter) =>
        filter.key === key
          ? variant[filter.key] === value
          : variant[filter.key] === selectedVariant[filter.key],
      ),
  );
}

function getVariantSpecs(variant: ProductVariant) {
  return [
    variant.cpu,
    variant.ram ? `${variant.ram}GB` : "",
    variant.storage,
    variant.color,
  ]
    .filter(Boolean)
    .join(" / ");
}

const PURPLE = "#7C3AED";
const PURPLE_LIGHT = "#F3E8FF";

const VariantGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 18px;
  margin-bottom: 28px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const VariantList = styled.div`
  display: grid;
  gap: 12px;
`;

const VariantCard = styled.button<{ $selected: boolean }>`
  width: 100%;
  padding: 14px;
  border: 2px solid ${({ $selected, theme }) => ($selected ? PURPLE : theme.colors.gray[300])};
  border-radius: 16px;
  background: ${({ $selected }) => ($selected ? PURPLE_LIGHT : "#fff")};
  box-shadow: ${({ theme }) => theme.shadows.small};
  color: inherit;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  transition: border-color 150ms ease, background-color 150ms ease, opacity 150ms ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
    background: ${({ theme }) => theme.colors.gray[100]};
  }
`;

const ChooseBadge = styled.span<{ $selected: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 30px;
  margin-top: 10px;
  padding: 0 12px;
  border-radius: 999px;
  background: ${({ $selected }) => ($selected ? PURPLE : PURPLE_LIGHT)};
  color: ${({ $selected }) => ($selected ? "#fff" : PURPLE)};
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
`;

const FilterList = styled.div`
  display: grid;
  gap: 18px;
`;

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Chip = styled.button<{ $selected: boolean }>`
  min-height: 42px;
  padding: 0 16px;
  border: 1px solid ${({ $selected, theme }) => ($selected ? PURPLE : theme.colors.gray[300])};
  border-radius: 16px;
  background: ${({ $selected }) => ($selected ? PURPLE : "#fff")};
  color: ${({ $selected, theme }) => ($selected ? "#fff" : theme.colors.text.primary)};
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  transition: border-color 150ms ease, background-color 150ms ease, color 150ms ease;

  &:disabled {
    border-color: ${({ theme }) => theme.colors.gray[300]};
    background: ${({ theme }) => theme.colors.gray[100]};
    color: ${({ theme }) => theme.colors.text.disabled};
    cursor: not-allowed;
  }
`;
