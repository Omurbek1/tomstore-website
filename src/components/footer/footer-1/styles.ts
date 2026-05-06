"use client";

import styled from "styled-components";
import { Link } from "@i18n/navigation";

// STYLED COMPONENTS
export const StyledLink = styled(Link)`
  position: relative;
  display: block;
  cursor: pointer;
  border-radius: 4px;
  padding: 0.3rem 0rem;
  color: ${({ theme }) => theme.colors.gray[500]};
  &:hover {
    color: ${({ theme }) => theme.colors.gray[100]};
  }
`;
