"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "@i18n/navigation";
import { calculateDiscount, currency } from "@utils/utils";
import { getOptimizedImageSrc } from "@utils/imageDelivery";

type HomeProductCardProps = {
  slug: string;
  title: string;
  price: number;
  imgUrl: string;
  discount?: number;
  priority?: boolean;
  compact?: boolean;
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
}: HomeProductCardProps) {
  const imageSrc = imgUrl || PRODUCT_IMAGE_FALLBACK;
  const optimizedImage = getOptimizedImageSrc(imageSrc, compact ? 240 : 560, 78);
  const [currentImage, setCurrentImage] = useState(optimizedImage || imageSrc);

  useEffect(() => {
    setCurrentImage(optimizedImage || imageSrc);
  }, [optimizedImage, imageSrc]);

  return (
    <CardRoot href={`/product/${slug}`} $compact={compact}>
      <ImageWrap $compact={compact}>
        <img
          src={currentImage}
          alt={title}
          width={compact ? 120 : 277}
          height={compact ? 120 : 270}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onError={() => {
            if (currentImage !== imageSrc) {
              setCurrentImage(imageSrc);
            } else if (currentImage !== PRODUCT_IMAGE_FALLBACK) {
              setCurrentImage(PRODUCT_IMAGE_FALLBACK);
            }
          }}
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
  color: ${({ theme }) => theme?.colors?.text?.secondary || "#373F50"};
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
