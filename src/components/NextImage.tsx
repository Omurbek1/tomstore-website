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

function NextImage({
  src,
  fallbackSrc = PLACEHOLDER_IMAGE,
  onError,
  unoptimized = false,
  optimizedWidth: _optimizedWidth,
  quality = 80,
  ...props
}: NextImageProps) {
  const originalSrc = src || fallbackSrc;
  const initialSrc = originalSrc;
  const [currentSrc, setCurrentSrc] = useState(initialSrc);

  useEffect(() => {
    setCurrentSrc(originalSrc);
  }, [originalSrc]);

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
