"use client";

import { Fragment } from "react";
import { IconHeartFilled } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import ProductGridCard from "@component/product-cards/ProductGridCard";
import DashboardPageHeader from "@component/DashboardPageHeader";
import { useWishlistItems } from "@hook/useWishlist";
import { useChangeCartAmount } from "@hook/useCart";
import { H5 } from "@component/Typography";

export default function WishList() {
  const t = useTranslations("dashboard");
  const wishlistItems = useWishlistItems();
  const changeCartAmount = useChangeCartAmount();

  const handleAddAllToCart = () => {
    wishlistItems.forEach((item) => {
      changeCartAmount({ id: item.id, slug: item.slug, name: item.title, price: item.price, imgUrl: item.imgUrl, qty: 1 });
    });
  };

  return (
    <Fragment>
      <DashboardPageHeader
        title={t("headers.myWishList")}
        Icon={<IconHeartFilled size={27} />}
        button={
          wishlistItems.length > 0 ? (
            <Button color="primary" onClick={handleAddAllToCart}>
              {t("buttons.addAllToCart")}
            </Button>
          ) : undefined
        }
      />

      {wishlistItems.length === 0 ? (
        <FlexBox justifyContent="center" alignItems="center" mt="4rem">
          <H5 color="text.muted">{t("emptyWishlist")}</H5>
        </FlexBox>
      ) : (
        <Grid container spacing={6}>
          {wishlistItems.map((item) => (
            <Grid item lg={4} sm={6} xs={12} key={item.id}>
              <ProductGridCard
                id={item.id}
                slug={item.slug}
                price={item.price}
                title={item.title}
                imgUrl={item.imgUrl}
                images={[item.imgUrl]}
                rating={4}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Fragment>
  );
}
