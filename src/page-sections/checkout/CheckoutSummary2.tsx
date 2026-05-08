"use client";

import { useTranslations } from "next-intl";

import OrderSummaryCard from "@component/checkout/OrderSummaryCard";
import { useCartStore } from "../../store/cart.store";

export default function CheckoutSummary2() {
  const t = useTranslations("checkout");
  const cart = useCartStore((s) => s.cart);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const items = cart.map((item) => ({ name: item.name, quantity: item.qty, price: item.price }));

  const rows = [
    { label: t("summary.subtotal"), value: subtotal },
    { label: t("summary.shipping"), value: 0 },
    { label: t("summary.tax"), value: null },
    { label: t("summary.discount"), value: null },
  ];

  return (
    <OrderSummaryCard
      title={t("alternative.title")}
      items={items}
      rows={rows}
      total={subtotal}
      totalLabel={t("summary.total")}
    />
  );
}
