import type Product from "@models/product.model";
import { SITE_URL } from "@lib/siteUrl";
import { resolveStoreName } from "@lib/storeBrand";
import { getStorefrontConfig } from "@utils/__api__/storefront";

interface Props {
  product: Product;
  slug: string;
  locale?: string;
}

export default async function ProductJsonLd({ product, slug, locale = "ru" }: Props) {
  // Продавец — компания этого сайта (config по хосту деплоя), не всегда TomStore.
  const config = await getStorefrontConfig().catch(() => null);
  const storeName = resolveStoreName(config?.companyName);
  const productUrl = `${SITE_URL}/${locale}/product/${slug}`;
  const images = product.images?.length
    ? product.images
    : product.thumbnail
    ? [product.thumbnail]
    : [];

  const priceValidUntil = new Date();
  priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);

  // Offer — цена магазина по умолчанию (её же видит посетитель без выбора
  // магазина). Если по магазинам цены разные — добавляем AggregateOffer
  // с диапазоном low/high. Валюта всегда KGS (конвертации нет).
  const range = product.priceRange;
  const branchCount = product.branchPrices?.length || 0;
  const aggregateOffer =
    range && range.low > 0 && range.high > range.low
      ? {
          "@type": "AggregateOffer",
          priceCurrency: "KGS",
          lowPrice: range.low,
          highPrice: range.high,
          ...(branchCount > 0 ? { offerCount: branchCount } : {}),
          availability: product.isInStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          url: productUrl,
        }
      : null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": productUrl,
    name: product.title,
    description:
      product.shortDescription ||
      product.description ||
      `${product.title} — купить в Бишкеке с доставкой по Кыргызстану. ${storeName}.`,
    image: images,
    sku: String(product.id),
    url: productUrl,
    ...(product.brand && {
      brand: { "@type": "Brand", name: product.brand },
    }),
    itemCondition: "https://schema.org/NewCondition",
    offers: [
      {
        "@type": "Offer",
        priceCurrency: "KGS",
        price: product.price,
        priceValidUntil: priceValidUntil.toISOString().split("T")[0],
        availability: product.isInStock
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        itemCondition: "https://schema.org/NewCondition",
        seller: {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: storeName,
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
      ...(aggregateOffer ? [aggregateOffer] : []),
    ],
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
