"use client";

import { useCallback, useState } from "react";
import { IconShoppingCart, IconHeart } from "@tabler/icons-react";
import { Link } from "@i18n/navigation";

import FlexBox from "@component/FlexBox";
import MiniCart from "@component/mini-cart";
import Container from "@component/Container";
import { Tiny } from "@component/Typography";
import { IconButton } from "@component/buttons";
import Sidenav from "@component/sidenav/Sidenav";
import { SearchInput } from "@component/search-box";
import { useCartCount } from "@hook/useCart";
import { useWishlistCount } from "@hook/useWishlist";
import StyledHeader from "./styles";
import Logo from "./Logo";

// ========================================================================
type HeaderProps = { className?: string };
// ========================================================================

export default function HeaderTwo({ className }: HeaderProps) {
  const cartCount = useCartCount();
  const wishlistCount = useWishlistCount();
  const [open, setOpen] = useState(false);

  const handleOpenCart = useCallback(() => setOpen(true), []);
  const handleCloseCart = useCallback(() => setOpen(false), []);

  const CART_HANDLE = (
    <FlexBox ml="20px" alignItems="flex-start" onClick={handleOpenCart}>
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
          px="5px"
          py="2px"
          mt="-9px"
          ml="-1rem"
          bg="primary.main"
          alignItems="center"
          borderRadius="300px"
          justifyContent="center">
          <Tiny color="white" fontWeight="600">
            {cartCount}
          </Tiny>
        </FlexBox>
      )}
    </FlexBox>
  );

  return (
    <StyledHeader className={className}>
      <Container display="flex" alignItems="center" justifyContent="space-between" height="100%">
        <FlexBox className="logo" alignItems="center" mr="1rem">
          <Link href="/">
            <Logo />
          </Link>
        </FlexBox>

        <FlexBox justifyContent="center" flex="1 1 0">
          <SearchInput />
        </FlexBox>

        <FlexBox className="header-right" alignItems="center">
          {/* account icon hidden temporarily */}

          <Link href="/wish-list" aria-label="Open wishlist" title="Open wishlist">
            <FlexBox ml="20px" alignItems="flex-start">
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
                  px="5px"
                  py="2px"
                  mt="-9px"
                  ml="-1rem"
                  bg="primary.main"
                  alignItems="center"
                  borderRadius="300px"
                  justifyContent="center">
                  <Tiny color="white" fontWeight="600">
                    {wishlistCount}
                  </Tiny>
                </FlexBox>
              )}
            </FlexBox>
          </Link>

          <Sidenav
            open={open}
            width={380}
            position="right"
            handle={CART_HANDLE}
            onClose={handleCloseCart}>
            <MiniCart />
          </Sidenav>
        </FlexBox>
      </Container>
    </StyledHeader>
  );
}
