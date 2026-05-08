import type Product from "@models/product.model";

import { SITE_URL } from "@lib/siteUrl";

interface Props {
  product: Product;
  slug: string;
}

export default function ProductJsonLd({ product, slug }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.shortDescription || product.description || product.title,
    image: product.images?.length ? product.images : product.thumbnail ? [product.thumbnail] : [],
    sku: String(product.id),
    url: `${SITE_URL}/ru/product/${slug}`,
    ...(product.brand && {
      brand: { "@type": "Brand", name: product.brand },
    }),
    offers: {
      "@type": "Offer",
      priceCurrency: "KGS",
      price: product.price,
      availability: product.isInStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: "TomStore" },
      url: `${SITE_URL}/ru/product/${slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4",
      reviewCount: "1",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
