"use client";
import styled from "styled-components";
import Card from "@component/Card";

export const CityCard = styled(Card)`
  padding: 1.25rem;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: box-shadow 150ms ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }

  .left { flex: 1; }

  .city-name {
    font-size: 15px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  .region {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text.muted};
    margin-top: 2px;
  }

  .days {
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary.main};
    background: ${({ theme }) => theme.colors.primary.light};
    padding: 3px 10px;
    border-radius: 12px;
    white-space: nowrap;
  }
`;
