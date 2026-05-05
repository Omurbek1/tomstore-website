import Box from "@component/Box";
import SearchResult from "./SearchResult";
import { getProducts } from "@utils/__api__/storefront";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ type?: string }>;
}

export default async function ProductSearchResult({ params, searchParams }: Props) {
  const { slug } = await params;
  const { type } = await searchParams;
  const decoded = decodeURIComponent(slug);

  const queryParam = type === "category"
    ? { category: decoded }
    : { q: decoded };

  const products = await getProducts({
    ...queryParam,
    pageSize: 48,
    sort: "popular",
  });

  return (
    <Box pt="20px">
      <SearchResult products={products} query={slug} searchType={type === "category" ? "category" : "text"} />
    </Box>
  );
}
