import type { CartItem } from "../store/cart.store";
import { SITE_URL } from "@lib/siteUrl";
import { resolveWhatsAppPhone } from "@lib/storeBrand";

type ProductOrderInput = {
  title: string;
  qty?: number;
  priceLabel: string;
  slug?: string;
  /** Магазин, по цене которого оформляется заказ. */
  branchName?: string;
  /** WhatsApp компании из /storefront/config; нет — номер из env сайта. */
  phone?: string | null;
};

type CartOrderInput = {
  items: CartItem[];
  totalLabel: string;
  comment?: string;
  branchName?: string;
  phone?: string | null;
};

const buildProductLink = (slug?: string) => {
  if (!slug) return "";
  const path = `/product/${slug}`;
  return SITE_URL ? `${SITE_URL}${path}` : path;
};

export const buildWhatsAppOrderUrl = (message: string, configPhone?: string | null) => {
  const phone = resolveWhatsAppPhone(configPhone);
  const encodedMessage = encodeURIComponent(message);

  return phone
    ? `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`
    : `https://api.whatsapp.com/send?text=${encodedMessage}`;
};

export const buildProductWhatsAppOrderUrl = ({
  title,
  qty = 1,
  priceLabel,
  slug,
  branchName,
  phone,
}: ProductOrderInput) => {
  const productLink = buildProductLink(slug);
  const message = [
    "Здравствуйте! Хочу быстро оформить заказ через WhatsApp.",
    "",
    `Товар: ${title}`,
    `Количество: ${qty}`,
    `Цена: ${priceLabel}`,
    branchName ? `Магазин: ${branchName} (цены для этого магазина)` : "",
    productLink ? `Ссылка: ${productLink}` : "",
    "",
    "Подскажите наличие и условия доставки.",
  ]
    .filter(Boolean)
    .join("\n");

  return buildWhatsAppOrderUrl(message, phone);
};

export const buildCartWhatsAppOrderUrl = ({
  items,
  totalLabel,
  comment,
  branchName,
  phone,
}: CartOrderInput) => {
  const lines = items.map((item, index) => {
    const productLink = buildProductLink(item.slug);
    const productTotal = item.price * item.qty;

    return [
      `${index + 1}. ${item.name}`,
      `   Кол-во: ${item.qty}`,
      `   Цена: ${Math.round(item.price).toLocaleString("ru-RU")} сом`,
      `   Сумма: ${Math.round(productTotal).toLocaleString("ru-RU")} сом`,
      productLink ? `   Ссылка: ${productLink}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  });

  const message = [
    "Здравствуйте! Хочу оформить заказ из корзины через WhatsApp.",
    "",
    ...lines,
    "",
    `Итого: ${totalLabel}`,
    branchName ? `Магазин: ${branchName} (цены для этого магазина)` : "",
    comment ? `Комментарий: ${comment}` : "",
    "",
    "Подскажите наличие и условия доставки.",
  ]
    .filter(Boolean)
    .join("\n");

  return buildWhatsAppOrderUrl(message, phone);
};
