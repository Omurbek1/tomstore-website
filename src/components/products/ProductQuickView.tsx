"use client";

import { Modal } from "antd";
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

export default function ProductQuickView({ open, onClose, product }: Props) {
  return (
    <Modal
      open={open}
      centered
      footer={null}
      onCancel={onClose}
      destroyOnHidden
      width={920}
      styles={{
        body: { padding: 0 }
      }}>
      <Card p="1rem" width="100%" maxWidth="920px" borderRadius={8} position="relative">
        <ProductIntro
          id={product.id}
          title={product.title}
          price={product.price}
          images={product.images}
        />
      </Card>
    </Modal>
  );
}
