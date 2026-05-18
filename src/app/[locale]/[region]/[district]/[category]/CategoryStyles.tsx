"use client";
import styled from "styled-components";
import Card from "@component/Card";

export const ProductCard = styled(Card)`
  overflow: hidden; display: flex; flex-direction: column;
  transition: box-shadow 150ms ease;
  &:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
  img { width: 100%; height: 160px; object-fit: contain; background: #f8f8f8; display: block; padding: 1rem; }
  .body { padding: 1rem; flex: 1; display: flex; flex-direction: column; gap: 0.4rem; }
  .pname { font-size: 13px; font-weight: 600; color: ${({ theme }) => theme.colors.text.primary}; line-height: 1.4;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .price { font-size: 15px; font-weight: 700; color: ${({ theme }) => theme.colors.primary.main}; }
  .cta { font-size: 13px; font-weight: 600; color: #fff; background: ${({ theme }) => theme.colors.primary.main};
    text-align: center; padding: 0.5rem; border-radius: 6px; text-decoration: none; margin-top: auto; display: block;
    &:hover { opacity: 0.9; } }
`;
