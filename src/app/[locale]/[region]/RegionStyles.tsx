"use client";
import styled from "styled-components";
import Link from "next/link";
import Card from "@component/Card";

export const DistrictCard = styled(Card)`
  padding: 1.25rem; text-decoration: none; display: block;
  transition: box-shadow 150ms ease, transform 150ms ease;
  &:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.1); transform: translateY(-2px); }
  .name  { font-size: 15px; font-weight: 600; color: ${({ theme }) => theme.colors.text.primary}; }
  .meta  { font-size: 12px; color: ${({ theme }) => theme.colors.text.muted}; margin-top: 4px; }
  .days  { font-size: 12px; font-weight: 600; color: ${({ theme }) => theme.colors.primary.main};
           background: ${({ theme }) => theme.colors.primary.light}; border-radius: 10px;
           padding: 2px 8px; display: inline-block; margin-top: 6px; }
`;

export const CatLink = styled(Link)`
  display: flex; align-items: center; gap: 0.5rem; padding: 0.6rem 0.75rem;
  border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => theme.colors.gray[100]};
  transition: background 150ms ease;
  &:hover { background: ${({ theme }) => theme.colors.primary.light}; color: ${({ theme }) => theme.colors.primary.main}; }
  .icon { font-size: 18px; }
`;
