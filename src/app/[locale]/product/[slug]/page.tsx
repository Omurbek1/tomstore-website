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
    const name = product.title;
    const url = `${SITE_URL}/${locale}/product/${slug}`;
    const image = product.thumbnail;

    // Цена в title (RU): «{название} — купить в Бишкеке за {цена} сом».
    // Без суффикса «| TomStore» — его добавит шаблон title из layout (%s | TomStore).
    const priceTitle =
      product.price && locale === "ru"
        ? ` за ${product.price.toLocaleString("ru")} сом`
        : "";

    const title =
      locale === "en"
        ? `Buy ${name} in Bishkek`
        : locale === "ky"
        ? `${name} сатып алуу Бишкекте`
        : `${name} — купить в Бишкеке${priceTitle}`;

    const priceStr =
      product.price && locale !== "en"
        ? ` Цена ${product.price.toLocaleString("ru")} сом.`
        : "";

    const description =
      locale === "en"
        ? `${name} — buy in Kyrgyzstan with delivery nationwide. Warranty, installment plans. TomStore.kg`
        : locale === "ky"
        ? `${name} — Кыргызстанда сатып алуу. Кепилдик, бөлүп төлөө, бүтүндөй өлкөгө жеткирүү. TomStore.kg`
        : product.shortDescription ||
          `${name} цена в Кыргызстане.${priceStr} Доставка по Кыргызстану, рассрочка, гарантия. Купить в TomStore.kg`;

    return {
      title,
      description,
      alternates: {
        canonical: url,
        languages: {
          ru: `${SITE_URL}/ru/product/${slug}`,
          en: `${SITE_URL}/en/product/${slug}`,
          ky: `${SITE_URL}/ky/product/${slug}`,
          "x-default": `${SITE_URL}/ru/product/${slug}`,
        },
      },
      openGraph: {
        title,
        description,
        url,
        type: "website",
        images: image ? [{ url: image, alt: name, width: 800, height: 600 }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: image ? [image] : [],
      },
    };
  } catch {
    return buildFallbackMetadata({
      locale,
      path: `/product/${slug}`,
      title:
        locale === "en"
          ? "Buy Electronics in Bishkek"
          : "Купить электронику в Бишкеке",
      description:
        locale === "en"
          ? "Buy electronics at TomStore with delivery across Kyrgyzstan. Laptops, printers, PCs, monitors. Warranty and installment."
          : "Купить электронику в TomStore с доставкой по Кыргызстану. Ноутбуки, принтеры, ПК, мониторы, гарантия и рассрочка.",
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
      <ProductJsonLd product={product} slug={slug} locale={locale} />
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
