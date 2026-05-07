"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { IconMinus, IconPlus, IconPlayerPlay } from "@tabler/icons-react";
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
  videoUrl?: string | null;
  onVariantChange?: (variant: ProductVariant | undefined) => void;
}
// ========================================

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    let videoId: string | null = null;
    if (u.hostname.includes("youtube.com")) {
      // watch?v=ID  or  /shorts/ID  or  /embed/ID
      videoId =
        u.searchParams.get("v") ||
        (u.pathname.startsWith("/shorts/") ? u.pathname.replace("/shorts/", "") : null) ||
        (u.pathname.startsWith("/embed/") ? u.pathname.replace("/embed/", "") : null);
    } else if (u.hostname === "youtu.be") {
      videoId = u.pathname.slice(1).split("?")[0];
    }
    return videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
      : null;
  } catch {
    return null;
  }
}

function isDirectVideo(url: string) {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url);
}

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
  videoUrl,
  onVariantChange,
}: Props) {
  const param = useParams();
  const t = useTranslations("product");
  const changeCartAmount = useChangeCartAmount();
  const formatCurrency = useCurrency();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

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

  const handleImageClick = useCallback((ind: number) => () => {
    setSelectedImage(ind);
    setShowVideo(false);
  }, []);

  useEffect(() => {
    setSelectedImage(0);
    setShowVideo(false);
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
            <FlexBox mb="50px" overflow="hidden" borderRadius={16} justifyContent="center"
              style={{ aspectRatio: showVideo ? "16/9" : undefined, background: showVideo ? "#000" : undefined }}>
              {showVideo && videoUrl ? (
                isDirectVideo(videoUrl) ? (
                  <video
                    src={videoUrl}
                    controls
                    autoPlay
                    style={{ width: "100%", height: "100%", display: "block" }}
                  />
                ) : (
                  <iframe
                    src={getYouTubeEmbedUrl(videoUrl) || videoUrl}
                    title="Product video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ width: "100%", aspectRatio: "16/9", border: "none", display: "block" }}
                  />
                )
              ) : (
                <Image
                  width={300}
                  height={300}
                  src={displayImages[selectedImage] || displayImages[0]}
                  style={{ display: "block", width: "100%", height: "auto" }}
                />
              )}
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
                  mr="10px"
                  borderColor={!showVideo && selectedImage === ind ? "primary.main" : "gray.400"}
                  onClick={handleImageClick(ind)}>
                  <Avatar src={url} borderRadius="10px" size={65} />
                </Box>
              ))}

              {videoUrl && (
                <Box
                  size={70}
                  minWidth={70}
                  display="flex"
                  cursor="pointer"
                  border="1px solid"
                  borderRadius="10px"
                  alignItems="center"
                  justifyContent="center"
                  ml={displayImages.length === 0 ? "auto" : ""}
                  mr="auto"
                  borderColor={showVideo ? "primary.main" : "gray.400"}
                  style={{ background: showVideo ? "#FFEBEE" : "#f5f5f5", flexShrink: 0 }}
                  onClick={() => setShowVideo(true)}>
                  <IconPlayerPlay size={28} color="#D32F2F" />
                </Box>
              )}
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
            <H2 color="#D32F2F" mb="4px" lineHeight="1">
              {formatCurrency(displayPrice)}
            </H2>
            {displayOldPrice && displayOldPrice > displayPrice ? (
              <SemiSpan color="text.muted">
                <del>{formatCurrency(displayOldPrice)}</del>
              </SemiSpan>
            ) : null}

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
                style={{ backgroundColor: "#D32F2F" }}
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
                  style={{ borderColor: "#D32F2F", color: "#D32F2F" }}
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
                  style={{ borderColor: "#D32F2F", color: "#D32F2F" }}
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
              style={{
                borderColor: "#D32F2F",
                color: "#D32F2F",
              }}
              {...{
                href: whatsappOrderHref,
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
