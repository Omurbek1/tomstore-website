import type Product from "@models/product.model";
import { SITE_URL } from "@lib/siteUrl";

interface Props {
  product: Product;
  slug: string;
  locale?: string;
}

export default function ProductJsonLd({ product, slug, locale = "ru" }: Props) {
  const productUrl = `${SITE_URL}/${locale}/product/${slug}`;
  const images = product.images?.length
    ? product.images
    : product.thumbnail
    ? [product.thumbnail]
    : [];

  const priceValidUntil = new Date();
  priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": productUrl,
    name: product.title,
    description:
      product.shortDescription ||
      product.description ||
      `${product.title} — купить в Бишкеке с доставкой по Кыргызстану. TomStore.`,
    image: images,
    sku: String(product.id),
    url: productUrl,
    ...(product.brand && {
      brand: { "@type": "Brand", name: product.brand },
    }),
    itemCondition: "https://schema.org/NewCondition",
    offers: {
      "@type": "Offer",
      priceCurrency: locale === "en" ? "USD" : "KGS",
      price: product.price,
      priceValidUntil: priceValidUntil.toISOString().split("T")[0],
      availability: product.isInStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "TomStore",
        url: SITE_URL,
      },
      url: productUrl,
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "KGS",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "KG",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 4,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "KG",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnInStore",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
    ...(product.rating && product.rating > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount || 1,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
