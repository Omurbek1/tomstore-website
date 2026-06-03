"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { IconX } from "@tabler/icons-react";
import Card from "@component/Card";
import ProductIntro from "./ProductIntro";

// ===================================================
type Props = {
  open: boolean;
  onClose: () => void;
  product: {
    slug: string;
    title: string;
    price: number;
    images: string[];
    id: string | number;
  };
};
// ===================================================

// Лёгкая замена antd <Modal> на портал + styled-components,
// чтобы не тянуть AntD на витрину. Поведение сохранено:
// центрирование, закрытие по оверлею/ESC, блокировка скролла.
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.45);
  overflow-y: auto;
`;

const Dialog = styled.div`
  position: relative;
  width: 100%;
  max-width: 920px;
  margin: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => theme.colors.body.paper};
  box-shadow: ${({ theme }) => theme.shadows[2]};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export default function ProductQuickView({ open, onClose, product }: Props) {
  // Блокировка скролла фона + закрытие по Escape, пока окно открыто
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <Overlay onClick={onClose}>
      <Dialog onClick={(event) => event.stopPropagation()}>
        <CloseButton type="button" aria-label="Close" onClick={onClose}>
          <IconX size={18} stroke={2} />
        </CloseButton>
        <Card p="1rem" width="100%" maxWidth="920px" borderRadius={8} position="relative">
          <ProductIntro
            id={product.id}
            title={product.title}
            price={product.price}
            images={product.images}
            slug={product.slug}
          />
        </Card>
      </Dialog>
    </Overlay>,
    document.body,
  );
}
