import { Fragment } from "react";
import ProductView from "@component/products/ProductView";
import ProductIntro from "@component/products/ProductIntro";
import api from "@utils/__api__/products";
import { getProductBySlug } from "@utils/__api__/storefront";

// ==============================================================
interface Props {
  params: Promise<{ slug: string }>;
}
// ==============================================================

export default async function ProductDetails({ params }: Props) {
  const { slug } = await params;

  const [productPayload, shops, frequentlyBought] = await Promise.all([
    getProductBySlug(slug),
    api.getAvailableShop(),
    api.getFrequentlyBought(),
  ]);
  const product = productPayload.product;
  const relatedProducts = productPayload.relatedProducts;

  return (
    <Fragment>
      <ProductIntro
        id={product.id}
        price={product.price}
        title={product.title}
        images={product.images || []}
        brand={product.brand}
        oldPrice={product.oldPrice}
        availabilityLabel={product.availabilityLabel}
        labels={product.labels}
        slug={product.slug || slug}
      />

      <ProductView
        product={product}
        shops={shops}
        relatedProducts={relatedProducts}
        frequentlyBought={
          productPayload.recommendedProducts.length
            ? productPayload.recommendedProducts
            : frequentlyBought
        }
      />
    </Fragment>
  );
}
