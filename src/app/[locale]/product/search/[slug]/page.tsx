import Box from "@component/Box";
import SearchResult from "./SearchResult";
import { getProducts } from "@utils/__api__/storefront";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ type?: string }>;
}

export default async function ProductSearchResult({ params, searchParams }: Props) {
  const [{ slug }, { type }] = await Promise.all([params, searchParams]);
  const query = decodeURIComponent(slug);

  // Both text and category navigation now arrive as text queries.
  // "category" type is kept for potential future direct category URLs.
  const catalogParam = type === "category" ? { category: query } : { q: query };

  const products = await getProducts({ ...catalogParam, pageSize: 48, sort: "popular" });

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
