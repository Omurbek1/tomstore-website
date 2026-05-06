"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
import { buildProductWhatsAppOrderUrl } from "@utils/whatsappOrder";
import Product, { ProductVariant } from "@models/product.model";
import ProductShareButton from "./ProductShareButton";
import ProductVariantSelector from "./ProductVariantSelector";

const EMPTY_VARIANTS: ProductVariant[] = [];

// ========================================
interface Props {
  product?: Product;
  price: number;
  title: string;
  images: string[];
  id: string | number;
  brand?: string;
  oldPrice?: number | null;
  availabilityLabel?: string;
  labels?: string[];
  slug?: string;
  variants?: ProductVariant[];
  onVariantChange?: (variant: ProductVariant | undefined) => void;
}
// ========================================

export default function ProductIntro({
  product,
  images,
  title,
  price,
  id,
  brand,
  oldPrice,
  availabilityLabel,
  labels = [],
  slug,
  variants: propVariants,
  onVariantChange,
}: Props) {
  const param = useParams();
  const t = useTranslations("product");
  const changeCartAmount = useChangeCartAmount();
  const formatCurrency = useCurrency();
  const [selectedImage, setSelectedImage] = useState(0);

  const variants = product?.variants?.length
    ? product.variants
    : propVariants || EMPTY_VARIANTS;
  const initialVariant = useMemo(
    () => variants.find((variant) => variant.inStock) || variants[0],
    [variants],
  );
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    initialVariant,
  );

  const handleSelectVariant = useCallback(
    (variant: ProductVariant) => {
      setSelectedVariant(variant);
      onVariantChange?.(variant);
    },
    [onVariantChange],
  );

  useEffect(() => {
    if (!variants.length) {
      setSelectedVariant(undefined);
      onVariantChange?.(undefined);
      return;
    }

    setSelectedVariant((current) => {
      const next =
        (current && variants.some((v) => v.id === current.id))
          ? current
          : variants.find((v) => v.inStock) || variants[0];
      onVariantChange?.(next);
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variants]);

  const routerId = param.slug as string;
  const displayTitle = selectedVariant?.title || title;
  const displayPrice = selectedVariant?.price ?? price;
  const displayOldPrice = selectedVariant?.oldPrice ?? oldPrice;
  const displayImages =
    selectedVariant?.images && selectedVariant.images.length ? selectedVariant.images : images;
  const selectedInStock = selectedVariant ? selectedVariant.inStock : true;
  const displayAvailability = selectedVariant
    ? selectedInStock
      ? selectedVariant.warehouse || availabilityLabel || t("stockAvailable")
      : "Нет в наличии"
    : availabilityLabel || t("stockAvailable");
  const cartId = selectedVariant?.id || id;
  const cartItem = useCartItemByIdOrSlug(cartId, routerId);
  const shareSlug = slug || routerId;
  const shareText = `${displayTitle}. ${formatCurrency(displayPrice)}`;
  const whatsappOrderHref = buildProductWhatsAppOrderUrl({
    title: displayTitle,
    qty: cartItem?.qty || 1,
    priceLabel: formatCurrency(displayPrice),
    slug: shareSlug,
  });

  const handleImageClick = useCallback((ind: number) => () => setSelectedImage(ind), []);

  useEffect(() => {
    setSelectedImage(0);
  }, [displayImages]);

  const handleCartAmountChange = useCallback(
    (amount: number) => () => {
      changeCartAmount({
        id: cartId,
        price: displayPrice,
        qty: amount,
        name: displayTitle,
        imgUrl: displayImages[0],
        slug: shareSlug,
      });
    },
    [cartId, changeCartAmount, displayImages, displayPrice, displayTitle, shareSlug]
  );

  const selectorProduct = useMemo<Product>(
    () =>
      product || {
        id: String(id),
        slug: shareSlug,
        title,
        name: title,
        description: "",
        price,
        rating: 4,
        discount: 0,
        thumbnail: images[0],
        images,
        brand,
        categories: [],
        variants,
      },
    [brand, id, images, price, product, shareSlug, title, variants],
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
                src={displayImages[selectedImage] || displayImages[0]}
                style={{ display: "block", width: "100%", height: "auto" }}
              />
            </FlexBox>

            <FlexBox overflow="auto">
              {displayImages.map((url, ind) => (
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
                  mr={ind === displayImages.length - 1 ? "auto" : "10px"}
                  borderColor={selectedImage === ind ? "primary.main" : "gray.400"}
                  onClick={handleImageClick(ind)}>
                  <Avatar src={url} borderRadius="10px" size={65} />
                </Box>
              ))}
            </FlexBox>
          </div>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb="1rem">{displayTitle}</H1>

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
            <H2 color="#7C3AED" mb="4px" lineHeight="1">
              {formatCurrency(displayPrice)}
            </H2>
            {displayOldPrice && displayOldPrice > displayPrice ? (
              <SemiSpan color="text.muted">
                <del>{formatCurrency(displayOldPrice)}</del>
              </SemiSpan>
            ) : null}

            <SemiSpan color="inherit">
              {displayAvailability}
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

          {selectedVariant ? (
            <ProductVariantSelector
              product={selectorProduct}
              selectedVariant={selectedVariant}
              onSelectVariant={handleSelectVariant}
            />
          ) : null}

          <FlexBox alignItems="center" flexWrap="wrap" mb="36px" style={{ gap: 12 }}>
            {!cartItem?.qty ? (
              <Button
                size="large"
                color="primary"
                variant="contained"
                disabled={!selectedInStock}
                style={selectedInStock ? { backgroundColor: "#7C3AED" } : undefined}
                onClick={handleCartAmountChange(1)}>
                В корзину
              </Button>
            ) : (
              <FlexBox alignItems="center">
                <Button
                  p="9px"
                  size="large"
                  color="primary"
                  variant="outlined"
                  style={{ borderColor: "#7C3AED", color: "#7C3AED" }}
                  onClick={handleCartAmountChange(cartItem?.qty - 1)}>
                  <IconMinus size={22} />
                </Button>

                <H3 fontWeight="600" mx="20px">
                  {cartItem?.qty.toString().padStart(2, "0")}
                </H3>

                <Button
                  p="9px"
                  size="large"
                  color="primary"
                  variant="outlined"
                  style={{ borderColor: "#7C3AED", color: "#7C3AED" }}
                  onClick={handleCartAmountChange(cartItem?.qty + 1)}>
                  <IconPlus size={22} />
                </Button>
              </FlexBox>
            )}

            <Button
              as="a"
              size="large"
              color="primary"
              variant="outlined"
              disabled={!selectedInStock}
              style={{
                borderColor: "#7C3AED",
                color: "#7C3AED",
                opacity: selectedInStock ? 1 : 0.55,
                pointerEvents: selectedInStock ? "auto" : "none",
              }}
              {...{
                href: selectedInStock ? whatsappOrderHref : undefined,
                target: "_blank",
                rel: "noopener noreferrer",
              }}>
              Купить сейчас
            </Button>

            <ProductShareButton title={displayTitle} text={shareText} slug={shareSlug} />
          </FlexBox>
        </Grid>
      </Grid>
    </Box>
  );
}
