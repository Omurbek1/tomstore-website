import type { CartItem } from "../store/cart.store";
import { SITE_URL } from "@lib/siteUrl";

const WHATSAPP_PHONE =
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE ||
  process.env.NEXT_PUBLIC_STOREFRONT_WHATSAPP_PHONE ||
  "";

type ProductOrderInput = {
  title: string;
  qty?: number;
  priceLabel: string;
  slug?: string;
};

type CartOrderInput = {
  items: CartItem[];
  totalLabel: string;
  comment?: string;
};

const cleanPhone = (phone: string) => phone.replace(/\D/g, "");

const buildProductLink = (slug?: string) => {
  if (!slug) return "";
  const path = `/product/${slug}`;
  return SITE_URL ? `${SITE_URL}${path}` : path;
};

export const buildWhatsAppOrderUrl = (message: string) => {
  const phone = cleanPhone(WHATSAPP_PHONE);
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
}: ProductOrderInput) => {
  const productLink = buildProductLink(slug);
  const message = [
    "Здравствуйте! Хочу быстро оформить заказ через WhatsApp.",
    "",
    `Товар: ${title}`,
    `Количество: ${qty}`,
    `Цена: ${priceLabel}`,
    productLink ? `Ссылка: ${productLink}` : "",
    "",
    "Подскажите наличие и условия доставки.",
  ]
    .filter(Boolean)
    .join("\n");

  return buildWhatsAppOrderUrl(message);
};

export const buildCartWhatsAppOrderUrl = ({
  items,
  totalLabel,
  comment,
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
    comment ? `Комментарий: ${comment}` : "",
    "",
    "Подскажите наличие и условия доставки.",
  ]
    .filter(Boolean)
    .join("\n");

  return buildWhatsAppOrderUrl(message);
};
