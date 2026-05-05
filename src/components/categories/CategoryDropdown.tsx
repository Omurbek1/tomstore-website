"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import navigations from "@data/navigations";
import type Category from "@models/category.model";
import { useStorefrontCategories } from "@hook/useStorefrontCatalog";
import localizeNavigations from "@utils/localizeNavigations";
import MegaMenu1 from "./mega-menu/MegaMenu1";
import CategoryMenuItem from "./CategoryMenuItem";
import { StyledCategoryDropdown } from "./styles";

// =========================================
type CategoryDropdownProps = {
  open: boolean;
  position?: "absolute" | "relative";
};
// =========================================

const CATEGORY_ICONS = [
  "laptop",
  "printer",
  "desktop",
  "cpu",
  "mouse",
  "camera",
  "phone",
  "category",
];

const toCategoryHref = (slug: string) =>
  `/product/search/${encodeURIComponent(slug)}?type=category`;

const getCategoryIcon = (category: Category, index: number) =>
  category.icon || CATEGORY_ICONS[index % CATEGORY_ICONS.length];

export default function CategoryDropdown({ open, position = "absolute" }: CategoryDropdownProps) {
  const t = useTranslations();
  const { data: categories = [], isError, isLoading } = useStorefrontCategories(open);

  const fallbackNavigations = useMemo(() => localizeNavigations(navigations, t), [t]);
  const shouldUseFallback = isError || (!isLoading && categories.length === 0);

  if (open && isLoading && !categories.length) {
    return (
      <StyledCategoryDropdown open={open} position={position}>
        <CategoryMenuItem href="#" icon="category" title="Loading..." caret={false}>
          {null}
        </CategoryMenuItem>
      </StyledCategoryDropdown>
    );
  }

  return (
    <StyledCategoryDropdown open={open} position={position}>
      {!shouldUseFallback &&
        categories.map((category, index) => (
          <CategoryMenuItem
            key={category.id || category.slug}
            href={toCategoryHref(category.slug)}
            icon={getCategoryIcon(category, index)}
            title={category.name}
            caret={false}>
            {null}
          </CategoryMenuItem>
        ))}

      {shouldUseFallback &&
        fallbackNavigations.map((item) => (
          <CategoryMenuItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            title={item.title}
            caret={!!item.menuData}>
            {item.menuComponent === "MegaMenu1" && <MegaMenu1 data={item.menuData ?? {}} />}
          </CategoryMenuItem>
        ))}
    </StyledCategoryDropdown>
  );
}
