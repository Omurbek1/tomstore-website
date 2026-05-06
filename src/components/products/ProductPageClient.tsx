"use client";

import { useState } from "react";
import Shop from "@models/shop.model";
import Product, { ProductVariant } from "@models/product.model";
import ProductIntro from "./ProductIntro";
import ProductView from "./ProductView";

type Props = {
  product: Product;
  shops: Shop[];
  relatedProducts: Product[];
  frequentlyBought: Product[];
};

export default function ProductPageClient({
  product,
  shops,
  relatedProducts,
  frequentlyBought,
}: Props) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);

  return (
    <>
      <ProductIntro
        product={product}
        id={product.id}
        price={product.price}
        title={product.title}
        images={product.images || []}
        brand={product.brand}
        oldPrice={product.oldPrice}
        availabilityLabel={product.availabilityLabel}
        labels={product.labels}
        slug={product.slug}
        onVariantChange={setSelectedVariant}
      />
      <ProductView
        product={product}
        shops={shops}
        relatedProducts={relatedProducts}
        frequentlyBought={frequentlyBought}
        selectedVariant={selectedVariant}
      />
    </>
  );
}
