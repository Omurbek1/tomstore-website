"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useState } from "react";
import styled, { useTheme } from "styled-components";

import Box from "../Box";
import Card from "../Card";
import Chip from "../Chip";
import NextImage from "@component/NextImage";
import Hidden from "../hidden";
import Rating from "../rating";
import Icon from "../icon/Icon";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import FlexBox from "../FlexBox";
import NavLink from "../nav-link";
import { Button } from "../buttons";
import { H5, SemiSpan } from "../Typography";
import ProductQuickView from "@component/products/ProductQuickView";
import { useCartItemById, useChangeCartAmount } from "@hook/useCart";
import { useIsWishlisted, useToggleWishlist } from "@hook/useWishlist";
import { calculateDiscount } from "@utils/utils";
import useCurrency from "@hook/useCurrency";
import { useLocale, useTranslations } from "next-intl";
import { usePrefetchStorefrontProduct } from "@hook/useStorefrontCatalog";

// STYLED COMPONENT
const Wrapper = styled(Card)`
  border-radius: 12px;
  .quick-view {
    top: 0.75rem;
    display: none;
    right: 0.75rem;
    cursor: pointer;
    position: absolute;
  }
  .categories {
    display: flex;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .link {
      font-size: 14px;
      margin-right: 0.5rem;
      text-decoration: underline;
      color: ${({ theme }) => theme.colors.text.hint};
    }
  }

  h4 {
    text-align: left;
    margin: 0.5rem 0px;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  .price {
    display: flex;
    font-weight: 600;
    margin-top: 0.5rem;
    h4 {
      margin: 0px;
      padding-right: 0.5rem;
      color: ${({ theme }) => theme.colors.primary.main};
    }
    del {
      color: ${({ theme }) => theme.colors.text.hint};
    }
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
  }

  &:hover {
    .add-cart {
      display: flex;
    }
    .quick-view {
      display: block;
    }
  }

  /* ── Mobile compact layout ── */
  @media only screen and (max-width: 599px) {
    .list-image-col {
      width: 110px;
      flex: 0 0 110px;
    }
    .list-content-col {
      flex: 1 1 0;
      min-width: 0;
    }
    .list-actions-col {
      display: none;
    }
    .desktop-categories {
      display: none;
    }
  }
`;

// ============================================================================
type ProductListCardProps = {
  off?: number;
  slug: string;
  title: string;
  price: number;
  imgUrl: string;
  rating: number;
  images: string[];
  id: string | number;
  categories: string[];
  [key: string]: unknown;
};
// ============================================================================

export default function ProductListCard({
  id,
  off,
  slug,
  title,
  price,
  imgUrl,
  rating,
  images,
  categories,
  ...props
}: ProductListCardProps) {
  const locale = useLocale();
  const theme = useTheme();
  const formatCurrency = useCurrency();
  const t = useTranslations("product");
  const router = useRouter();
  const prefetchProductQuery = usePrefetchStorefrontProduct();
  const [open, setOpen] = useState(false);
  const changeCartAmount = useChangeCartAmount();
  const toggleWishlist = useToggleWishlist();
  const isWishlisted = useIsWishlisted(id);
  const cartItem = useCartItemById(id);
  const productHref = `/${locale}/product/${slug}`;

  const toggleDialog = useCallback(() => setOpen((open) => !open), []);
  const prefetchProduct = useCallback(() => {
    router.prefetch(productHref);
    prefetchProductQuery(slug);
  }, [prefetchProductQuery, productHref, router, slug]);

  const handleCartAmountChange = (qty: number) => () => {
    changeCartAmount({ price, imgUrl, id, qty, slug, name: title });
  };

  return (
    <Wrapper overflow="hidden" width="100%" {...props}>
      {/* Always horizontal: image | content | actions */}
      <FlexBox alignItems="stretch">

        {/* ── Image ── */}
        <Box className="list-image-col" position="relative" style={{ width: 200, flexShrink: 0 }}>
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

          <span onClick={toggleDialog}>
            <Icon color="secondary" variant="small" className="quick-view">
              eye-alt
            </Icon>
          </span>

          <Link href={productHref} onFocus={prefetchProduct} onMouseEnter={prefetchProduct}>
            <NextImage
              src={imgUrl}
              alt={title}
              width={200}
              height={200}
              borderRadius="0.5rem"
              sizes="(max-width: 599px) 110px, (max-width: 960px) 33vw, 200px"
              style={{ objectFit: "contain", width: "100%", height: "auto" }}
            />
          </Link>
        </Box>

        {/* ── Content ── */}
        <Box className="list-content-col" flex="1 1 0" minWidth="0" p="1rem">
          {!!categories?.length && (
            <div className="categories desktop-categories">
              {categories.map((item) => (
                <NavLink className="link" href={`/product/search/${item}`} key={item}>
                  {item}
                </NavLink>
              ))}
            </div>
          )}

          <Link href={productHref} onFocus={prefetchProduct} onMouseEnter={prefetchProduct}>
            <H5
              fontWeight="600"
              my="0.5rem"
              color="text.primary"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {title}
            </H5>
          </Link>

          <Rating value={rating || 3} outof={5} color="warn" />

          <FlexBox mt="0.5rem" alignItems="center" flexWrap="wrap" style={{ gap: "0.25rem" }}>
            <H5 fontWeight={600} color="primary.main">
              {calculateDiscount(price, off ?? 0, locale)}
            </H5>
            {(off ?? 0) > 0 && (
              <SemiSpan fontWeight="600" color="text.hint">
                <del>{formatCurrency(price)}</del>
              </SemiSpan>
            )}
          </FlexBox>

          {/* Cart controls — visible only on mobile (sm+ uses the right-side actions column) */}
          <Hidden up="sm">
            <FlexBox mt="0.75rem" alignItems="center" style={{ gap: "0.5rem" }}>
              <span
                className="favorite-icon"
                onClick={() => toggleWishlist({ id, slug, title, price, imgUrl })}
                style={{ display: "flex", cursor: "pointer" }}
              >
                {isWishlisted
                  ? <IconHeartFilled size={16} color={theme.colors.primary.main} />
                  : <IconHeart size={16} color={theme.colors.gray[600]} />
                }
              </span>

              <Button
                size="none"
                padding="5px"
                color="primary"
                variant="outlined"
                borderColor="primary.light"
                onClick={handleCartAmountChange((cartItem?.qty || 0) + 1)}
              >
                <Icon variant="small">plus</Icon>
              </Button>

              {cartItem?.qty && (
                <Fragment>
                  <H5 fontWeight="600" fontSize="14px">{cartItem.qty}</H5>
                  <Button
                    size="none"
                    padding="5px"
                    color="primary"
                    variant="outlined"
                    borderColor="primary.light"
                    onClick={handleCartAmountChange(cartItem.qty - 1)}
                  >
                    <Icon variant="small">minus</Icon>
                  </Button>
                </Fragment>
              )}
            </FlexBox>
          </Hidden>
        </Box>

        {/* ── Desktop-only actions column ── */}
        <Box
          className="list-actions-col"
          p="1rem 0.75rem"
          style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}
        >
          <span
            className="favorite-icon"
            onClick={() => toggleWishlist({ id, slug, title, price, imgUrl })}
            style={{ display: "flex", cursor: "pointer" }}
          >
            {isWishlisted
              ? <IconHeartFilled size={16} color={theme.colors.primary.main} />
              : <IconHeart size={16} color={theme.colors.gray[600]} />
            }
          </span>

          <FlexBox
            alignItems="center"
            className="add-cart"
            flexDirection={cartItem?.qty ? "column" : "column-reverse"}
          >
            <Button
              size="none"
              padding="5px"
              color="primary"
              variant="outlined"
              borderColor="primary.light"
              onClick={handleCartAmountChange((cartItem?.qty || 0) + 1)}
            >
              <Icon variant="small">plus</Icon>
            </Button>

            {cartItem?.qty && (
              <Fragment>
                <H5 fontWeight="600" fontSize="15px" m="0.5rem">{cartItem.qty}</H5>
                <Button
                  size="none"
                  padding="5px"
                  color="primary"
                  variant="outlined"
                  borderColor="primary.light"
                  onClick={handleCartAmountChange(cartItem.qty - 1)}
                >
                  <Icon variant="small">minus</Icon>
                </Button>
              </Fragment>
            )}
          </FlexBox>
        </Box>
      </FlexBox>

      <ProductQuickView
        open={open}
        onClose={toggleDialog}
        product={{ id, images, price, title, slug }}
      />
    </Wrapper>
  );
}
