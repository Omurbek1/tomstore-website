"use client";
import styled from "styled-components";
import Card from "@component/Card";

export const CategoryCard = styled(Card)`
  padding: 1.25rem;
  text-align: center;
  text-decoration: none;
  display: block;
  transition: box-shadow 150ms ease, transform 150ms ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    transform: translateY(-2px);
  }

  .icon { font-size: 2rem; margin-bottom: 0.5rem; }

  .label {
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;
