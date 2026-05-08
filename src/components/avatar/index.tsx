"use client";

import { CSSProperties, ReactNode, useState } from "react";
import Image from "next/image";
import { BorderProps, ColorProps, SpaceProps, LayoutProps } from "styled-system";
// STYLED COMPONENT
import StyledAvatar from "./styles";

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
  const [imgError, setImgError] = useState(false);
  const showImg = src && !imgError;

  return (
    <StyledAvatar size={size} {...props}>
      {showImg && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${size}px`}
          onError={() => setImgError(true)}
          style={{ objectFit: "cover" }}
        />
      )}
      {!showImg && children && <span>{children}</span>}
    </StyledAvatar>
  );
}
