import { Fragment } from "react";
import ProductView from "@component/products/ProductView";
import ProductIntro from "@component/products/ProductIntro";
import api from "@utils/__api__/products";

// ==============================================================
interface Props {
  params: Promise<{ slug: string }>;
}
// ==============================================================

export default async function ProductDetails({ params }: Props) {
  const { slug } = await params;

  const [product, shops, relatedProducts, frequentlyBought] = await Promise.all([
    api.getProduct(slug),
    api.getAvailableShop(),
    api.getRelatedProducts(),
    api.getFrequentlyBought()
  ]);

  return (
    <Fragment>
      <ProductIntro
        id={product.id}
        price={product.price}
        title={product.title}
        images={product.images}
      />

      <ProductView
        shops={shops}
        relatedProducts={relatedProducts}
        frequentlyBought={frequentlyBought}
      />
    </Fragment>
  );
}
