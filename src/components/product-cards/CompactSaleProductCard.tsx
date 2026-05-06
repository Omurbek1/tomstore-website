import Link from "next/link";

import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import HoverBox from "@component/HoverBox";
import NextImage from "@component/NextImage";
import { H6, SemiSpan } from "@component/Typography";
import { calculateDiscount, currency } from "@utils/utils";
import { useLocale } from "next-intl";

// ==============================================================
type CompactSaleProductCardProps = {
  id: string;
  off: number;
  slug: string;
  price: number;
  title: string;
  imgUrl: string;
  [key: string]: unknown;
};
// ==============================================================

export default function CompactSaleProductCard({
  id,
  off,
  slug,
  price,
  title,
  imgUrl,
  ...props
}: CompactSaleProductCardProps) {
    const locale = useLocale();
    
  return (
    <Card p="1rem" borderRadius={12} {...props}>
      <Link href={`/${locale}/product/${slug}`}>
        <HoverBox mb="0.75rem" borderRadius={8} overflow="hidden">
          <NextImage
            src={imgUrl || "/assets/images/products/Rectangle 116.png"}
            width={500}
            height={500}
            alt="tomstore"
          />
        </HoverBox>

        <SemiSpan title={title} mb="0.25rem" color="inherit" ellipsis display="block">
          {title}
        </SemiSpan>

        <FlexBox alignItems="center">
          <H6 color="primary.main" mr="0.25rem">
            {calculateDiscount(price, off)}
          </H6>

          <SemiSpan>
            <del>{currency(price)}</del>
          </SemiSpan>
        </FlexBox>
      </Link>
    </Card>
  );
}
