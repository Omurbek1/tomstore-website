"use client";
import styled from "styled-components";
import Link from "next/link";
import Card from "@component/Card";

export const CategoryCard = styled(Card)`
  padding: 1.5rem 1.25rem; text-align: center; text-decoration: none; display: block;
  transition: box-shadow 150ms ease, transform 150ms ease;
  &:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.1); transform: translateY(-2px); }
  .icon  { font-size: 2.2rem; margin-bottom: 0.5rem; }
  .name  { font-size: 14px; font-weight: 600; color: ${({ theme }) => theme.colors.text.primary}; }
  .hint  { font-size: 12px; color: ${({ theme }) => theme.colors.text.muted}; margin-top: 4px; }
`;

export const SettlementLink = styled(Link)`
  display: block; padding: 0.6rem 1rem; border-radius: 8px; text-decoration: none;
  font-size: 14px; font-weight: 500; color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => theme.colors.gray[100]};
  transition: background 150ms ease;
  &:hover { background: ${({ theme }) => theme.colors.primary.light}; color: ${({ theme }) => theme.colors.primary.main}; }
`;
