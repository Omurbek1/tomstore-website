"use client";

import { Fragment, useEffect, useState } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { Link } from "@i18n/navigation";
// GLOBAL CUSTOM COMPONENTS
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import Divider from "@component/Divider";
import { Header } from "@component/header";
import Scrollbar from "@component/Scrollbar";
import Typography from "@component/Typography";
import MobileNavigationBar from "@component/mobile-navigation";
import { Accordion, AccordionHeader } from "@component/accordion";
// CUSTOM HOOK
import useWindowSize from "@hook/useWindowSize";

import { MobileCategoryNavStyle } from "./styles";
import MobileCategoryImageBox from "./MobileCategoryImageBox";

import navigations from "@data/navigations";
import type { LocalizedNavigationItem } from "@data/types";
import localizeNavigations from "@utils/localizeNavigations";

export default function MobileCategoryNav() {
  const t = useTranslations();
  const width = useWindowSize();
  const localizedNavigations = localizeNavigations(navigations, t);
  const [selectedCategoryId, setSelectedCategoryId] = useState(localizedNavigations[0]?.id || "");

  useEffect(() => {
    if (!localizedNavigations.length) return;
    if (!localizedNavigations.some((item) => item.id === selectedCategoryId)) {
      setSelectedCategoryId(localizedNavigations[0].id);
    }
  }, [localizedNavigations, selectedCategoryId]);

  const category =
    localizedNavigations.find((item) => item.id === selectedCategoryId) || localizedNavigations[0];
  const subCategoryList = category?.menuData?.categories || [];

  const handleCategoryClick = (cat: LocalizedNavigationItem) => () => {
    setSelectedCategoryId(cat.id);
  };

  if (typeof width === "number" && width > 900) return null;

  return (
    <MobileCategoryNavStyle>
      <Header className="header" />

      <div className="main-category-holder">
        <Scrollbar>
          {localizedNavigations.map((item) => (
            <div
              key={item.id}
              className={clsx({ "main-category-box": true, active: category?.id === item.id })}
              onClick={handleCategoryClick(item)}>
              <Icon size="28px" mb="0.5rem">
                {item.icon}
              </Icon>
              <Typography className="ellipsis" textAlign="center" fontSize="11px" lineHeight="1">
                {item.title}
              </Typography>
            </div>
          ))}
        </Scrollbar>
      </div>

      <div className="container">
        {category?.menuComponent === "MegaMenu1" ? (
          subCategoryList.map((item, ind) => (
            <Fragment key={item.href || item.title || ind}>
              <Divider />
              <Accordion>
                <AccordionHeader px="0px" py="10px">
                  <Typography fontWeight="600" fontSize="15px">
                    {item.title}
                  </Typography>
                </AccordionHeader>

                <Box mb="1.5rem" mt="0.5rem">
                  <Grid container spacing={3}>
                    {item.subCategories?.map((sub, i) => (
                      <Grid item lg={1} md={2} sm={3} xs={4} key={i}>
                        <Link href={sub.href as any}>
                          <MobileCategoryImageBox title={sub.title} />
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Accordion>
            </Fragment>
          ))
        ) : (
          <Box mb="1.5rem">
            <Grid container spacing={3}>
              {subCategoryList.map((item, ind) => (
                <Grid item lg={1} md={2} sm={3} xs={4} key={ind}>
                  <Link href={item.href as any}>
                    <MobileCategoryImageBox title={item.title} />
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </div>

      <MobileNavigationBar />
    </MobileCategoryNavStyle>
  );
}
