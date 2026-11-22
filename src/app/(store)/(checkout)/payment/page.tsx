import { getLocale } from "next-intl/server";
import { redirect } from "@i18n/navigation";

// Оплаты на сайте нет: заказ оформляется на /checkout и уходит в CRM.
export default async function Payment() {
  redirect({ href: "/checkout", locale: await getLocale() });
}
