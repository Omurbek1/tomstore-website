"use client";

import Link from "next/link";
import styled from "styled-components";
import HoverBox from "@component/HoverBox";
import { H4 } from "@component/Typography";
import NextImage from "@component/NextImage";
import useCurrency from "@hook/useCurrency";
import { useLocale } from "next-intl";

// ========================================================
interface ProductTileCardProps {
  slug: string;
  title: string;
  price: number;
  imgUrl: string;
}
// ========================================================

export default function ProductTileCard({ imgUrl, title, price, slug }: ProductTileCardProps) {
  const locale = useLocale();
  const formatCurrency = useCurrency();
  return (
    <CardRoot href={`/${locale}/product/${slug}`}>
      <ImageBox borderRadius={8} mb="0.5rem" display="flex">
        <NextImage src={imgUrl} width={181} height={181} alt={title} />
      </ImageBox>

      <H4
        fontWeight="600"
        fontSize="14px"
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

      <H4 fontWeight="600" fontSize="14px" color="primary.main">
        {formatCurrency(price)}
      </H4>
    </CardRoot>
  );
}

const CardRoot = styled(Link)`
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
