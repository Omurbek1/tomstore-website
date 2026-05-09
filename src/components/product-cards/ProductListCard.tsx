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
import Grid from "../grid/Grid";
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
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .categories {
    display: flex;
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
      <Grid container spacing={1}>
        <Grid item md={3} sm={4} xs={12}>
          <Box position="relative">
            {!!off && (
              <Chip
                top="10px"
                left="10px"
                p="5px 10px"
                fontSize="10px"
                fontWeight="600"
                bg="primary.main"
                position="absolute"
                color="primary.text">
                {t("saleOff", { percent: off })}
              </Chip>
            )}

            <span onClick={toggleDialog}>
              <Icon color="secondary" variant="small" className="quick-view">
                eye-alt
              </Icon>
            </span>

            <Link
              href={productHref}
              onFocus={prefetchProduct}
              onMouseEnter={prefetchProduct}
            >
              <NextImage
                src={imgUrl}
                alt={title}
                width={260}
                height={260}
                borderRadius="0.5rem"
                sizes="(max-width: 600px) 100vw, (max-width: 960px) 33vw, 260px"
                style={{ objectFit: "contain" }}
              />
            </Link>
          </Box>
        </Grid>

        <Grid item md={8} sm={8} xs={12}>
          <FlexBox flexDirection="column" justifyContent="center" height="100%" p="1rem">
            {!!categories && (
              <div className="categories">
                {categories.map((item) => (
                  <NavLink className="link" href={`/product/search/${item}`} key={item}>
                    {item}
                  </NavLink>
                ))}
              </div>
            )}

            <Link
              href={productHref}
              onFocus={prefetchProduct}
              onMouseEnter={prefetchProduct}
            >
              <H5 fontWeight="600" my="0.5rem">
                {title}
              </H5>
            </Link>

            <Rating value={rating || 3} outof={5} color="warn" />

            <FlexBox mt="0.5rem" mb="1rem" alignItems="center">
              <H5 fontWeight={600} color="primary.main" mr="0.5rem">
                {calculateDiscount(price, off ?? 0, locale)}
              </H5>

              {(off ?? 0) > 0 && (
                <SemiSpan fontWeight="600">
                  <del>{formatCurrency(price)}</del>
                </SemiSpan>
              )}
            </FlexBox>

            <Hidden up="sm">
              <FlexBox
                height="30px"
                alignItems="center"
                flexDirection="row-reverse"
                justifyContent="space-between">
                <span
                  className="favorite-icon"
                  onClick={() => toggleWishlist({ id, slug, title, price, imgUrl })}
                  style={{ display: "flex", cursor: "pointer" }}>
                  {isWishlisted
                    ? <IconHeartFilled size={16} color={theme.colors.primary.main} />
                    : <IconHeart size={16} color={theme.colors.gray[600]} />
                  }
                </span>

                <FlexBox alignItems="center" flexDirection="row-reverse">
                  <Button
                    size="none"
                    padding="5px"
                    color="primary"
                    variant="outlined"
                    borderColor="primary.light"
                    onClick={handleCartAmountChange((cartItem?.qty || 0) + 1)}>
                    <Icon variant="small">plus</Icon>
                  </Button>

                  {cartItem?.qty && (
                    <Fragment>
                      <H5 fontWeight="600" fontSize="15px" mx="0.75rem">
                        {cartItem.qty}
                      </H5>

                      <Button
                        size="none"
                        padding="5px"
                        color="primary"
                        variant="outlined"
                        borderColor="primary.light"
                        onClick={handleCartAmountChange(cartItem.qty - 1)}>
                        <Icon variant="small">minus</Icon>
                      </Button>
                    </Fragment>
                  )}
                </FlexBox>
              </FlexBox>
            </Hidden>
          </FlexBox>
        </Grid>

        <Grid item flex={1} md={1} xs={12}>
          <FlexBox
            ml="auto"
            p="2rem 0rem"
            width="100%"
            height="100%"
            minWidth="30px"
            alignItems="center"
            flexDirection="column"
            justifyContent="space-between">
            <span
              className="favorite-icon"
              onClick={() => toggleWishlist({ id, slug, title, price, imgUrl })}
              style={{ display: "flex", cursor: "pointer" }}>
              {isWishlisted
                ? <IconHeartFilled size={16} color={theme.colors.primary.main} />
                : <IconHeart size={16} color={theme.colors.gray[600]} />
              }
            </span>

            <FlexBox
              alignItems="center"
              className="add-cart"
              flexDirection={cartItem?.qty ? "column" : "column-reverse"}>
              <Button
                size="none"
                padding="5px"
                color="primary"
                variant="outlined"
                borderColor="primary.light"
                onClick={handleCartAmountChange((cartItem?.qty || 0) + 1)}>
                <Icon variant="small">plus</Icon>
              </Button>

              {cartItem?.qty && (
                <Fragment>
                  <H5 fontWeight="600" fontSize="15px" m="0.5rem">
                    {cartItem.qty}
                  </H5>

                  <Button
                    size="none"
                    padding="5px"
                    color="primary"
                    variant="outlined"
                    borderColor="primary.light"
                    onClick={handleCartAmountChange(cartItem.qty - 1)}>
                    <Icon variant="small">minus</Icon>
                  </Button>
                </Fragment>
              )}
            </FlexBox>
          </FlexBox>
        </Grid>
      </Grid>

      <ProductQuickView
        open={open}
        onClose={toggleDialog}
        product={{ id, images, price, title, slug }}
      />
    </Wrapper>
  );
}
