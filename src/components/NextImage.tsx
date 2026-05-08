"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { space, SpaceProps, compose, borderRadius, BorderRadiusProps } from "styled-system";

// ==============================================================
type NextImageProps = ImageProps &
  SpaceProps &
  BorderRadiusProps & {
    fallbackSrc?: ImageProps["src"];
    optimizedWidth?: number;
  };
// ==============================================================

const PLACEHOLDER_IMAGE = "/assets/images/products/iphone-xi.png";
const StyledImage = styled(Image)<NextImageProps>(
  ({ fill }) => (fill ? {} : { width: "100%", height: "auto" }),
  compose(space, borderRadius)
);

function isProxiedPath(src: ImageProps["src"]): boolean {
  return typeof src === "string" && src.startsWith("/api/");
}

function NextImage({
  src,
  fallbackSrc = PLACEHOLDER_IMAGE,
  onError,
  unoptimized,
  optimizedWidth: _optimizedWidth,
  quality = 80,
  ...props
}: NextImageProps) {
  const originalSrc = src || fallbackSrc;
  const [currentSrc, setCurrentSrc] = useState(originalSrc);

  useEffect(() => {
    setCurrentSrc(originalSrc);
  }, [originalSrc]);

  // Proxied backend paths (/api/uploads/…) can't be self-fetched by Next.js
  // image optimization in production — bypass the optimizer for those only.
  const resolvedUnoptimized = unoptimized ?? isProxiedPath(currentSrc);

  return (
    <StyledImage
      {...props}
      src={currentSrc}
      unoptimized={resolvedUnoptimized}
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
