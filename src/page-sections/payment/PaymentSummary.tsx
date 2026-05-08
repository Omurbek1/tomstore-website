"use client";

import { useTranslations } from "next-intl";

import OrderSummaryCard from "@component/checkout/OrderSummaryCard";
import { useCartStore } from "../../store/cart.store";

export default function PaymentSummary() {
  const t = useTranslations("checkout.summary");
  const cart = useCartStore((s) => s.cart);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const rows = [
    { label: t("subtotal"), value: subtotal },
    { label: t("shipping"), value: 0 },
    { label: t("tax"), value: null },
    { label: t("discount"), value: null },
  ];

  return (
    <OrderSummaryCard
      title={t("title")}
      rows={rows}
      total={subtotal}
      totalLabel={t("total")}
    />
  );
}
