"use client";

import { Fragment, useMemo } from "react";
import { Tabs } from "antd";
import { useTranslations } from "next-intl";

import Box from "@component/Box";
import Shop from "@models/shop.model";
import ProductReview from "@component/products/ProductReview";
import AvailableShops from "@component/products/AvailableShops";
import RelatedProducts from "@component/products/RelatedProducts";
import FrequentlyBought from "@component/products/FrequentlyBought";
import ProductDescription from "@component/products/ProductDescription";
import ProductVariantDetails from "@component/products/ProductVariantDetails";
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

  const tabItems = useMemo(() => {
    const items = [
      {
        key: "description",
        label: t("descriptionTab"),
        // "Описание" always shows product-level content, not variant-specific
        children: <ProductDescription product={product} />,
      },
    ];

    // Show variant tab only when selected variant has description content
    if (selectedVariant?.description) {
      items.push({
        key: `variant-${selectedVariant.id}`,
        label: "Характеристики варианта",
        children: <ProductVariantDetails variant={selectedVariant} />,
      });
    }

    items.push({
      key: "review",
      label: t("reviewTab", { count: 3 }),
      children: <ProductReview />,
    });

    return items;
  }, [product, selectedVariant, t]);

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
