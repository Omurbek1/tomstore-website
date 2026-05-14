"use client";

import { CSSProperties, ReactNode } from "react";
import { BorderProps, ColorProps, SpaceProps, LayoutProps } from "styled-system";
// STYLED COMPONENT
import StyledAvatar from "./styles";
import NextImage from "@component/NextImage";

// ==============================================================
export interface BaseAvatarProps extends BorderProps, ColorProps, SpaceProps, LayoutProps {
  size?: number;
}

export interface AvatarProps extends BaseAvatarProps {
  src?: string;
  alt?: string;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
}
// ==============================================================

export default function Avatar({
  src,
  children,
  className,
  size = 48,
  alt = "avatar",
  ...props
}: AvatarProps) {
  const showImg = Boolean(src);

  return (
    <StyledAvatar size={size} {...props}>
      {showImg && (
        <NextImage
          src={src || "/assets/images/products/iphone-xi.webp"}
          alt={alt}
          fill
          sizes={`${size}px`}
          fallbackSrc="/assets/images/products/iphone-xi.webp"
          style={{ objectFit: "cover" }}
        />
      )}
      {!showImg && children && <span>{children}</span>}
    </StyledAvatar>
  );
}
