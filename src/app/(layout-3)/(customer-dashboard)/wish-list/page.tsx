"use client";

import { Fragment } from "react";
import { IconHeartFilled } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
// CUSTOM DATA
import db from "@data/db";
// GLOBAL CUSTOM COMPONENTS
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import Pagination from "@component/pagination";
import ProductCard1 from "@component/product-cards/ProductCard1";
import DashboardPageHeader from "@component/DashboardPageHeader";

export default function WishList() {
  const t = useTranslations("dashboard");

  return (
    <Fragment>
      {/* PAGE TITLE AREA */}
      <DashboardPageHeader
        title={t("headers.myWishList")}
        Icon={<IconHeartFilled size={27} />}
        button={<Button color="primary">{t("buttons.addAllToCart")}</Button>}
      />

      {/* PRODUCT LIST AREA */}
      <Grid container spacing={6}>
        {db.slice(53, 59).map((item) => (
          <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ProductCard1
              id={item.id}
              slug={item.slug}
              price={item.price}
              title={item.title}
              off={item.discount}
              images={item.images}
              imgUrl={item.thumbnail}
              rating={item.rating || 4}
            />
          </Grid>
        ))}
      </Grid>

      {/* PAGINATION AREA */}
      <FlexBox justifyContent="center" mt="2.5rem">
        <Pagination pageCount={5} onChange={(data) => console.log(data)} />
      </FlexBox>
    </Fragment>
  );
}
