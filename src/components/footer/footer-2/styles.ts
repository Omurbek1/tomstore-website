"use client";

import styled from "styled-components";
import { Link } from "@i18n/navigation";

import Box from "@component/Box";
import { deviceSize } from "@utils/constants";

// STYLED COMPONENTS
export const StyledLink = styled(Link)`
  z-index: 999;
  display: block;
  cursor: pointer;
  position: relative;
  border-radius: 4px;
  padding: 0.35rem 0rem;
  color: rgba(255, 255, 255, 0.65);
  &:hover {
    color: #fff;
  }
`;

export const StyledBox = styled(Box)`
  margin-left: auto;
  margin-right: auto;

  @media only screen and (max-width: ${deviceSize.sm}px) {
    margin-right: unset;
    margin-left: unset;
  }
`;

export const Wrapper = styled(Box)`
  color: white;
  padding: 40px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 1rem;
  background: ${({ theme }) =>
    (theme as any).isDark
      ? `linear-gradient(160deg, ${(theme as any).colors.secondary[100]} 0%, ${(theme as any).colors.body.default} 100%)`
      : "#0f3460"};

  @media only screen and (max-width: 900px) {
    margin-bottom: 3.75rem;
  }
`;
