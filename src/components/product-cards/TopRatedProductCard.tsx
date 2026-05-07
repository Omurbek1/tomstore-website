"use client";

import styled from "styled-components";
import Rating from "@component/rating";
import FlexBox from "@component/FlexBox";
import HoverBox from "@component/HoverBox";
import NextImage from "@component/NextImage";
import { H4, Small } from "@component/Typography";
import useCurrency from "@hook/useCurrency";

// =======================================================
type TopRatedProductCardProps = {
  title: string;
  price: number;
  rating: number;
  imgUrl: string;
  reviewCount: number;
};
// =======================================================

export default function TopRatedProductCard(props: TopRatedProductCardProps) {
  const { imgUrl, rating, title, price, reviewCount } = props;
  const formatCurrency = useCurrency();

  return (
    <CardRoot>
      <ImageBox mb="1rem" mx="auto" borderRadius={8} display="flex">
        <NextImage src={imgUrl} width={100} height={100} alt={title} />
      </ImageBox>

      <FlexBox justifyContent="center" alignItems="center" mb="0.25rem">
        <Rating value={rating} color="warn" size="small" />
        <Small fontWeight="600" pl="0.25rem">
          ({reviewCount})
        </Small>
      </FlexBox>

      <H4
        fontWeight="600"
        fontSize="14px"
        textAlign="center"
        mb="0.25rem"
        title={title}
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          minHeight: "2.8em",
        }}
      >
        {title}
      </H4>

      <H4 fontWeight="600" fontSize="14px" textAlign="center" color="primary.main">
        {formatCurrency(price)}
      </H4>
    </CardRoot>
  );
}

const CardRoot = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ImageBox = styled(HoverBox)`
  flex: 0 0 auto;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
