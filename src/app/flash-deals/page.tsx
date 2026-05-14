// GLOBAL CUSTOM COMPONENTS
import FlexBox from "@component/FlexBox";
import { H1 } from "@component/Typography";
import Container from "@component/Container";
// PAGE SECTION COMPONENTS
import SaleNavbar from "@sections/flash-deals/SaleNavbar";
import SaleCategory from "@sections/flash-deals/SaleCategory";
import SaleProducts from "@sections/flash-deals/SaleProducts";

import { SearchParams } from "interfaces";
import { getProductPage } from "@utils/__api__/storefront";

const SALE_CATEGORY_LIST = [
  { icon: "women-dress", title: "Women" },
  { icon: "beauty-products", title: "Cosmetics" },
  { icon: "camera", title: "Electronics" },
  { icon: "sofa", title: "Furniture" }
];

const PAGE_SIZE = 28;

export default async function SalePage({ searchParams }: SearchParams) {
  const { page } = await searchParams;

  const PAGE = page ? Number(page) : 1;

  const data = await getProductPage(PAGE, PAGE_SIZE);

  return (
    <Container mt="2rem">
      <SaleNavbar categories={SALE_CATEGORY_LIST} />

      <div>
        <FlexBox mb="2rem" flexWrap="wrap">
          <H1 color="primary.main" mr="0.5rem" lineHeight="1">
            Flash Deals,
          </H1>

          <H1 color="text.muted" lineHeight="1">
            Enjoy Upto 80% discounts
          </H1>
        </FlexBox>

        <SaleCategory categories={SALE_CATEGORY_LIST} />
      </div>

      <SaleProducts products={data.result} meta={data.meta} />
    </Container>
  );
}
