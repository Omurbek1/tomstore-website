"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { IconShoppingCart, IconHeart } from "@tabler/icons-react";
import { Link } from "@i18n/navigation";

import Box from "@component/Box";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import Container from "@component/Container";
import { Tiny } from "@component/Typography";
import { IconButton } from "@component/buttons";
import Sidenav from "@component/sidenav/Sidenav";
import Categories from "@component/categories/Categories";
import { SearchInputWithCategory } from "@component/search-box";
import { useCartCount } from "@hook/useCart";
import { useWishlistCount } from "@hook/useWishlist";
import StyledHeader from "./styles";
import Logo from "./Logo";

// Heavy components only needed on interaction — load on demand
const MiniCart = dynamic(() => import("@component/mini-cart"), { ssr: false });
const Login = dynamic(() => import("@sections/auth/Login"), { ssr: false });

// ====================================================================
type HeaderProps = { isFixed?: boolean; className?: string };
// =====================================================================

export default function Header({ isFixed, className }: HeaderProps) {
  const cartCount = useCartCount();
  const wishlistCount = useWishlistCount();
  const [open, setOpen] = useState(false);

  const handleOpenCart = useCallback(() => setOpen(true), []);
  const handleCloseCart = useCallback(() => setOpen(false), []);

  const CART_HANDLE = (
    <Box ml="1rem" position="relative" onClick={handleOpenCart}>
      <IconButton
        bg="gray.200"
        p="12px"
        size="small"
        borderRadius={8}
        aria-label="Open cart"
        title="Open cart"
      >
        <IconShoppingCart size={16} stroke={1.5} />
      </IconButton>

      {cartCount > 0 && (
        <FlexBox
          top={-5}
          right={-5}
          height={20}
          minWidth={20}
          bg="primary.main"
          borderRadius="50%"
          alignItems="center"
          position="absolute"
          justifyContent="center">
          <Tiny color="white" fontWeight="600" lineHeight={1}>
            {cartCount}
          </Tiny>
        </FlexBox>
      )}
    </Box>
  );

  return (
    <StyledHeader className={className}>
      <Container className="container">
        <FlexBox className="logo" alignItems="center" mr="1rem" flexShrink={0}>
          <Link href="/">
            <Logo />
          </Link>

          {isFixed && (
            <div className="category-holder">
              <Categories
                handler={(handleOpen) => (
                  <FlexBox color="text.hint" alignItems="center" ml="1rem" onClick={handleOpen}>
                    <Icon>categories</Icon>
                    <Icon>arrow-down-filled</Icon>
                  </FlexBox>
                )}
              />
            </div>
          )}
        </FlexBox>

        <FlexBox className="search-wrap" justifyContent="center" flex="1 1 0">
          <SearchInputWithCategory />
        </FlexBox>

        <FlexBox className="header-right" alignItems="center">
          {/* account icon hidden temporarily */}

          <Link href="/wish-list" aria-label="Open wishlist" title="Open wishlist">
            <Box ml="1rem" position="relative">
              <IconButton
                bg="gray.200"
                p="12px"
                size="small"
                borderRadius={8}
                aria-label="Open wishlist"
                title="Open wishlist"
              >
                <IconHeart size={16} stroke={1.5} />
              </IconButton>

              {wishlistCount > 0 && (
                <FlexBox
                  top={-5}
                  right={-5}
                  height={20}
                  minWidth={20}
                  bg="primary.main"
                  borderRadius="50%"
                  alignItems="center"
                  position="absolute"
                  justifyContent="center">
                  <Tiny color="white" fontWeight="600" lineHeight={1}>
                    {wishlistCount}
                  </Tiny>
                </FlexBox>
              )}
            </Box>
          </Link>

          <Sidenav
            open={open}
            width={380}
            position="right"
            handle={CART_HANDLE}
            onClose={handleCloseCart}>
            {open && <MiniCart />}
          </Sidenav>
        </FlexBox>
      </Container>
    </StyledHeader>
  );
}
