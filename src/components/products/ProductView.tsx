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
import Product, { ProductVariant } from "@models/product.model";

// ==============================================================
type Props = {
  product: Product;
  shops: Shop[];
  relatedProducts: Product[];
  frequentlyBought: Product[];
  selectedVariant?: ProductVariant;
};
// ==============================================================

export default function ProductView({
  product,
  shops,
  relatedProducts,
  frequentlyBought,
  selectedVariant,
}: Props) {
  const t = useTranslations("product");
  const tabItems = [
    {
      key: "description",
      label: t("descriptionTab"),
      children: <ProductDescription product={product} selectedVariant={selectedVariant} />
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
      {frequentlyBought.length > 0 ? (
        <FrequentlyBought baseProduct={product} products={frequentlyBought} />
      ) : null}

      {/* AVAILABLE SHOPS */}
      {shops.length > 0 ? <AvailableShops shops={shops} /> : null}

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 ? (
        <RelatedProducts products={relatedProducts} />
      ) : null}
    </Fragment>
  );
}
