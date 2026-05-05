"use client";

import { KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Cascader } from "antd";
import { AnimatePresence, motion } from "motion/react";
import { IconChevronDown, IconSearch } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

import navigations from "@data/navigations";
import Box from "@component/Box";
import Card from "@component/Card";
import MenuItem from "@component/MenuItem";
import { Span } from "@component/Typography";
import FlexBox from "@component/FlexBox";
import TextField from "@component/text-field";
import localizeNavigations from "@utils/localizeNavigations";
import { getSearchSuggestions, type SearchSuggestion } from "@utils/__api__/storefront";
import { Link, useRouter } from "i18n/navigation";
import StyledSearchBox from "./styled";

type CatalogOption = {
  label: string;
  value: string;
  searchValue: string;
  children?: CatalogOption[];
};

const dropdownVariants = {
  hidden: { y: -10, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: { duration: 0.2, easing: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: { y: -10, opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
};

export default function SearchInputWithCategory() {
  const router = useRouter();
  const allT = useTranslations();
  const t = useTranslations("search");

  const [resultList, setResultList] = useState<SearchSuggestion[]>([]);
  const [query, setQuery] = useState("");
  const [categoryPath, setCategoryPath] = useState<string[]>(["all"]);
  // Human-readable label of the selected category (e.g. "Ноутбуки"), used as text query
  const [categoryLabel, setCategoryLabel] = useState("");
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      setResultList([]);
      router.push(`/product/search/${encodeURIComponent(q)}?type=text` as any);
    },
    [router, t],
  );

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target?.value ?? "";
    setQuery(value);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (value.trim().length < 2) {
      setResultList([]);
      return;
    }

    debounceTimer.current = setTimeout(async () => {
      const suggestions = await getSearchSuggestions(value.trim());
      setResultList(suggestions);
    }, 300);
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

  const handleDocumentClick = useCallback(() => setResultList([]), []);

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, [handleDocumentClick]);

  useEffect(() => {
    return () => { if (debounceTimer.current) clearTimeout(debounceTimer.current); };
  }, []);

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
          <Cascader
            allowClear={false}
            changeOnSelect
            expandTrigger="hover"
            options={categoryOptions}
            value={categoryPath}
            onChange={handleCategoryChange as any}
            showSearch={{ filter: filterCatalogOptions }}
            suffixIcon={<IconChevronDown size={18} stroke={1.5} />}
            displayRender={(labels) => labels[labels.length - 1]}
            classNames={{ popup: { root: "tomstore-category-cascader-popup" } }}
          />
        </div>
      </StyledSearchBox>

      <AnimatePresence>
        {resultList.length > 0 && (
          <motion.div
            exit="exit"
            initial="hidden"
            animate="visible"
            variants={dropdownVariants}
            style={{ top: "100%", zIndex: 99, width: "100%", position: "absolute" }}
          >
            <Card py="0.5rem" mt="0.25rem" boxShadow="large" borderRadius=".5rem">
              {resultList.map((item) => (
                <Link href={`/product/${item.slug}`} key={item.id}>
                  <MenuItem>
                    <FlexBox flexDirection="column" py="2px">
                      <Span fontSize="14px" fontWeight={500}>
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
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

const normalizeCatalogValue = (href: string) =>
  href.replace(/^\/catalog\/?/, "") || "all";

const filterCatalogOptions = (inputValue: string, path: CatalogOption[]): boolean =>
  path.some((opt) => opt.label.toLowerCase().includes(inputValue.toLowerCase()));
