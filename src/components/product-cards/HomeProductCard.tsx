"use client";

import styled from "styled-components";
import { Link } from "@i18n/navigation";
import { calculateDiscount, currency } from "@utils/utils";

type HomeProductCardProps = {
  slug: string;
  title: string;
  price: number;
  imgUrl: string;
  discount?: number;
  priority?: boolean;
  compact?: boolean;
};

const optimizeSupabaseImageUrl = (value: string, width: number, quality = 80) => {
  if (!value.includes(".supabase.co/storage/v1/object/public/")) return value;

  try {
    const url = new URL(value);
    url.pathname = url.pathname.replace(
      "/storage/v1/object/public/",
      "/storage/v1/render/image/public/",
    );
    url.searchParams.set("width", String(width));
    url.searchParams.set("quality", String(quality));
    url.searchParams.set("resize", "contain");
    return url.toString();
  } catch {
    return value;
  }
};

export default function HomeProductCard({
  slug,
  title,
  price,
  imgUrl,
  discount,
  priority = false,
  compact = false,
}: HomeProductCardProps) {
  const imageWidth = compact ? 240 : 560;
  const imageSrc = optimizeSupabaseImageUrl(
    imgUrl || "/assets/images/products/iphone-xi.png",
    imageWidth,
  );

  return (
    <CardRoot href={`/product/${slug}`} $compact={compact}>
      <ImageWrap $compact={compact}>
        <img
          src={imageSrc}
          alt={title}
          width={compact ? 120 : 277}
          height={compact ? 120 : 270}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
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
  background: ${({ theme, $compact }) => ($compact ? "transparent" : theme.colors.body.paper)};
  box-shadow: ${({ theme, $compact }) => ($compact ? "none" : theme.shadows.small)};
  text-decoration: none;
`;

const ImageWrap = styled.div<{ $compact: boolean }>`
  width: 100%;
  display: flex;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  align-items: center;
  border-radius: 8px;
  justify-content: center;
  margin-bottom: ${({ $compact }) => ($compact ? "0.75rem" : "1rem")};

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  }
`;

const Title = styled.h3`
  margin: 0 0 0.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
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
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: 14px;
  font-weight: 700;
`;
