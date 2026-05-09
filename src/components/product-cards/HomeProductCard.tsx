"use client";

import styled from "styled-components";
import { Link } from "@i18n/navigation";
import { calculateDiscount, currency } from "@utils/utils";
import NextImage from "@component/NextImage";

type HomeProductCardProps = {
  slug: string;
  title: string;
  price: number;
  imgUrl: string;
  discount?: number;
  priority?: boolean;
  compact?: boolean;
  sizes?: string;
};

const PRODUCT_IMAGE_FALLBACK = "/assets/images/products/iphone-xi.png";

export default function HomeProductCard({
  slug,
  title,
  price,
  imgUrl,
  discount,
  priority = false,
  compact = false,
  sizes,
}: HomeProductCardProps) {
  const imageSrc = imgUrl || PRODUCT_IMAGE_FALLBACK;

  return (
    <CardRoot href={`/product/${slug}`} $compact={compact}>
      <ImageWrap $compact={compact}>
        <NextImage
          src={imageSrc}
          alt={title}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          quality={80}
          sizes={sizes ?? (compact
            ? "(max-width: 960px) 25vw, 140px"
            : "(max-width: 500px) 100vw, (max-width: 650px) 50vw, (max-width: 960px) 33vw, 277px"
          )}
          fallbackSrc={PRODUCT_IMAGE_FALLBACK}
          style={{ objectFit: "contain" }}
        />
      </ImageWrap>

      <Title title={title}>{title}</Title>

      <Price>{calculateDiscount(price, discount || 0, "ru") || currency(price, 0, "ru")}</Price>
    </CardRoot>
  );
}

const CardRoot = styled(Link)<{ $compact: boolean }>`
  display: flex;
  min-width: 0;
  height: 100%;
  color: inherit;
  border-radius: 8px;
  padding: ${({ $compact }) => ($compact ? "0" : "1rem")};
  flex-direction: column;
  background: ${({ theme, $compact }) =>
    $compact ? "transparent" : theme?.colors?.body?.paper || "#FFFFFF"};
  box-shadow: ${({ theme, $compact }) =>
    $compact ? "none" : theme?.shadows?.small || "0 1px 3px rgba(3, 0, 71, 0.09)"};
  text-decoration: none;
`;

const ImageWrap = styled.div<{ $compact: boolean }>`
  width: 100%;
  position: relative;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  margin-bottom: ${({ $compact }) => ($compact ? "0.75rem" : "1rem")};
`;

const Title = styled.h3`
  margin: 0 0 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  display: -webkit-box;
  overflow: hidden;
  font-size: 14px;
  min-height: 2.8em;
  font-weight: 600;
  line-height: 1.4;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Price = styled.span`
  color: ${({ theme }) => theme?.colors?.primary?.main || "#C81E3A"};
  font-size: 14px;
  font-weight: 700;
`;
