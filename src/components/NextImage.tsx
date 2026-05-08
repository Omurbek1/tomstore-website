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
const DEFAULT_REMOTE_IMAGE_WIDTH = 960;

const getSupabaseOptimizedUrl = (value: ImageProps["src"], width: number, quality = 80) => {
  if (typeof value !== "string") return value;
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
  const imageWidth =
    optimizedWidth ||
    (typeof props.width === "number" ? props.width * 2 : DEFAULT_REMOTE_IMAGE_WIDTH);
  const resolvedSrc = getSupabaseOptimizedUrl(src || fallbackSrc, imageWidth, Number(quality) || 80);
  const resolvedFallbackSrc = getSupabaseOptimizedUrl(
    fallbackSrc,
    imageWidth,
    Number(quality) || 80,
  );
  const initialSrc = resolvedSrc || resolvedFallbackSrc;
  const [currentSrc, setCurrentSrc] = useState(initialSrc);

  useEffect(() => {
    setCurrentSrc(resolvedSrc || resolvedFallbackSrc);
  }, [resolvedFallbackSrc, resolvedSrc]);

  return (
    <StyledImage
      {...props}
      src={currentSrc}
      unoptimized={unoptimized}
      quality={quality}
      onError={(event) => {
        if (currentSrc !== resolvedFallbackSrc) setCurrentSrc(resolvedFallbackSrc);
        onError?.(event);
      }}
    />
  );
}

export default NextImage;
