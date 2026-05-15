"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "styled-components";
import { IconCategoryFilled, IconChevronDown, IconChevronRight } from "@tabler/icons-react";

import Box from "../Box";
import Card from "../Card";
import Badge from "../badge";
import FlexBox from "../FlexBox";
import NavLink from "../nav-link";
import MenuItem from "../MenuItem";
import { Button } from "../buttons";
import Container from "../Container";
import Typography, { Span } from "../Typography";
import Categories from "../categories/Categories";

import StyledNavbar from "./styles";
import navbarNavigations from "@data/navbarNavigations";

interface Nav {
  title: string;
  url?: string;
  extLink?: boolean;
  badge?: string;
  child?: Nav[];
}

type NavbarProps = { navListOpen?: boolean };

const NavItem = ({ nav, isRoot = false }: { nav: Nav; isRoot?: boolean }) => {
  const href = nav.url || "/";
  const childList = nav.child || [];

  const label = nav.badge ? (
    <Badge style={{ marginRight: "0px" }} title={nav.badge}>
      {nav.title}
    </Badge>
  ) : (
    <Span className="nav-link">{nav.title}</Span>
  );

  if (nav.url && nav.extLink) {
    return (
      <NavLink href={href} target="_blank" className="nav-link" rel="noopener noreferrer">
        {label}
      </NavLink>
    );
  }

  if (nav.child) {
    if (isRoot) {
      return (
        <FlexBox className="root" position="relative" flexDirection="column" alignItems="center">
          {label}
          <div className="root-child">
            <Card borderRadius={8} mt="1.25rem" py="0.5rem" boxShadow="large" minWidth="230px">
              {childList.map((child) => (
                <NavItem key={child.title} nav={child} />
              ))}
            </Card>
          </div>
        </FlexBox>
      );
    }

    return (
      <Box className="parent" position="relative" minWidth="230px">
        <MenuItem color="gray.700" style={{ display: "flex", justifyContent: "space-between" }}>
          {label}
          <IconChevronRight stroke={1.5} size={16} />
        </MenuItem>
        <Box className="child" pl="0.5rem">
          <Card py="0.5rem" borderRadius={8} boxShadow="large" minWidth="230px">
            {childList.map((child) => (
              <NavItem key={child.title} nav={child} />
            ))}
          </Card>
        </Box>
      </Box>
    );
  }

  if (nav.url) {
    return (
      <NavLink className={isRoot ? "nav-link" : ""} href={href}>
        {isRoot ? label : <MenuItem>{label}</MenuItem>}
      </NavLink>
    );
  }

  return null;
};

export default function Navbar({ navListOpen }: NavbarProps) {
  const t = useTranslations();
  const theme = useTheme();

  return (
    <StyledNavbar>
      <Container height="100%" display="flex" alignItems="center" justifyContent="space-between">
        <Categories
          open={navListOpen}
          handler={(handleOpen) => (
            <Button
              width="278px"
              variant="text"
              height="40px"
              background="body.default"
              onClick={handleOpen}>
              <IconCategoryFilled stroke={1.5} size={18} color={theme.colors.primary.main} />
              <Typography ml="10px" flex="1 1 0" fontWeight="600" textAlign="left" color="text.primary">
                {t("nav.categories")}
              </Typography>
              <IconChevronDown className="dropdown-icon" size={18} stroke={1.5} />
            </Button>
          )}
        />

        <FlexBox alignItems="center"  style={{ gap: "1.5rem" }}>
          {navbarNavigations.map((nav) => (
            <NavItem key={nav.title} nav={nav} isRoot />
          ))}
        </FlexBox>
      </Container>
    </StyledNavbar>
  );
}
