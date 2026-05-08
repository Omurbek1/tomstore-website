"use client";

import { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import clsx from "clsx";

import Container from "@component/Container";
import { deviceSize, layoutConstant } from "@utils/constants";

// STYLED COMPONENT
const StyledContainer = styled(Container)`
  display: flex;
  padding-top: 24px;
  position: relative;

  .sidenav {
    top: 0;
    bottom: 0;
    position: relative;
    width: ${layoutConstant.grocerySidenavWidth};
    min-width: ${layoutConstant.grocerySidenavWidth};
    height: calc(100vh - ${layoutConstant.headerHeight});
  }

  .fixed {
    position: fixed;
    scroll-behavior: unset;
    top: ${layoutConstant.headerHeight};
  }

  .pageContent {
    left: unset;
    position: relative;
    margin-left: 1.75rem;
    width: calc(100% - 2rem - ${layoutConstant.grocerySidenavWidth});
  }

  .pageContentShifted {
    left: ${layoutConstant.grocerySidenavWidth};
  }

  .section1 {
    margin-bottom: 3rem;
    margin-top: 1.75rem;
  }

  @media (max-width: ${deviceSize.md}px) {
    .sidenav {
      display: none;
    }

    .pageContent {
      left: 0px !important;
      width: 100% !important;
      margin-left: auto !important;
      margin-right: auto !important;
    }
  }
`;

// ================================================================
interface SidenavContainerProps {
  SideNav: ReactNode;
  children: ReactNode;
  navFixedComponentID: string;
}
// ================================================================

export default function SidenavContainer({
  SideNav,
  children,
  navFixedComponentID
}: SidenavContainerProps) {
  const [isSidenavFixed, setSidenavFixed] = useState<boolean>(false);

  useEffect(() => {
    const element = document.getElementById(navFixedComponentID);
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setSidenavFixed(!entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [navFixedComponentID]);

  return (
    <StyledContainer>
      <div className={clsx({ sidenav: true, fixed: isSidenavFixed })}>{SideNav}</div>

      <div className={clsx({ pageContent: true, pageContentShifted: isSidenavFixed })}>
        {children}
      </div>
    </StyledContainer>
  );
}
