import api from "@utils/__api__/products";
import { getProductBySlug } from "@utils/__api__/storefront";
import ProductPageClient from "@component/products/ProductPageClient";

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

  return (
    <ProductPageClient
      product={productPayload.product}
      shops={shops}
      relatedProducts={productPayload.relatedProducts}
      frequentlyBought={
        productPayload.recommendedProducts.length
          ? productPayload.recommendedProducts
          : frequentlyBought
      }
    />
  );
}
