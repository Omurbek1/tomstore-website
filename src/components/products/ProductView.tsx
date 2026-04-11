"use client";

import { Fragment } from "react";
import { Tabs } from "antd";
import { useTranslations } from "next-intl";

import Box from "@component/Box";
import Shop from "@models/shop.model";
import ProductReview from "@component/products/ProductReview";
import AvailableShops from "@component/products/AvailableShops";
import RelatedProducts from "@component/products/RelatedProducts";
import FrequentlyBought from "@component/products/FrequentlyBought";
import ProductDescription from "@component/products/ProductDescription";
import Product from "@models/product.model";

// ==============================================================
type Props = {
  shops: Shop[];
  relatedProducts: Product[];
  frequentlyBought: Product[];
};
// ==============================================================

export default function ProductView({ shops, relatedProducts, frequentlyBought }: Props) {
  const t = useTranslations("product");
  const tabItems = [
    {
      key: "description",
      label: t("descriptionTab"),
      children: <ProductDescription />
    },
    {
      key: "review",
      label: t("reviewTab", { count: 3 }),
      children: <ProductReview />
    }
  ];

  return (
    <Fragment>
      <Box mt="80px" mb="50px">
        <Tabs
          size="large"
          defaultActiveKey="description"
          items={tabItems}
          tabBarStyle={{ marginBottom: 24 }}
        />
      </Box>

      {/* FREQUENTLY BOUGHT TOGETHER PRODUCTS */}
      {frequentlyBought && <FrequentlyBought products={frequentlyBought} />}

      {/* AVAILABLE SHOPS */}
      {shops && <AvailableShops shops={shops} />}

      {/* RELATED PRODUCTS */}
      {relatedProducts && <RelatedProducts products={relatedProducts} />}
    </Fragment>
  );
}
