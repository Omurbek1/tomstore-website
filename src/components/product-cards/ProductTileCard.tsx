"use client";

import Link from "next/link";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import HoverBox from "@component/HoverBox";
import { H4 } from "@component/Typography";
import NextImage from "@component/NextImage";
import useCurrency from "@hook/useCurrency";
import { useLocale } from "next-intl";
import { usePrefetchStorefrontProduct } from "@hook/useStorefrontCatalog";

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
  const router = useRouter();
  const formatCurrency = useCurrency();
  const prefetchProductQuery = usePrefetchStorefrontProduct();
  const productHref = `/${locale}/product/${slug}`;

  const prefetchProduct = useCallback(() => {
    router.prefetch(productHref);
    prefetchProductQuery(slug);
  }, [prefetchProductQuery, productHref, router, slug]);

  return (
    <CardRoot
      href={productHref}
      onMouseEnter={prefetchProduct}
      onFocus={prefetchProduct}
    >
      <ImageBox borderRadius={8} mb="0.5rem" display="flex">
        <NextImage
          src={imgUrl}
          width={181}
          height={181}
          alt={title}
          sizes="(max-width: 480px) 50vw, (max-width: 960px) 33vw, 181px"
          style={{ objectFit: "contain" }}
        />
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
