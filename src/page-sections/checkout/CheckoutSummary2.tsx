"use client";

import { useTranslations } from "next-intl";

import OrderSummaryCard from "@component/checkout/OrderSummaryCard";
import { ORDER_ITEMS, ORDER_SUMMARY } from "@data/order-summary";

export default function CheckoutSummary2() {
  const t = useTranslations("checkout");
  const rows = [
    { label: t("summary.subtotal"), value: ORDER_SUMMARY.subtotal },
    { label: t("summary.shipping"), value: ORDER_SUMMARY.shipping },
    { label: t("summary.tax"), value: ORDER_SUMMARY.tax },
    { label: t("summary.discount"), value: ORDER_SUMMARY.discount }
  ];

  return (
    <OrderSummaryCard
      title={t("alternative.title")}
      items={ORDER_ITEMS}
      rows={rows}
      total={ORDER_SUMMARY.total}
      totalLabel={t("summary.total")}
    />
  );
}
