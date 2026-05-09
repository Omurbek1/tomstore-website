"use client";

import Link from "next/link";
import { useState, Fragment, useCallback } from "react";
import { IconEye, IconHeart, IconHeartFilled } from "@tabler/icons-react";
import styled, { useTheme } from "styled-components";

import Box from "@component/Box";
import Rating from "@component/rating";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import NextImage from "@component/NextImage";
import { IconButton } from "@component/buttons";
import Typography, { Paragraph, Small } from "@component/Typography";
import ProductQuickView from "@component/products/ProductQuickView";
import { useCartItemBySlug, useChangeCartAmount } from "@hook/useCart";
import { currency } from "@utils/utils";
import { useLocale } from "next-intl";

// styled components
const CardBox = styled(Box)(({ theme }) => ({
  borderRadius: "3px",
  transition: "all 0.3s",
  backgroundColor: theme.colors.body.paper,
  border: `1px solid ${theme.colors.gray[300]}`,
  "&:hover": {
    border: `1px solid ${theme.colors.gray[700]}`,
    "& .product-actions": { right: 5 },
    "& .product-img": { transform: "scale(1.1)" }
  },
}));

const CardMedia = styled(Box)({
  width: "100%",
  maxHeight: 300,
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  "& .product-img": { transition: "0.3s" }
});

const EyeButton = styled(IconButton)({
  top: 10,
  right: -40,
  position: "absolute",
  transition: "right 0.3s .1s",
  background: "transparent"
});

const FavoriteButton = styled(IconButton)({
  top: 45,
  right: -40,
  position: "absolute",
  background: "transparent",
  transition: "right 0.3s .2s"
});

// ==============================================================
type ProductMediaActionCardProps = {
  img: string;
  name: string;
  slug: string;
  price: number;
  reviews: number;
  images: string[];
  id: string | number;
};
// ==============================================================

export default function ProductMediaActionCard({
  id,
  img,
  name,
  slug,
  price,
  images,
  reviews
}: ProductMediaActionCardProps) {
    const locale = useLocale();
  const theme = useTheme();
  const changeCartAmount = useChangeCartAmount();
  const [openDialog, setOpenDialog] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const cartItem = useCartItemBySlug(slug);

  const handleFavorite = useCallback(() => setIsFavorite((fav) => !fav), []);

  const toggleDialog = useCallback(() => setOpenDialog((state) => !state), []);

  const handleAddToCart = useCallback(() => {
    const payload = {
      id,
      slug,
      name,
      price,
      imgUrl: img,
      qty: (cartItem?.qty || 0) + 1
    };

    changeCartAmount(payload);
  }, [changeCartAmount, id, img, name, price, slug, cartItem?.qty]);

  return (
    <Fragment>
      <CardBox height="100%">
        <CardMedia>
          <Link href={`/${locale}/product/${slug}`}>
            <NextImage src={img} width={300} height={300} alt="category" className="product-img" />
          </Link>

          <EyeButton
            className="product-actions"
            onClick={() => setOpenDialog(true)}
            aria-label={`Quick view ${name}`}
            title={`Quick view ${name}`}
          >
            <IconEye size={18} color={theme.colors.gray[500]} />
          </EyeButton>

          <FavoriteButton
            className="product-actions"
            onClick={handleFavorite}
            aria-label={isFavorite ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
            title={isFavorite ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
          >
            {isFavorite ? (
              <IconHeartFilled size={18} color={theme.colors.gray[500]} />
            ) : (
              <IconHeart size={18} color={theme.colors.gray[500]} />
            )}
          </FavoriteButton>
        </CardMedia>

        <Box p={2} textAlign="center">
          <Paragraph>{name}</Paragraph>
          <Typography as="span" display="block" fontWeight={700} py=".5rem">
            {currency(price)}
          </Typography>

          <FlexBox justifyContent="center" alignItems="center" mb="1rem">
            <Rating value={4} color="warn" size="small" />
            <Small fontWeight={600} color="gray.500" ml=".3rem">
              ({reviews})
            </Small>
          </FlexBox>

          <Button fullWidth color="dark" variant="outlined" onClick={handleAddToCart}>
            Add To Cart
          </Button>
        </Box>
      </CardBox>

      {/* QUICK VIEW MODAL */}
      <ProductQuickView
        open={openDialog}
        onClose={toggleDialog}
        product={{ id, images, price, slug, title: name }}
      />
    </Fragment>
  );
}
