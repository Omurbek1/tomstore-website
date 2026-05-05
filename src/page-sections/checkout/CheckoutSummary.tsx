"use client";

import { useTranslations } from "next-intl";

import OrderSummaryCard from "@component/checkout/OrderSummaryCard";
import useCart from "@hook/useCart";

const TAX_RATE = 0.08;

export default function CheckoutSummary() {
  const t = useTranslations("checkout.summary");
  const { state } = useCart();

  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = subtotal + tax;

  const items = state.cart.map((item) => ({
    name: item.name,
    quantity: item.qty,
    price: item.price
  }));

  const rows = [
    { label: t("subtotal"), value: subtotal },
    { label: t("shipping"), value: null },
    { label: t("tax"), value: tax },
    { label: t("discount"), value: null }
  ];

  return (
    <OrderSummaryCard
      title={t("title")}
      items={items}
      rows={rows}
      total={total}
      totalLabel={t("total")}
      voucher={{
        placeholder: t("voucher"),
        buttonLabel: t("applyVoucher")
      }}
    />
  );
}
