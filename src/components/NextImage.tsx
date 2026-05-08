"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { space, SpaceProps, compose, borderRadius, BorderRadiusProps } from "styled-system";
import { getOptimizedImageSrc } from "@utils/imageDelivery";

// ==============================================================
type NextImageProps = ImageProps &
  SpaceProps &
  BorderRadiusProps & {
    fallbackSrc?: ImageProps["src"];
    optimizedWidth?: number;
  };
// ==============================================================

const PLACEHOLDER_IMAGE = "/assets/images/products/iphone-xi.png";
const DEFAULT_REMOTE_IMAGE_WIDTH = 960;
const StyledImage = styled(Image)<NextImageProps>(
  ({ fill }) => (fill ? {} : { width: "100%", height: "auto" }),
  compose(space, borderRadius)
);

function NextImage({
  src,
  fallbackSrc = PLACEHOLDER_IMAGE,
  onError,
  unoptimized = true,
  optimizedWidth,
  quality = 80,
  ...props
}: NextImageProps) {
  const originalSrc = src || fallbackSrc;
  const imageWidth =
    optimizedWidth ||
    (typeof props.width === "number" ? props.width * 2 : DEFAULT_REMOTE_IMAGE_WIDTH);
  const optimizedSrc =
    typeof originalSrc === "string"
      ? getOptimizedImageSrc(originalSrc, imageWidth, Number(quality) || 80)
      : originalSrc;
  const initialSrc = optimizedSrc || originalSrc;
  const [currentSrc, setCurrentSrc] = useState(initialSrc);

  useEffect(() => {
    setCurrentSrc(optimizedSrc || originalSrc);
  }, [optimizedSrc, originalSrc]);

  return (
    <StyledImage
      {...props}
      src={currentSrc}
      unoptimized={unoptimized}
      quality={quality}
      onError={(event) => {
        if (currentSrc !== originalSrc) setCurrentSrc(originalSrc);
        else if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
        onError?.(event);
      }}
    />
  );
}

export default NextImage;
