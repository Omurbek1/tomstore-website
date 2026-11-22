"use client";

import { useTranslations } from "next-intl";

import OrderSummaryCard from "@component/checkout/OrderSummaryCard";
import { useCartItems, useCartTotal } from "@hook/useCart";

/**
 * Состав заказа по ценам выбранного магазина (корзина переоценивается при
 * смене магазина). Итог — ориентир: сервер пересчитывает цены сам.
 */
export default function CheckoutSummary() {
  const t = useTranslations("checkout.order");
  const cart = useCartItems();
  const total = useCartTotal();

  if (!cart.length) return null;

  return (
    <OrderSummaryCard
      title={t("summaryTitle")}
      items={cart.map((item) => ({ name: item.name, quantity: item.qty, price: item.price }))}
      rows={[]}
      total={total}
      totalLabel={t("total")}
    />
  );
}
