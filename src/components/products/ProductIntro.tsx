"use client";

import { useCallback, useState } from "react";
import { useParams } from "next/navigation";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

import Box from "@component/Box";
import Image from "@component/Image";
import Rating from "@component/rating";
import Avatar from "@component/avatar";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import { H1, H2, H3, H6, SemiSpan } from "@component/Typography";
import { useCartItemByIdOrSlug, useChangeCartAmount } from "@hook/useCart";
import useCurrency from "@hook/useCurrency";
import ProductShareButton from "./ProductShareButton";

// ========================================
interface Props {
  price: number;
  title: string;
  images: string[];
  id: string | number;
  brand?: string;
  oldPrice?: number | null;
  availabilityLabel?: string;
  labels?: string[];
  slug?: string;
}
// ========================================

export default function ProductIntro({
  images,
  title,
  price,
  id,
  brand,
  oldPrice,
  availabilityLabel,
  labels = [],
  slug,
}: Props) {
  const param = useParams();
  const t = useTranslations("product");
  const changeCartAmount = useChangeCartAmount();
  const formatCurrency = useCurrency();
  const [selectedImage, setSelectedImage] = useState(0);

  const routerId = param.slug as string;
  const cartItem = useCartItemByIdOrSlug(id, routerId);
  const shareSlug = slug || routerId;
  const shareText = `${title}. ${formatCurrency(price)}`;

  const handleImageClick = useCallback((ind: number) => () => setSelectedImage(ind), []);

  const handleCartAmountChange = useCallback(
    (amount: number) => () => {
      changeCartAmount({
        id,
        price,
        qty: amount,
        name: title,
        imgUrl: images[0],
      });
    },
    [changeCartAmount, id, images, price, title]
  );

  return (
    <Box overflow="hidden">
      <Grid container justifyContent="center" alignItems="center" spacing={16}>
        <Grid item md={6} xs={12} alignItems="center">
          <div>
            <FlexBox mb="50px" overflow="hidden" borderRadius={16} justifyContent="center">
              <Image
                width={300}
                height={300}
                src={images[selectedImage]}
                style={{ display: "block", width: "100%", height: "auto" }}
              />
            </FlexBox>

            <FlexBox overflow="auto">
              {images.map((url, ind) => (
                <Box
                  key={ind}
                  size={70}
                  bg="white"
                  minWidth={70}
                  display="flex"
                  cursor="pointer"
                  border="1px solid"
                  borderRadius="10px"
                  alignItems="center"
                  justifyContent="center"
                  ml={ind === 0 ? "auto" : ""}
                  mr={ind === images.length - 1 ? "auto" : "10px"}
                  borderColor={selectedImage === ind ? "primary.main" : "gray.400"}
                  onClick={handleImageClick(ind)}>
                  <Avatar src={url} borderRadius="10px" size={65} />
                </Box>
              ))}
            </FlexBox>
          </div>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb="1rem">{title}</H1>

          <FlexBox alignItems="center" mb="1rem">
            <SemiSpan>{t("brand")}:</SemiSpan>
            <H6 ml="8px">{brand || "TOMSTORE"}</H6>
          </FlexBox>

          <FlexBox alignItems="center" mb="1rem">
            <SemiSpan>{t("rated")}:</SemiSpan>
            <Box ml="8px" mr="8px">
              <Rating color="warn" value={4} outof={5} />
            </Box>
            <H6>(50)</H6>
          </FlexBox>

          <Box mb="24px">
            <H2 color="primary.main" mb="4px" lineHeight="1">
              {formatCurrency(price)}
            </H2>
            {oldPrice && oldPrice > price ? (
              <SemiSpan color="text.muted">
                <del>{formatCurrency(oldPrice)}</del>
              </SemiSpan>
            ) : null}

            <SemiSpan color="inherit">
              {availabilityLabel || t("stockAvailable")}
            </SemiSpan>
            {labels.length ? (
              <SemiSpan display="block" color="primary.main" mt="0.5rem">
                {labels
                  .map((label) =>
                    label === "sale"
                      ? "Распродажа"
                      : label === "hit"
                        ? "Хит"
                        : label === "new"
                          ? "Новинка"
                          : label,
                  )
                  .join(" / ")}
              </SemiSpan>
            ) : null}
          </Box>

          <FlexBox alignItems="center" flexWrap="wrap" mb="36px" style={{ gap: 12 }}>
            {!cartItem?.qty ? (
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={handleCartAmountChange(1)}>
                {t("addToCart")}
              </Button>
            ) : (
              <FlexBox alignItems="center">
                <Button
                  p="9px"
                  size="small"
                  color="primary"
                  variant="outlined"
                  onClick={handleCartAmountChange(cartItem?.qty - 1)}>
                  <IconMinus size={22} />
                </Button>

                <H3 fontWeight="600" mx="20px">
                  {cartItem?.qty.toString().padStart(2, "0")}
                </H3>

                <Button
                  p="9px"
                  size="small"
                  color="primary"
                  variant="outlined"
                  onClick={handleCartAmountChange(cartItem?.qty + 1)}>
                  <IconPlus size={22} />
                </Button>
              </FlexBox>
            )}

            <ProductShareButton title={title} text={shareText} slug={shareSlug} />
          </FlexBox>
        </Grid>
      </Grid>
    </Box>
  );
}
