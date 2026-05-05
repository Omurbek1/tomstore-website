import Box from "@component/Box";
import SearchResult from "./SearchResult";
import { getProducts } from "@utils/__api__/storefront";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductSearchResult({ params }: Props) {
  const { slug } = await params;
  const products = await getProducts({
    category: slug,
    pageSize: 48,
    sort: "popular",
  });

  return (
    <Box pt="20px">
      <SearchResult products={products} query={slug} />
    </Box>
  );
}
