"use client";

import { Fragment, useCallback, useState } from "react";
import { useParams } from "next/navigation";
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
import Sidenav from "@component/sidenav/Sidenav";
import { H5, Paragraph } from "@component/Typography";
import ProductGridView from "@component/products/ProductCard1List";
import ProductListView from "@component/products/ProductCard9List";
import ProductFilterCard from "@component/products/ProductFilterCard";
import useWindowSize from "@hook/useWindowSize";
import db from "@data/db";

export default function SearchResult() {
  const theme = useTheme();
  const width = useWindowSize();
  const params = useParams<{ slug: string }>();
  const t = useTranslations("search");

  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const resultCount = db.slice(95, 104).length;
  const query = decodeURIComponent(Array.isArray(params.slug) ? params.slug[0] : params.slug || "");
  const sortOptions = [
    { label: t("sortOptions.relevance"), value: "relevance" },
    { label: t("sortOptions.date"), value: "date" },
    { label: t("sortOptions.priceLowToHigh"), value: "priceLowToHigh" },
    { label: t("sortOptions.priceHighToLow"), value: "priceHighToLow" }
  ];

  const handleOpenSidenav = useCallback(() => setOpen(true), []);
  const handleCloseSidenav = useCallback(() => setOpen(false), []);

  const isTablet = width ? width < 1025 : false;
  const toggleView = useCallback((v: any) => () => setView(v), []);

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
          <Paragraph color="text.muted">{t("resultsFound", { count: resultCount })}</Paragraph>
        </div>

        <FlexBox alignItems="center" flexWrap="wrap">
          <Paragraph color="text.muted" mr="1rem">
            {t("sortBy")}
          </Paragraph>

          <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
            <Select
              placeholder={t("sortPlaceholder")}
              defaultValue={sortOptions[0]}
              options={sortOptions}
            />
          </Box>

          <Paragraph color="text.muted" mr="0.5rem">
            {t("view")}
          </Paragraph>

          <IconButton onClick={toggleView("grid")}>
            <IconLayoutGrid
              size={22}
              color={
                view === "grid" ? theme.colors.primary.main : "currentColor"
              }
            />
          </IconButton>

          <IconButton onClick={toggleView("list")}>
            <IconList
              size={22}
              color={
                view === "list" ? theme.colors.primary.main : "currentColor"
              }
            />
          </IconButton>

          {isTablet && (
            <Sidenav
              position="left"
              open={open}
              scroll={true}
              onClose={handleCloseSidenav}
              handle={
                <IconButton onClick={handleOpenSidenav}>
                  <Icon>options</Icon>
                </IconButton>
              }
            >
              <ProductFilterCard />
            </Sidenav>
          )}
        </FlexBox>
      </FlexBox>

      <Grid container spacing={6}>
        <Grid item lg={3} xs={12}>
          <ProductFilterCard />
        </Grid>

        <Grid item lg={9} xs={12}>
          {view === "grid" ? (
            <ProductGridView products={db.slice(95, 104) as any[]}  />
          ) : (
            <ProductListView products={db.slice(95, 104) as any[]} />
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
}
