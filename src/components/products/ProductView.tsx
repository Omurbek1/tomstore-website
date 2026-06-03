"use client";

import { Fragment, useMemo, useState } from "react";
import styled from "styled-components";
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

// Лёгкая замена antd <Tabs> на styled-components (чтобы не тянуть AntD на витрину).
const TabBar = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  margin-bottom: 24px;
`;

const TabButton = styled.button<{ $active: boolean }>`
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 12px 4px;
  margin-bottom: -1px;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary.main : theme.colors.text.secondary};
  border-bottom: 2px solid
    ${({ theme, $active }) => ($active ? theme.colors.primary.main : "transparent")};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export default function ProductView({
  product,
  shops,
  relatedProducts,
  frequentlyBought,
  selectedVariant,
}: Props) {
  const t = useTranslations("product");
  const [activeKey, setActiveKey] = useState("description");

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

  // Активная вкладка с фолбэком (вкладка варианта может появляться/исчезать)
  const activeItem =
    tabItems.find((item) => item.key === activeKey) ?? tabItems[0];

  return (
    <Fragment>
      <Box mt="80px" mb="50px">
        <TabBar role="tablist">
          {tabItems.map((item) => (
            <TabButton
              key={item.key}
              role="tab"
              type="button"
              aria-selected={item.key === activeItem.key}
              $active={item.key === activeItem.key}
              onClick={() => setActiveKey(item.key)}
            >
              {item.label}
            </TabButton>
          ))}
        </TabBar>
        <div role="tabpanel">{activeItem.children}</div>
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
