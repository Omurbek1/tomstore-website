"use client";

import { useTranslations } from "next-intl";

import OrderSummaryCard from "@component/checkout/OrderSummaryCard";
import { ORDER_SUMMARY } from "@data/order-summary";

export default function CheckoutSummary() {
  const t = useTranslations("checkout.summary");
  const rows = [
    { label: t("subtotal"), value: ORDER_SUMMARY.subtotal },
    { label: t("shipping"), value: ORDER_SUMMARY.shipping },
    { label: t("tax"), value: ORDER_SUMMARY.tax },
    { label: t("discount"), value: ORDER_SUMMARY.discount }
  ];

  return (
    <OrderSummaryCard
      title={t("title")}
      rows={rows}
      total={ORDER_SUMMARY.total}
      totalLabel={t("total")}
      voucher={{
        placeholder: t("voucher"),
        buttonLabel: t("applyVoucher")
      }}
    />
  );
}
