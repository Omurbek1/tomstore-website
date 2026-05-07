import api from "@utils/__api__/products";
import { getProductBySlug, getProductSlugs } from "@utils/__api__/storefront";
import ProductPageClient from "@component/products/ProductPageClient";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const slugs = await getProductSlugs();
    return slugs.map(({ slug }) => ({ slug }));
  } catch {
    return [];
  }
}

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
