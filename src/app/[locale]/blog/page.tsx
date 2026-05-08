import type { Metadata } from "next";
import { getBlogList } from "@utils/__api__/storefront";
import BlogPageClient from "./BlogPageClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tomstore.kg";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; category?: string; tag?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const isKy = locale === "ky";
  const url = `${SITE_URL}/${locale}/blog`;

  const title = isEn
    ? "Blog — TomStore"
    : isKy
    ? "Блог — TomStore"
    : "Блог — TomStore";

  const description = isEn
    ? "Tips on choosing electronics: laptops, printers, computers. Expert reviews and buying guides from TomStore Bishkek."
    : isKy
    ? "Электроника тандоо боюнча кеңештер: ноутбуктар, принтерлер, компьютерлер. TomStore Бишкектен эксперттик обзорлор."
    : "Советы по выбору электроники: ноутбуки, принтеры, компьютеры. Экспертные обзоры и руководства по покупке от TomStore Бишкек.";

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ru: `${SITE_URL}/ru/blog`,
        en: `${SITE_URL}/en/blog`,
        ky: `${SITE_URL}/ky/blog`,
      },
    },
    openGraph: { title, description, url, type: "website" },
  };
}

export default async function BlogPage({ params, searchParams }: Props) {
  const [{ locale }, sp] = await Promise.all([params, searchParams]);
  const data = await getBlogList({ q: sp.q, category: sp.category, tag: sp.tag });

  return (
    <BlogPageClient
      locale={locale}
      data={data}
      q={sp.q}
      category={sp.category}
      tag={sp.tag}
    />
  );
}
