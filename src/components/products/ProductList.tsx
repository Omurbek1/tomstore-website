import { Fragment } from "react";

import FlexBox from "@component/FlexBox";
import Pagination from "@component/pagination";
import { SemiSpan } from "@component/Typography";
import { ProductListCard } from "@component/product-cards";
import Product from "@models/product.model";
import { useTranslations } from "next-intl";

// ==========================================================
interface Props {
  products: Product[];
}
// ==========================================================

export default function ProductListView({ products }: Props) {
  const t = useTranslations("common");

  return (
    <Fragment>
      {products.map((item) => (
        <ProductListCard
          mb="1.25rem"
          id={item.id}
          key={item.id}
          slug={item.slug}
          price={item.price}
          title={item.title}
          off={item.discount}
          rating={item.rating}
          images={item.images??[]}
          imgUrl={item.thumbnail}
          categories={item.categories}
        />
      ))}

      <FlexBox flexWrap="wrap" justifyContent="space-between" alignItems="center" mt="32px">
        <SemiSpan>{t("productsShown", { count: products.length })}</SemiSpan>
        <Pagination pageCount={10} />
      </FlexBox>
    </Fragment>
  );
}
