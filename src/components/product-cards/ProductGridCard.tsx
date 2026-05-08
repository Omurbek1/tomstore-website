"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useState } from "react";
import styled, { useTheme } from "styled-components";
import { IconEye, IconHeart, IconHeartFilled, IconPlus, IconMinus } from "@tabler/icons-react";

import { useCartItemById, useChangeCartAmount } from "@hook/useCart";
import { useIsWishlisted, useToggleWishlist } from "@hook/useWishlist";

import Box from "@component/Box";
import Rating from "@component/rating";
import Chip from "@component/Chip";
import FlexBox from "@component/FlexBox";
import NextImage from "@component/NextImage";
import Card, { CardProps } from "@component/Card";
import { H3, SemiSpan } from "@component/Typography";
import { Button, IconButton } from "@component/buttons";

// Only loaded when user clicks the quick-view icon
const ProductQuickView = dynamic(() => import("@component/products/ProductQuickView"), {
  ssr: false,
});

import { calculateDiscount } from "@utils/utils";
import useCurrency from "@hook/useCurrency";
import { deviceSize } from "@utils/constants";
import { useLocale, useTranslations } from "next-intl";
import { usePrefetchStorefrontProduct } from "@hook/useStorefrontCatalog";

// STYLED COMPONENT
const Wrapper = styled(Card)`
  margin: auto;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  transition: all 250ms ease-in-out;

  &:hover {
    .details {
      .add-cart {
        display: flex;
      }
    }
    .image-holder {
      .extra-icons {
        display: flex;
      }
    }
  }

  .image-holder {
    text-align: center;
    position: relative;
    display: flex;
    height: 260px;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 0.75rem 0;
    flex: 0 0 260px;

    a {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .extra-icons {
      z-index: 2;
      top: 0.75rem;
      display: none;
      right: 0.75rem;
      cursor: pointer;
      position: absolute;
      flex-direction: column;
      gap: 0.25rem;
    }

    @media only screen and (max-width: ${deviceSize.sm}px) {
      height: 160px;
      flex: 0 0 160px;
    }
  }

  .details {
    flex: 1 1 auto;
    padding: 1rem;

    .categories {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .icon-holder {
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      justify-content: space-between;
    }

    .favorite-icon {
      cursor: pointer;
    }
    .outlined-icon {
      svg path {
        fill: ${({ theme }) => theme.colors.text.hint};
      }
    }
    .add-cart {
      display: none;
      margin-top: auto;
      align-items: center;
      flex-direction: column;
    }
  }

  @media only screen and (max-width: 768px) {
    .details {
      padding: 0.75rem;
      .add-cart {
        display: flex;
      }
    }
  }

  @media only screen and (max-width: ${deviceSize.sm}px) {
    .details {
      padding: 0.5rem;
      .title {
        font-size: 12px !important;
        margin-bottom: 4px !important;
      }
    }
  }
`;

// =======================================================================
interface ProductGridCardProps extends CardProps {
  off?: number;
  slug: string;
  title: string;
  price: number;
  imgUrl: string;
  rating: number;
  images: string[] | undefined;
  id: string | number;
}
// =======================================================================

export default function ProductGridCard({
  id,
  off,
  slug,
  title,
  price,
  imgUrl,
  images,
  rating = 4,
  ...props
}: ProductGridCardProps) {
  const theme = useTheme();
  const locale = useLocale();
  const formatCurrency = useCurrency();
  const t = useTranslations("product");
  const router = useRouter();
  const prefetchProductQuery = usePrefetchStorefrontProduct();
  const changeCartAmount = useChangeCartAmount();
  const toggleWishlist = useToggleWishlist();
  const isWishlisted = useIsWishlisted(id);
  const [open, setOpen] = useState(false);
  const cartItem = useCartItemById(id);
  const productHref = `/${locale}/product/${slug}`;

  const toggleDialog = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  const handleCartAmountChange = useCallback(
    (amount: number) => () => {
      changeCartAmount({
        id,
        slug,
        price,
        imgUrl,
        name: title,
        qty: amount,
      });
    },
    [changeCartAmount, id, imgUrl, price, slug, title],
  );

  const prefetchProduct = useCallback(() => {
    router.prefetch(productHref);
    prefetchProductQuery(slug);
  }, [prefetchProductQuery, productHref, router, slug]);

  return (
    <Fragment>
      <Wrapper borderRadius={12} {...props}>
        <div className="image-holder">
          {!!off && (
            <Chip
              top="10px"
              left="10px"
              p="5px 10px"
              fontSize="10px"
              fontWeight="600"
              bg="primary.main"
              position="absolute"
              color="primary.text"
              zIndex={1}
            >
              {t("saleOff", { percent: off })}
            </Chip>
          )}

          <FlexBox className="extra-icons">
            <IconButton
              size="small"
              onClick={toggleDialog}
              aria-label={`Quick view ${title}`}
              title={`Quick view ${title}`}
              style={{ width: 35, height: 35, padding: "0.5rem" }}
            >
              <IconEye size={18} color={theme.colors.gray[500]} />
            </IconButton>

            <IconButton
              size="small"
              aria-label={isWishlisted ? `Remove ${title} from wishlist` : `Add ${title} to wishlist`}
              title={isWishlisted ? `Remove ${title} from wishlist` : `Add ${title} to wishlist`}
              style={{ width: 35, height: 35, padding: "0.5rem" }}
              onClick={() => toggleWishlist({ id, slug, title, price, imgUrl })}
            >
              {isWishlisted
                ? <IconHeartFilled size={18} color={theme.colors.primary.main} />
                : <IconHeart size={18} color={theme.colors.gray[500]} />
              }
            </IconButton>
          </FlexBox>

          <Link
            href={productHref}
            onFocus={prefetchProduct}
            onMouseEnter={prefetchProduct}
          >
            <NextImage
              alt={title}
              width={277}
              src={imgUrl}
              height={270}
              optimizedWidth={560}
              sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 277px"
              style={{ objectFit: "contain" }}
            />
          </Link>
        </div>

        <div className="details">
          <FlexBox>
            <Box flex="1 1 0" minWidth="0px" mr="0.5rem">
              <Link
                href={productHref}
                onFocus={prefetchProduct}
                onMouseEnter={prefetchProduct}
              >
                <H3
                  mb="10px"
                  title={title}
                  fontSize="14px"
                  textAlign="left"
                  fontWeight="600"
                  className="title"
                  color="text.secondary"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "2.8em",
                  }}
                >
                  {title}
                </H3>
              </Link>

              <Rating value={rating || 0} outof={5} color="warn" readOnly />

              <FlexBox alignItems="center" mt="10px">
                <SemiSpan pr="0.5rem" fontWeight="600" color="primary.main">
                  {calculateDiscount(price, off as number, locale)}
                </SemiSpan>

                {!!off && (
                  <SemiSpan color="text.muted" fontWeight="600">
                    <del>{formatCurrency(price)}</del>
                  </SemiSpan>
                )}
              </FlexBox>
            </Box>

            <FlexBox
              width="30px"
              alignItems="center"
              flexDirection="column-reverse"
              justifyContent={!!cartItem?.qty ? "space-between" : "flex-start"}
            >
              <Button
                size="none"
                padding="3px"
                color="primary"
                variant="outlined"
                borderColor="primary.light"
                aria-label={`Add ${title} to cart`}
                title={`Add ${title} to cart`}
                onClick={handleCartAmountChange((cartItem?.qty || 0) + 1)}
              >
                <IconPlus size={18} />
              </Button>

              {!!cartItem?.qty && (
                <Fragment>
                  <SemiSpan color="text.primary" fontWeight="600">
                    {cartItem.qty}
                  </SemiSpan>

                  <Button
                    size="none"
                    padding="3px"
                    color="primary"
                    variant="outlined"
                    borderColor="primary.light"
                    aria-label={`Remove one ${title} from cart`}
                    title={`Remove one ${title} from cart`}
                    onClick={handleCartAmountChange(cartItem.qty - 1)}
                  >
                    <IconMinus size={18} />
                  </Button>
                </Fragment>
              )}
            </FlexBox>
          </FlexBox>
        </div>
      </Wrapper>

      <ProductQuickView
        open={open}
        onClose={toggleDialog}
        product={{ images: images || [], title, price, id: id as number | string, slug }}
      />
    </Fragment>
  );
}
