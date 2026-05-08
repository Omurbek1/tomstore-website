"use client";

import { useMemo, Fragment } from "react";
import styled from "styled-components";

import Box from "@component/Box";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import { H5, H6, Small } from "@component/Typography";
import useCurrency from "@hook/useCurrency";
import Product, { ProductVariant } from "@models/product.model";

type VariantKey = "cpu" | "ram" | "storage" | "color";

type FilterDef = {
  key: VariantKey;
  title: string;
  format: (v: string | number) => string;
  isEmpty: (v: string | number) => boolean;
};

type Props = {
  product: Product;
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
};

const FILTERS: FilterDef[] = [
  {
    key: "cpu",
    title: "Процессор",
    format: String,
    isEmpty: (v) => !String(v).trim(),
  },
  {
    key: "ram",
    title: "Оперативная память",
    format: (v) => `${v} GB`,
    isEmpty: (v) => Number(v) <= 0,
  },
  {
    key: "storage",
    title: "Объём накопителя",
    format: String,
    isEmpty: (v) => !String(v).trim(),
  },
  {
    key: "color",
    title: "Цвет",
    format: String,
    isEmpty: (v) => !String(v).trim(),
  },
];

export default function ProductVariantSelector({ product, selectedVariant, onSelectVariant }: Props) {
  const formatCurrency = useCurrency();
  const variants = product.variants?.filter(Boolean) ?? [];

  // Unique non-empty values per key
  const options = useMemo(
    () =>
      FILTERS.reduce(
        (acc, f) => {
          const seen = new Set<string>();
          acc[f.key] = variants
            .map((v) => v[f.key])
            .filter((val) => {
              if (f.isEmpty(val)) return false;
              const key = String(val);
              if (seen.has(key)) return false;
              seen.add(key);
              return true;
            });
          return acc;
        },
        {} as Record<VariantKey, Array<string | number>>,
      ),
    [variants],
  );

  // Dynamic attributes from variant.attributes[] (e.g. "Диагональ экрана", "Связь", ...)
  const dynamicAttrs = useMemo(() => {
    const map = new Map<string, Set<string>>();
    variants.forEach((v) => {
      v.attributes?.forEach(({ name, value }) => {
        if (!name || !value) return;
        if (!map.has(name)) map.set(name, new Set());
        map.get(name)!.add(value);
      });
    });
    // show only attrs that have 2+ distinct values
    return Array.from(map.entries())
      .filter(([, vals]) => vals.size >= 2)
      .map(([name, vals]) => ({ name, values: Array.from(vals) }));
  }, [variants]);

  if (variants.length === 0) return null;

  // Visible fixed filters: only if 2+ distinct values
  const visibleFilters = FILTERS.filter((f) => options[f.key].length >= 2);

  const handleChipClick = (key: VariantKey, value: string | number) => {
    const next = findBestVariant(variants, selectedVariant, key, value);
    if (next) onSelectVariant(next);
  };

  const handleAttrClick = (attrName: string, attrValue: string) => {
    const next = findBestVariantByAttr(variants, selectedVariant, attrName, attrValue);
    if (next) onSelectVariant(next);
  };

  // Is there any variant available for this chip combination?
  const isChipCompatible = (key: VariantKey, value: string | number) =>
    variants.some((v) => String(v[key]) === String(value));

  const isAttrCompatible = (attrName: string, attrValue: string) =>
    variants.some((v) => v.attributes?.some((a) => a.name === attrName && a.value === attrValue));

  const showConfig = visibleFilters.length > 0 || dynamicAttrs.length > 0;

  const descSections = useMemo(
    () => parseVariantDescription(selectedVariant.description),
    [selectedVariant.description],
  );

  return (
    <VariantGrid $single={!showConfig}>
      {/* ── Варианты (cards) ── */}
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
                onClick={() => onSelectVariant(variant)}
              >
                <FlexBox justifyContent="space-between" alignItems="flex-start" style={{ gap: 12 }}>
                  <Box minWidth={0}>
                    <H6 mb="2px">{variant.title}</H6>
                    {variant.warehouse && (
                      <Small display="block" color="text.muted" mt="4px">
                        {variant.warehouse}
                      </Small>
                    )}
                  </Box>
                  <Box textAlign="right" flexShrink={0}>
                    <H6 color={RED}>{formatCurrency(Number(variant.price))}</H6>
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

      {/* ── Конфигурация (chips) ── */}
      {showConfig && (
        <Card p="20px" borderRadius="16px" boxShadow="small">
          <H5 mb="16px">Конфигурация</H5>
          <FilterList>
            {visibleFilters.map((f) => {
              const currentVal = selectedVariant[f.key];
              return (
                <Box key={f.key}>
                  <H6 mb="10px">{f.title}</H6>
                  <ChipRow>
                    {options[f.key].map((val) => {
                      const selected = String(currentVal) === String(val);
                      const available = isChipCompatible(f.key, val);
                      return (
                        <Chip
                          key={`${f.key}-${val}`}
                          type="button"
                          $selected={selected}
                          $unavailable={!available}
                          onClick={() => handleChipClick(f.key, val)}
                          title={!available ? "Нет в наличии" : undefined}
                        >
                          {f.format(val)}
                        </Chip>
                      );
                    })}
                  </ChipRow>
                </Box>
              );
            })}

            {dynamicAttrs.map(({ name, values }) => {
              const currentAttrVal = selectedVariant.attributes?.find(
                (a) => a.name === name,
              )?.value;
              return (
                <Box key={name}>
                  <H6 mb="10px">{name}</H6>
                  <ChipRow>
                    {values.map((val) => {
                      const selected = currentAttrVal === val;
                      const available = isAttrCompatible(name, val);
                      return (
                        <Chip
                          key={`${name}-${val}`}
                          type="button"
                          $selected={selected}
                          $unavailable={!available}
                          onClick={() => handleAttrClick(name, val)}
                          title={!available ? "Нет в наличии" : undefined}
                        >
                          {val}
                        </Chip>
                      );
                    })}
                  </ChipRow>
                </Box>
              );
            })}
          </FilterList>
        </Card>
      )}
      {/* ── Характеристики выбранного варианта ── */}
      {descSections.length > 0 && (
        <VariantDescCard>
          <H5 mb="16px">Характеристики варианта</H5>
          {descSections.map((section, si) => (
            <Fragment key={si}>
              {si > 0 && <DescDivider />}
              {section.title && <DescSectionTitle>{section.title}</DescSectionTitle>}
              {section.type === "specs" && (
                <SpecsGrid>
                  {section.items.map((item, ii) => (
                    <Fragment key={ii}>
                      <SpecLabel>{item.label}</SpecLabel>
                      <SpecValue>{item.value}</SpecValue>
                    </Fragment>
                  ))}
                </SpecsGrid>
              )}
              {section.type === "list" && (
                <DescList>
                  {section.items.map((item, ii) => (
                    <DescListItem key={ii} $icon={item.icon}>
                      <span>{item.icon}</span>
                      <span>{item.text}</span>
                    </DescListItem>
                  ))}
                </DescList>
              )}
            </Fragment>
          ))}
        </VariantDescCard>
      )}
    </VariantGrid>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────────

type SpecSection = {
  type: "specs";
  title?: string;
  items: Array<{ label: string; value: string }>;
};

type ListSection = {
  type: "list";
  title?: string;
  items: Array<{ icon: string; text: string }>;
};

type DescSection = SpecSection | ListSection;

function parseVariantDescription(description?: string | null): DescSection[] {
  if (!description) return [];
  const lines = description.split("\n");
  const sections: DescSection[] = [];
  let currentSection: DescSection | null = null;

  for (const raw of lines) {
    const line = raw.trim();

    // Empty line — flush current section
    if (!line) {
      if (currentSection) {
        if ((currentSection.type === "specs" && currentSection.items.length > 0) ||
            (currentSection.type === "list" && currentSection.items.length > 0)) {
          sections.push(currentSection);
        }
        currentSection = null;
      }
      continue;
    }

    // Section header lines (e.g. "Подходит для:", "Преимущества:")
    if (/^[А-Яа-яA-Za-z][^•✓\n]{0,40}:$/.test(line)) {
      if (currentSection) {
        if ((currentSection.type === "specs" && currentSection.items.length > 0) ||
            (currentSection.type === "list" && currentSection.items.length > 0)) {
          sections.push(currentSection);
        }
      }
      currentSection = { type: "list", title: line.replace(/:$/, ""), items: [] };
      continue;
    }

    // Bullet / checkmark lines
    if (line.startsWith("•") || line.startsWith("✓")) {
      const icon = line.startsWith("✓") ? "✓" : "•";
      const text = line.replace(/^[•✓]\s*/, "");
      if (!currentSection || currentSection.type !== "list") {
        if (currentSection && currentSection.type === "specs" && currentSection.items.length > 0) {
          sections.push(currentSection);
        }
        currentSection = { type: "list", title: undefined, items: [] };
      }
      (currentSection as ListSection).items.push({ icon, text });
      continue;
    }

    // "Name: Value" spec line
    const colonIdx = line.indexOf(":");
    if (colonIdx > 0) {
      const label = line.slice(0, colonIdx).trim();
      const value = line.slice(colonIdx + 1).trim();
      if (label && value) {
        if (!currentSection || currentSection.type !== "specs") {
          if (currentSection && currentSection.type === "list" && currentSection.items.length > 0) {
            sections.push(currentSection);
          }
          currentSection = { type: "specs", title: undefined, items: [] };
        }
        (currentSection as SpecSection).items.push({ label, value });
        continue;
      }
    }
  }

  // Flush last section
  if (currentSection) {
    if ((currentSection.type === "specs" && currentSection.items.length > 0) ||
        (currentSection.type === "list" && currentSection.items.length > 0)) {
      sections.push(currentSection);
    }
  }

  return sections;
}

/**
 * Find the best matching variant when user clicks a chip.
 * 1. Exact match (all other dimensions stay the same)
 * 2. Partial match with highest score (most dimensions preserved)
 */
function findBestVariant(
  variants: ProductVariant[],
  current: ProductVariant,
  key: VariantKey,
  value: string | number,
): ProductVariant | null {
  // 1. exact match
  const exact = variants.find((v) =>
    String(v[key]) === String(value) &&
    FILTERS.every((f) => f.key === key || String(v[f.key]) === String(current[f.key])),
  );
  if (exact) return exact;

  // 2. candidates with the chosen key=value, pick one with most matching other fields
  const candidates = variants.filter((v) => String(v[key]) === String(value));
  if (!candidates.length) return null;

  const scored = candidates.map((v) => ({
    v,
    score: FILTERS.filter(
      (f) => f.key !== key && String(v[f.key]) === String(current[f.key]),
    ).length,
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored[0].v;
}

function findBestVariantByAttr(
  variants: ProductVariant[],
  current: ProductVariant,
  attrName: string,
  attrValue: string,
): ProductVariant | null {
  const candidates = variants.filter((v) =>
    v.attributes?.some((a) => a.name === attrName && a.value === attrValue),
  );
  if (!candidates.length) return null;

  // prefer variant that also keeps current fixed-field selections
  const scored = candidates.map((v) => ({
    v,
    score: FILTERS.filter((f) => String(v[f.key]) === String(current[f.key])).length,
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored[0].v;
}

// ── Styled components ──────────────────────────────────────────────────────────

const RED = "#D32F2F";
const RED_LIGHT = "#FFEBEE";

const VariantGrid = styled.div<{ $single?: boolean }>`
  display: grid;
  grid-template-columns: ${({ $single }) => ($single ? "1fr" : "minmax(0,1fr) minmax(0,1fr)")};
  gap: 18px;
  margin-bottom: 28px;

  /* Description card always spans full width */
  & > *:last-child:nth-child(n+2) {
    grid-column: 1 / -1;
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const VariantDescCard = styled.div`
  padding: 20px;
  border-radius: 16px;
  background: #fff;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const DescDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.gray[200]};
  margin: 14px 0;
`;

const DescSectionTitle = styled.p`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0 0 10px;
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(140px, max-content) 1fr;
  gap: 6px 16px;
`;

const SpecLabel = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.muted};
  white-space: nowrap;
`;

const SpecValue = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const DescList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const DescListItem = styled.li<{ $icon: string }>`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.primary};

  & > span:first-child {
    flex-shrink: 0;
    font-weight: 700;
    color: ${({ $icon }) => ($icon === "✓" ? "#2E7D32" : "#1565C0")};
    margin-top: 1px;
  }
`;

const VariantList = styled.div`
  display: grid;
  gap: 12px;
`;

const VariantCard = styled.button<{ $selected: boolean }>`
  width: 100%;
  padding: 14px;
  border: 2px solid ${({ $selected, theme }) => ($selected ? RED : theme.colors.gray[300])};
  border-radius: 16px;
  background: ${({ $selected }) => ($selected ? RED_LIGHT : "#fff")};
  box-shadow: ${({ theme }) => theme.shadows.small};
  color: inherit;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  transition: border-color 150ms ease, background-color 150ms ease;
`;

const ChooseBadge = styled.span<{ $selected: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 28px;
  margin-top: 8px;
  padding: 0 12px;
  border-radius: 999px;
  background: ${({ $selected }) => ($selected ? RED : RED_LIGHT)};
  color: ${({ $selected }) => ($selected ? "#fff" : RED)};
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
  gap: 8px;
`;

const Chip = styled.button<{ $selected: boolean; $unavailable?: boolean }>`
  min-height: 38px;
  padding: 0 14px;
  border: 1.5px solid
    ${({ $selected, $unavailable, theme }) =>
      $unavailable
        ? theme.colors.gray[200]
        : $selected
          ? RED
          : theme.colors.gray[300]};
  border-radius: 12px;
  background: ${({ $selected, $unavailable, theme }) =>
    $unavailable ? theme.colors.gray[100] : $selected ? RED : "#fff"};
  color: ${({ $selected, $unavailable, theme }) =>
    $unavailable
      ? theme.colors.text.disabled
      : $selected
        ? "#fff"
        : theme.colors.text.primary};
  cursor: ${({ $unavailable }) => ($unavailable ? "not-allowed" : "pointer")};
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  opacity: ${({ $unavailable }) => ($unavailable ? 0.55 : 1)};
  transition: border-color 150ms ease, background-color 150ms ease, color 150ms ease;
  position: relative;

  /* strikethrough line for unavailable */
  ${({ $unavailable }) =>
    $unavailable &&
    `&::after {
      content: "";
      position: absolute;
      left: 8px;
      right: 8px;
      top: 50%;
      height: 1px;
      background: currentColor;
      opacity: 0.4;
    }`}
`;
