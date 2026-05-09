import Link from "next/link";
import styled from "styled-components";

import Box from "@component/Box";
import Rating from "@component/rating";
import FlexBox from "@component/FlexBox";
import NextImage from "@component/NextImage";
import { SemiSpan, Small } from "@component/Typography";
import { calculateDiscount, currency } from "@utils/utils";
import { useLocale } from "next-intl";

// STYLED COMPONENT
const StyledProductCard = styled.div`
  .image-holder {
    position: relative;
    :after {
      content: " ";
      position: absolute;
      transition: all 250ms ease-in-out;
    }
  }
  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:hover {
    .image-holder:after {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.07);
    }
  }
`;

// ===================================================
type ProductMiniListCardProps = {
  slug: string;
  off?: number;
  title: string;
  price: number;
  imgUrl: string;
  rating: number;
};
// ===================================================

export default function ProductMiniListCard(props: ProductMiniListCardProps) {
    const locale = useLocale();
  const { title, imgUrl, price, rating, slug, off = 0 } = props;

  return (
    <Link href={`/${locale}/product/${slug}`}>
      <StyledProductCard>
        <Box mb="1rem" className="image-holder">
          <NextImage src={imgUrl} width={150} height={150} alt="tomstore" />
        </Box>

        <Box mb="0.5rem">
          <Rating value={rating} outof={5} color="warn" readOnly />
        </Box>

        <SemiSpan
          className="ellipsis"
          mb="6px"
          title={title}
          color="text.primary"
          display="block"
          fontWeight="600"
        >
          {title}
        </SemiSpan>

        <FlexBox alignItems="center">
          <SemiSpan pr="0.3rem" fontWeight="600" color="primary.main" lineHeight="1">
            {calculateDiscount(price, off)}
          </SemiSpan>

          {!!off && (
            <Small color="text.muted" lineHeight="1">
              <del>{currency(price, 0)}</del>
            </Small>
          )}
        </FlexBox>
      </StyledProductCard>
    </Link>
  );
}
