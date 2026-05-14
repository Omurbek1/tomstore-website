"use client";

import { ReactNode } from "react";
import Sticky from "@component/sticky";
import { HeaderTwo } from "@component/header";
import MobileNavigationBar from "@component/mobile-navigation";
// STYLED COMPONENT
import { StyledRoot } from "./styles";

// =========================================================================
interface Props {
  title?: string;
  showNavbar?: boolean;
  children: ReactNode;
}
// =========================================================================

export default function ShopLayout({ children, showNavbar = true }: Props) {
  return (
    <StyledRoot>
      {/* HEADER AREA */}
      <Sticky fixedOn={0}>
        <HeaderTwo />
      </Sticky>

  

      {/* SMALLER DEVICE NAVIGATION AREA */}
      <MobileNavigationBar />
    </StyledRoot>
  );
}
