"use client";

import { Fragment, useCallback, useState } from "react";
import { Drawer } from "antd";
import { useTheme } from "styled-components";
import { IconLayoutGrid, IconList } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

import Box from "@component/Box";
import Card from "@component/Card";
import Select from "@component/Select";
import Icon from "@component/icon/Icon";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import { IconButton } from "@component/buttons";
import { H5, Paragraph } from "@component/Typography";
import ProductGridView from "@component/products/ProductCard1List";
import ProductListView from "@component/products/ProductCard9List";
import ProductFilterCard from "@component/products/ProductFilterCard";
import useWindowSize from "@hook/useWindowSize";
import Product from "@models/product.model";
import { useStorefrontProducts } from "@hook/useStorefrontCatalog";
import type { StorefrontCatalogParams } from "@utils/__api__/storefront";

// Maps frontend option values to backend sort parameter values
const SORT_MAP: Record<string, string> = {
  relevance: "popular",
  date: "newest",
  priceLowToHigh: "price_asc",
  priceHighToLow: "price_desc",
};

type Props = {
  products: Product[];
  query: string;
  searchType?: "text" | "category";
  catalogParams?: StorefrontCatalogParams;
};

export default function SearchResult({
  products,
  query: rawQuery,
  searchType = "text",
  catalogParams,
}: Props) {
  const theme = useTheme();
  const width = useWindowSize();
  const t = useTranslations("search");
  const filtersT = useTranslations("product.filters");

  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortKey, setSortKey] = useState("relevance");
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>();
  const [selectedMinPrice, setSelectedMinPrice] = useState<number | undefined>();
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number | undefined>();

  const query = decodeURIComponent(rawQuery || "");
  const backendSort = SORT_MAP[sortKey] ?? "popular";

  const liveCatalogParams = {
    ...(catalogParams ??
      (searchType === "category" ? { category: query } : { q: query })),
    brand: selectedBrand,
    minPrice: selectedMinPrice,
    maxPrice: selectedMaxPrice,
    pageSize: 48,
    sort: backendSort,
  };

  const { data: liveProducts = products } = useStorefrontProducts(liveCatalogParams, products);

  const sortOptions = [
    { label: t("sortOptions.relevance"), value: "relevance" },
    { label: t("sortOptions.date"), value: "date" },
    { label: t("sortOptions.priceLowToHigh"), value: "priceLowToHigh" },
    { label: t("sortOptions.priceHighToLow"), value: "priceHighToLow" },
  ];

  const handleSortChange = useCallback((option: { value: string } | null) => {
    if (option) setSortKey(option.value);
  }, []);

  const handleOpenSidenav = useCallback(() => setOpen(true), []);
  const handleCloseSidenav = useCallback(() => setOpen(false), []);
  const handleBrandChange = useCallback((brand?: string) => {
    setSelectedBrand(brand);
  }, []);
  const handlePriceChange = useCallback(
    ({ minPrice, maxPrice }: { minPrice?: number; maxPrice?: number }) => {
      setSelectedMinPrice(minPrice);
      setSelectedMaxPrice(maxPrice);
    },
    [],
  );

  const isTablet = width ? width < 1025 : false;
  const showDesktopFilters = !isTablet;
  const toggleView = useCallback((v: "grid" | "list") => () => setView(v), []);

  return (
    <Fragment>
      <FlexBox
        as={Card}
        mb="55px"
        p="1.25rem"
        elevation={5}
        flexWrap="wrap"
        borderRadius={12}
        alignItems="center"
        justifyContent="space-between"
      >
        <div>
          <H5>{t("searchingFor", { query })}</H5>
          <Paragraph color="text.muted">
            {t("resultsFound", { count: liveProducts.length })}
          </Paragraph>
        </div>

        <FlexBox alignItems="center" flexWrap="wrap">
          <Paragraph color="text.muted" mr="1rem">
            {t("sortBy")}
          </Paragraph>

          <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
            <Select
              placeholder={t("sortPlaceholder")}
              value={sortOptions.find((o) => o.value === sortKey)}
              options={sortOptions}
              onChange={handleSortChange}
            />
          </Box>

          <Paragraph color="text.muted" mr="0.5rem">
            {t("view")}
          </Paragraph>

          <IconButton onClick={toggleView("grid")}>
            <IconLayoutGrid
              size={22}
              color={view === "grid" ? theme.colors.primary.main : "currentColor"}
            />
          </IconButton>

          <IconButton onClick={toggleView("list")}>
            <IconList
              size={22}
              color={view === "list" ? theme.colors.primary.main : "currentColor"}
            />
          </IconButton>

          {isTablet && (
            <Fragment>
              <IconButton
                onClick={handleOpenSidenav}
                aria-label={filtersT("title")}
                title={filtersT("title")}
              >
                <Icon>options</Icon>
              </IconButton>

              <Drawer
                placement="left"
                size={320}
                open={open}
                title={filtersT("title")}
                onClose={handleCloseSidenav}
                destroyOnHidden
                styles={{ body: { padding: 16, background: theme.colors.body.paper } }}
              >
                <ProductFilterCard
                  selectedBrand={selectedBrand}
                  selectedMinPrice={selectedMinPrice}
                  selectedMaxPrice={selectedMaxPrice}
                  onBrandChange={handleBrandChange}
                  onPriceChange={handlePriceChange}
                />
              </Drawer>
            </Fragment>
          )}
        </FlexBox>
      </FlexBox>

      <Grid container spacing={6}>
        {showDesktopFilters && (
          <Grid item lg={3} xs={12}>
            <ProductFilterCard
              selectedBrand={selectedBrand}
              selectedMinPrice={selectedMinPrice}
              selectedMaxPrice={selectedMaxPrice}
              onBrandChange={handleBrandChange}
              onPriceChange={handlePriceChange}
            />
          </Grid>
        )}

        <Grid item lg={showDesktopFilters ? 9 : 12} xs={12}>
          {view === "grid" ? (
            <ProductGridView products={liveProducts} />
          ) : (
            <ProductListView products={liveProducts} />
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
}
