import type { Metadata } from "next";
import { notFound } from "next/navigation";
import api from "@utils/__api__/products";
import {
  getProductBySlug,
  getProductSlugs,
  getSafeProductBySlug,
} from "@utils/__api__/storefront";
import ProductPageClient from "@component/products/ProductPageClient";
import ProductJsonLd from "@component/seo/ProductJsonLd";
import Breadcrumbs from "@component/seo/Breadcrumbs";
import { categoryNameToCatalogPath } from "@utils/categoryPath";
import { buildFallbackMetadata } from "@lib/seoMetadata";

export const revalidate = 60;

import { SITE_URL } from "@lib/siteUrl";

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
  params: Promise<{ slug: string; locale?: string }>;
}
// ==============================================================

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale = "ru" } = await params;
  try {
    const { product } = await getProductBySlug(slug);
    const title = product.title;
    const description =
      product.shortDescription ||
      product.description ||
      `${title} — купить в Бишкеке с доставкой. Гарантия, рассрочка. TomStore.`;
    const image = product.thumbnail;
    const url = `${SITE_URL}/${locale}/product/${slug}`;

    return {
      title,
      description,
      alternates: {
        canonical: url,
        languages: {
          ru: `${SITE_URL}/ru/product/${slug}`,
          en: `${SITE_URL}/en/product/${slug}`,
          ky: `${SITE_URL}/ky/product/${slug}`,
        },
      },
      openGraph: {
        title,
        description,
        url,
        type: "website",
        images: image ? [{ url: image, alt: title }] : [],
      },
    };
  } catch {
    return buildFallbackMetadata({
      locale,
      path: `/product/${slug}`,
      title: "Товар TomStore",
      description:
        "Купить электронику в TomStore с доставкой по Кыргызстану. Ноутбуки, принтеры, ПК, мониторы, гарантия и рассрочка.",
    });
  }
}

export default async function ProductDetails({ params }: Props) {
  const { slug, locale = "ru" } = await params;

  const [productPayload, shops, frequentlyBought] = await Promise.all([
    getSafeProductBySlug(slug),
    api.getAvailableShop(),
    api.getFrequentlyBought(),
  ]);

  if (!productPayload) {
    notFound();
  }

  const product = productPayload.product;
  const homeLabel = locale === "en" ? "Home" : locale === "ky" ? "Башкы бет" : "Главная";
  const catalogLabel = locale === "en" ? "Catalog" : "Каталог";
  const category = product.categories?.[0];
  const breadcrumbs = [
    { label: homeLabel, href: "/" },
    { label: catalogLabel, href: "/catalog" },
    ...(category ? [{ label: category, href: categoryNameToCatalogPath(category) }] : []),
    { label: product.title },
  ];

  return (
    <>
      <ProductJsonLd product={product} slug={slug} />
      <Breadcrumbs items={breadcrumbs} locale={locale} />
      <ProductPageClient
        product={product}
        shops={shops}
        relatedProducts={productPayload.relatedProducts}
        frequentlyBought={
          productPayload.recommendedProducts.length
            ? productPayload.recommendedProducts
            : frequentlyBought
        }
      />
    </>
  );
}
