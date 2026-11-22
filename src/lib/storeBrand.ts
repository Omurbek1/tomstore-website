/**
 * Бренд компании сайта из /storefront/config. Сайт может стоять на домене
 * любой компании — «TomStore» только когда это сайт TomStore (или бэкенд
 * не ответил и в env сайта нет своего названия).
 */
const FALLBACK_STORE_NAME =
  (process.env.NEXT_PUBLIC_STORE_NAME || "").trim() || "TomStore";

/** Название магазина: из config; «TOMSTORE» (дефолт бэкенда) → «TomStore». */
export const resolveStoreName = (companyName?: string | null): string => {
  const name = String(companyName || "").trim();
  if (!name) return FALLBACK_STORE_NAME;
  return name.toLowerCase() === "tomstore" ? "TomStore" : name;
};

const ENV_WHATSAPP_PHONE =
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE ||
  process.env.NEXT_PUBLIC_STOREFRONT_WHATSAPP_PHONE ||
  "";

/** WhatsApp для заказа: номер компании из config, иначе — из env сайта. */
export const resolveWhatsAppPhone = (configPhone?: string | null): string =>
  String(configPhone || "").replace(/\D/g, "") ||
  ENV_WHATSAPP_PHONE.replace(/\D/g, "");
