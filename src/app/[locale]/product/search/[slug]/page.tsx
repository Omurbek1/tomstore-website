import type { Metadata } from "next";
import Box from "@component/Box";
import SearchResult from "./SearchResult";
import { getProducts } from "@utils/__api__/storefront";
import { buildFallbackMetadata } from "@lib/seoMetadata";

interface Props {
  params: Promise<{ locale?: string; slug: string }>;
  searchParams: Promise<{ type?: string }>;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const [{ locale = "ru", slug }, { type }] = await Promise.all([params, searchParams]);
  const query = decodeURIComponent(slug);
  const isCategory = type === "category";
  const title = isCategory ? `${query} — каталог TomStore` : `${query} — поиск TomStore`;
  const description = isCategory
    ? `Каталог ${query} в TomStore. Электроника с доставкой по Кыргызстану, гарантией и рассрочкой.`
    : `Результаты поиска TomStore по запросу ${query}. Ноутбуки, принтеры, ПК, мониторы и другая электроника с доставкой по Кыргызстану.`;

  return buildFallbackMetadata({
    locale,
    path: `/product/search/${slug}`,
    title,
    description,
  });
}

export default async function ProductSearchResult({ params, searchParams }: Props) {
  const [{ slug }, { type }] = await Promise.all([params, searchParams]);
  const query = decodeURIComponent(slug);

  // Both text and category navigation now arrive as text queries.
  // "category" type is kept for potential future direct category URLs.
  const catalogParam = type === "category" ? { category: query } : { q: query };

  const products = await getProducts({ ...catalogParam, pageSize: 24, sort: "popular" });

  return (
    <Box pt="20px">
      <SearchResult
        products={products}
        query={slug}
        searchType={type === "category" ? "category" : "text"}
      />
    </Box>
  );
}
