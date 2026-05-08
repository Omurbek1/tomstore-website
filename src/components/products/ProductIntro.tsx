"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { IconMinus, IconPlus, IconPlayerPlay } from "@tabler/icons-react";
import styled from "styled-components";
import { useTranslations } from "next-intl";

import Box from "@component/Box";
import NextImage from "@component/NextImage";
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
const PRODUCT_IMAGE_FALLBACK = "/assets/images/products/iphone-xi.png";

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

type VideoType = "direct" | "iframe" | "social-link";
type VideoEmbed = {
  type: VideoType;
  src: string;
  aspectRatio: string;
  thumbnail: string | null;
  autoPlay: boolean;
  platform?: string;
  originalUrl?: string;
};

function resolveVideoEmbed(url: string): VideoEmbed {
  const make = (
    type: VideoType,
    src: string,
    opts: { aspectRatio?: string; thumbnail?: string | null; autoPlay?: boolean } = {},
  ): VideoEmbed => ({
    type,
    src,
    aspectRatio: opts.aspectRatio ?? "16/9",
    thumbnail: opts.thumbnail ?? null,
    autoPlay: opts.autoPlay ?? true,
  });

  // Direct video files → <video>
  if (/\.(mp4|webm|ogg|mov|avi|mkv|m3u8)(\?|$)/i.test(url)) {
    return make("direct", url);
  }

  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");

    // YouTube
    if (host.includes("youtube.com") || host === "youtu.be") {
      let id: string | null = null;
      const isShorts = u.pathname.startsWith("/shorts/");
      if (host === "youtu.be") {
        id = u.pathname.slice(1).split("?")[0];
      } else {
        id =
          u.searchParams.get("v") ||
          (/^\/(shorts|embed)\//.test(u.pathname) ? u.pathname.split("/")[2] : null);
      }
      if (id) return make("iframe", `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`, {
        aspectRatio: isShorts ? "9/16" : "16/9",
        thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      });
    }

    // Vimeo
    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean).pop();
      if (id) return make("iframe", `https://player.vimeo.com/video/${id}?autoplay=1`);
    }

    // Rutube
    if (host === "rutube.ru") {
      const id = u.pathname.replace(/\/$/, "").split("/").pop();
      if (id) return make("iframe", `https://rutube.ru/play/embed/${id}`);
    }

    // VK Video  vk.com/video-123_456  or  vk.com/video?z=video-123_456
    if (host === "vk.com") {
      const oid = u.searchParams.get("oid") || "";
      const vid = u.searchParams.get("id") || "";
      const z = u.searchParams.get("z") || "";
      const match = (z || u.pathname).match(/video(-?\d+)_(\d+)/);
      const params = match
        ? `oid=${match[1]}&id=${match[2]}`
        : oid && vid ? `oid=${oid}&id=${vid}` : "";
      if (params) return make("iframe", `https://vk.com/video_ext.php?${params}&autoplay=1`);
    }

    // Dailymotion
    if (host === "dailymotion.com") {
      const id = u.pathname.replace(/\/$/, "").split("/").pop();
      if (id) return make("iframe", `https://www.dailymotion.com/embed/video/${id}?autoplay=1`);
    }

    // TikTok — portrait 9:16, no autoplay support
    if (host === "tiktok.com") {
      const id = u.pathname.match(/\/video\/(\d+)/)?.[1];
      if (id) return make("iframe", `https://www.tiktok.com/embed/v2/${id}`, {
        aspectRatio: "9/16",
        autoPlay: false,
      });
    }

    // Instagram — iframe is blocked by X-Frame-Options; show a link card instead
    if (host === "instagram.com") {
      const match = u.pathname.match(/^\/(p|reel|tv)\/([\w-]+)/);
      if (match) {
        const isReel = match[1] === "reel" || match[1] === "tv";
        return {
          type: "social-link",
          src: url,
          originalUrl: url,
          platform: "instagram",
          aspectRatio: isReel ? "9/16" : "1/1",
          thumbnail: null,
          autoPlay: false,
        };
      }
    }
  } catch {
    // fall through
  }

  // Unknown URL → try embedding as-is
  return make("iframe", url);
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
  const [isPlaying, setIsPlaying] = useState(false);

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
  const safeDisplayImages = displayImages.length ? displayImages : [PRODUCT_IMAGE_FALLBACK];
  const activeImage = safeDisplayImages[selectedImage] || safeDisplayImages[0];
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
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    setSelectedImage(0);
    setShowVideo(false);
    setIsPlaying(false);
  }, [displayImages]);

  const handleCartAmountChange = useCallback(
    (amount: number) => () => {
      changeCartAmount({
        id: cartId,
        price: displayPrice,
        qty: amount,
        name: displayTitle,
        imgUrl: safeDisplayImages[0],
        slug: shareSlug,
      });
    },
    [cartId, changeCartAmount, displayPrice, displayTitle, safeDisplayImages, shareSlug]
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
        thumbnail: images[0] || PRODUCT_IMAGE_FALLBACK,
        images: images.length ? images : [PRODUCT_IMAGE_FALLBACK],
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
            {(() => {
              const embed = videoUrl ? resolveVideoEmbed(videoUrl) : null;
              const isSocialLink = embed?.type === "social-link";
              const showPlayer = showVideo && videoUrl && embed && !isSocialLink;
              const showCover = showPlayer && !isPlaying && !!embed!.thumbnail;
              const showDirect = showPlayer && (isPlaying || !embed!.autoPlay);

              return (
                <>
                  {showVideo && isSocialLink && embed ? (
                    <InstagramEmbedWidget url={embed.originalUrl || embed.src} />
                  ) : (
                  <MainMediaBox
                    mb="50px"
                    $aspectRatio={showPlayer ? embed!.aspectRatio : "4/3"}
                  >
                    {showDirect ? (
                      embed!.type === "direct" ? (
                        <video
                          src={embed!.src}
                          controls
                          autoPlay
                          style={{ width: "100%", height: "100%", display: "block" }}
                        />
                      ) : (
                        <iframe
                          src={embed!.src}
                          title="Product video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                        />
                      )
                    ) : showCover ? (
                      <VideoCover onClick={() => setIsPlaying(true)}>
                        <NextImage
                          src={embed!.thumbnail!}
                          alt="video preview"
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          style={{ objectFit: "cover" }}
                        />
                        <VideoOverlay />
                        <PlayButtonCircle>
                          <IconPlayerPlay size={36} fill="#fff" color="#fff" />
                        </PlayButtonCircle>
                      </VideoCover>
                    ) : showPlayer && !embed!.thumbnail ? (
                      <VideoCover onClick={() => setIsPlaying(true)}>
                        <VideoCoverFallback />
                        <VideoOverlay />
                        <PlayButtonCircle>
                          <IconPlayerPlay size={36} fill="#fff" color="#fff" />
                        </PlayButtonCircle>
                      </VideoCover>
                    ) : (
                      <NextImage
                        width={800}
                        height={800}
                        src={activeImage}
                        alt={displayTitle}
                        fallbackSrc={PRODUCT_IMAGE_FALLBACK}
                        quality={80}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                        fetchPriority="high"
                        style={{ display: "block", width: "100%", height: "auto" }}
                      />
                    )}
                  </MainMediaBox>
                  )}

                  <FlexBox overflow="auto" style={{ gap: 10, paddingBottom: 4 }}>
                    {safeDisplayImages.map((url: string, ind: number) => (
                      <ThumbBox
                        key={ind}
                        $active={!showVideo && selectedImage === ind}
                        onClick={handleImageClick(ind)}
                      >
                        <Avatar src={url} borderRadius="8px" size={62} />
                      </ThumbBox>
                    ))}

                    {videoUrl && embed && (
                      <VideoThumbBox
                        $active={showVideo}
                        onClick={() => {
                          setShowVideo(true);
                          setIsPlaying(!embed.autoPlay);
                        }}
                      >
                        {embed.thumbnail
                          ? (
                            <NextImage
                              src={embed.thumbnail}
                              alt="video"
                              fill
                              sizes="70px"
                              style={{ objectFit: "cover" }}
                            />
                          )
                          : <VideoThumbFallback />
                        }
                        <VideoThumbOverlay />
                        <VideoThumbPlay>
                          <IconPlayerPlay size={18} fill="#fff" color="#fff" />
                        </VideoThumbPlay>
                      </VideoThumbBox>
                    )}
                  </FlexBox>
                </>
              );
            })()}
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

// ── Gallery styled components ─────────────────────────────────────────────────

const MainMediaBox = styled(FlexBox)<{ $aspectRatio?: string }>`
  overflow: hidden;
  border-radius: 16px;
  justify-content: center;
  background: #f8f8f8;
  ${({ $aspectRatio }) =>
    $aspectRatio && $aspectRatio !== "none"
      ? `aspect-ratio: ${$aspectRatio};`
      : ""}

  img, video, iframe { width: 100%; height: 100%; object-fit: contain; display: block; }
`;

const ThumbBox = styled.button<{ $active: boolean }>`
  flex: 0 0 70px;
  width: 70px;
  height: 70px;
  padding: 3px;
  border: 2px solid ${({ $active, theme }) => ($active ? "#D32F2F" : theme.colors.gray[300])};
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  overflow: hidden;
  transition: border-color 150ms ease;
`;

const VideoThumbBox = styled.button<{ $active: boolean }>`
  flex: 0 0 70px;
  width: 70px;
  height: 70px;
  border: 2px solid ${({ $active }) => ($active ? "#D32F2F" : "#ddd")};
  border-radius: 10px;
  background: #111;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: border-color 150ms ease;

  img { width: 100%; height: 100%; object-fit: cover; display: block; }
`;

const VideoThumbFallback = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
`;

const VideoThumbOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
`;

const VideoThumbPlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VideoCover = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  overflow: hidden;
  background: #111;

  img { width: 100%; height: 100%; object-fit: cover; display: block; }

  &:hover ${() => PlayButtonCircle} {
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

const VideoCoverFallback = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1c1c1c 0%, #2d2d2d 100%);
`;

const VideoOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
`;

const PlayButtonCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(211, 47, 47, 0.92);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
  transition: transform 200ms ease, background 200ms ease;

  &:hover { background: #D32F2F; }
`;

// ── Instagram embed via official embed.js ────────────────────────────────────

function InstagramEmbedWidget({ url }: { url: string }) {
  useEffect(() => {
    const process = () => {
      const ig = (window as any).instgrm;
      if (ig?.Embeds?.process) ig.Embeds.process();
    };

    if ((window as any).instgrm) {
      process();
    } else {
      const existing = document.getElementById("instagram-embed-js");
      if (existing) {
        existing.addEventListener("load", process);
      } else {
        const script = document.createElement("script");
        script.id = "instagram-embed-js";
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        script.onload = process;
        document.body.appendChild(script);
      }
    }
  }, [url]);

  return (
    <InstagramEmbedRoot>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          background: "#fff",
          border: "1px solid #dbdbdb",
          borderRadius: 12,
          margin: "0 auto 50px",
          padding: 0,
          width: "100%",
          maxWidth: 540,
          minWidth: 0,
        }}
      />
    </InstagramEmbedRoot>
  );
}

const InstagramEmbedRoot = styled.div`
  width: 100%;

  /* override Instagram's fixed-width iframe so it fills the column */
  iframe.instagram-media,
  iframe.instagram-media-rendered {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    border-radius: 12px !important;
  }
`;
