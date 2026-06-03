"use client";

import { KeyboardEvent, useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { IconSearch } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

import navigations from "@data/navigations";
import type { CatalogOption } from "./CategoryCascader";

// AntD-зависимый Cascader грузится лениво и только на клиенте,
// чтобы AntD не попадал в критический бандл витрины.
const CategoryCascader = dynamic(() => import("./CategoryCascader"), {
  ssr: false,
});
import Box from "@component/Box";
import Card from "@component/Card";
import MenuItem from "@component/MenuItem";
import { Span } from "@component/Typography";
import FlexBox from "@component/FlexBox";
import TextField from "@component/text-field";
import localizeNavigations from "@utils/localizeNavigations";
import { useSearchSuggestions } from "@hook/useSearchSuggestions";
import { Link, useRouter } from "@i18n/navigation";
import StyledSearchBox from "./styled";

export default function SearchInputWithCategory() {
  const router = useRouter();
  const allT = useTranslations();
  const t = useTranslations("search");

  const [query, setQuery] = useState("");
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [categoryPath, setCategoryPath] = useState<string[]>(["all"]);
  // Human-readable label of the selected category (e.g. "Ноутбуки"), used as text query
  const [categoryLabel, setCategoryLabel] = useState("");

  const { data: suggestions = [] } = useSearchSuggestions(query);
  const resultList = suggestionsOpen ? suggestions : [];

  const categoryOptions = useMemo<CatalogOption[]>(() => {
    const localizedNavigations = localizeNavigations(navigations, allT);
    return [
      { label: t("categories.all"), value: "all", searchValue: "all" },
      ...localizedNavigations.map((item) => ({
        label: item.title,
        value: normalizeCatalogValue(item.href),
        searchValue: normalizeCatalogValue(item.href),
        children: item.menuData?.categories?.map((category) => ({
          label: category.title,
          value: normalizeCatalogValue(category.href),
          searchValue: normalizeCatalogValue(category.href),
          children: category.subCategories?.map((subCategory) => ({
            label: subCategory.title,
            value: normalizeCatalogValue(subCategory.href),
            searchValue: normalizeCatalogValue(subCategory.href),
          })),
        })),
      })),
    ];
  }, [allT, t]);

  // Navigate to search: always text-based so backend can match by name/category/characteristics
  const goToSearch = useCallback(
    (text: string) => {
      const q = text.trim();
      if (!q || q === t("categories.all")) return;
      setSuggestionsOpen(false);
      router.push(`/product/search/${encodeURIComponent(q)}?type=text` as any);
    },
    [router, t],
  );

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target?.value ?? "";
    setQuery(value);
    setSuggestionsOpen(value.trim().length >= 2);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter") return;
      // Text query takes priority; fall back to selected category label
      goToSearch(query || categoryLabel);
    },
    [goToSearch, query, categoryLabel],
  );

  const handleCategoryChange = useCallback(
    (value: (string | number)[], selectedOptions?: CatalogOption[]) => {
      const nextPath = value.map(String);
      setCategoryPath(nextPath.length ? nextPath : ["all"]);

      const label = selectedOptions?.[selectedOptions.length - 1]?.label ?? "";
      const nextValue = nextPath[nextPath.length - 1] ?? "all";

      // Save label for potential Enter-key navigation
      setCategoryLabel(nextValue !== "all" ? label : "");

      // Navigate immediately if no text is typed
      if (!query.trim() && nextValue !== "all") {
        goToSearch(label || nextValue);
      }
    },
    [query, goToSearch],
  );

  const handleDocumentClick = useCallback(() => setSuggestionsOpen(false), []);

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, [handleDocumentClick]);

  useEffect(() => {
    const input = document.querySelector<HTMLInputElement>(".category-cascader input");
    input?.setAttribute("aria-label", t("categories.all"));
  }, [t]);

  return (
    <Box
      zIndex={99}
      position="relative"
      flex="1 1 0"
      maxWidth="670px"
      mx="auto"
      onClick={(event) => event.stopPropagation()}
    >
      <StyledSearchBox>
        <IconSearch size={18} stroke={1.5} className="search-icon" />

        <TextField
          fullWidth
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          className="search-field"
          placeholder={t("placeholder")}
        />

        <div className="category-cascader">
          <CategoryCascader
            options={categoryOptions}
            value={categoryPath}
            ariaLabel={t("categories.all")}
            onChange={handleCategoryChange}
          />
        </div>
      </StyledSearchBox>

      {resultList.length > 0 && (
        <div className="suggestions-dropdown">
            <Card py="0.5rem" mt="0.25rem" boxShadow="large" borderRadius=".5rem">
              {resultList.map((item) => (
                <Link href={`/product/${item.slug}`} key={item.id}>
                  <MenuItem>
                    <FlexBox flexDirection="column" py="2px">
                      <Span fontSize="14px" fontWeight={500} color="text.primary">
                        {item.name}
                      </Span>
                      {(item.matchedAttribute || item.category) && (
                        <Span fontSize="12px" color="text.muted" mt="1px">
                          {item.matchedAttribute ?? item.category}
                        </Span>
                      )}
                    </FlexBox>
                  </MenuItem>
                </Link>
              ))}
            </Card>
        </div>
      )}
    </Box>
  );
}

const normalizeCatalogValue = (href: string) =>
  href.replace(/^\/catalog\/?/, "") || "all";
