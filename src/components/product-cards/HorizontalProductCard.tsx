"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

import Box from "@component/Box";
import Rating from "@component/rating";
import NavLink from "@component/nav-link";
import { Paragraph } from "@component/Typography";
import { currency } from "@utils/utils";
import { useLocale } from "next-intl";

// STYLED COMPONENT
const StyledFlexBox = styled("div")({
  gap: "1rem",
  display: "flex",
  marginBottom: "1rem",
  alignItems: "center",
  "& a": { flexShrink: 0 },
  "& img": { transition: "0.3s" },
  "&:last-of-type": { marginBottom: 0 },
  "&:hover": { img: { transform: "scale(1.1)" } }
});

// ===========================================
type HorizontalProductCardProps = {
  slug: string;
  image: string;
  title: string;
  price: number;
  rating: number;
};
// ===========================================

export default function HorizontalProductCard({ image, title, price, slug, rating }: HorizontalProductCardProps) {
    const locale = useLocale();
  return (
    <StyledFlexBox>
      <Link href={`/${locale}/product/${slug}`}>
        <Box maxWidth={100} bg="gray.300">
          <Image
            width={200}
            height={200}
            alt={title}
            src={image}
            quality={80}
            sizes="100px"
            loading="lazy"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </Box>
      </Link>

      <div>
        <NavLink href={`/${locale}/product/${slug}`}>
          <Paragraph fontSize={16}>{title}</Paragraph>
        </NavLink>

        <Paragraph fontWeight={700} my={1}>
          {currency(price)}
        </Paragraph>

        <Rating value={rating} size="small" color="warn" />
      </div>
    </StyledFlexBox>
  );
}
