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
  unoptimized = true,
  quality = 80,
  ...props
}: NextImageProps) {
  const initialSrc = src || fallbackSrc;
  const [currentSrc, setCurrentSrc] = useState(initialSrc);

  useEffect(() => {
    setCurrentSrc(src || fallbackSrc);
  }, [fallbackSrc, src]);

  return (
    <StyledImage
      {...props}
      src={currentSrc}
      unoptimized={unoptimized}
      quality={quality}
      onError={(event) => {
        if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
        onError?.(event);
      }}
    />
  );
}

export default NextImage;
