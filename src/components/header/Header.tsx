"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { IconShoppingCart, IconUser } from "@tabler/icons-react";

import Login from "@sections/auth/Login";

import Box from "@component/Box";
import Modal from "@component/modal";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import MiniCart from "@component/mini-cart";
import Container from "@component/Container";
import { Tiny } from "@component/Typography";
import { IconButton } from "@component/buttons";
import Sidenav from "@component/sidenav/Sidenav";
import Categories from "@component/categories/Categories";
import { SearchInputWithCategory } from "@component/search-box";
import useCart from "@hook/useCart";
import StyledHeader from "./styles";
import Logo from "./Logo";

// ====================================================================
type HeaderProps = { isFixed?: boolean; className?: string };
// =====================================================================

export default function Header({ isFixed, className }: HeaderProps) {
  const { state } = useCart();
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleOpenCart = useCallback(() => setOpen(true), []);
  const handleCloseCart = useCallback(() => setOpen(false), []);
  const handleOpenLogin = useCallback(() => setLoginOpen(true), []);
  const handleCloseLogin = useCallback(() => setLoginOpen(false), []);

  const CART_HANDLE = (
    <Box ml="1rem" position="relative" onClick={handleOpenCart}>
      <IconButton bg="gray.200" p="12px" size="small" borderRadius={8}>
        <IconShoppingCart size={16} stroke={1.5} />
      </IconButton>

      {state.cart.length > 0 && (
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
            {state.cart.length}
          </Tiny>
        </FlexBox>
      )}
    </Box>
  );

  return (
    <StyledHeader className={className}>
      <Container className="container">
        <FlexBox className="logo" alignItems="center" mr="1rem">
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

        <FlexBox justifyContent="center" flex="1 1 0">
          <SearchInputWithCategory />
        </FlexBox>

        <FlexBox className="header-right" alignItems="center">
          <IconButton borderRadius={8} ml="1rem" bg="gray.200" p="12px" onClick={handleOpenLogin}>
            <IconUser size={16} stroke={1.5} />
          </IconButton>

          <Modal open={loginOpen} onClose={handleCloseLogin}>
            <Login />
          </Modal>

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
