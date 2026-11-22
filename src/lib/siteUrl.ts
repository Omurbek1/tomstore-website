const CANONICAL_ORIGIN = "https://www.tomstore.kg";

const raw = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "");
const normalized = raw === "https://tomstore.kg" ? CANONICAL_ORIGIN : raw;

// Never let a deployment/preview URL leak into canonical tags.
// Only use the env var if it looks like a real custom domain.
const hasCustomDomain =
  Boolean(normalized) && !normalized.includes("vercel.app") && !normalized.includes("localhost");

export const SITE_URL = hasCustomDomain ? normalized : CANONICAL_ORIGIN;

// Сайт ставят и другие компании: без NEXT_PUBLIC_SITE_URL canonical, sitemap,
// JSON-LD и ссылки в заказах укажут на tomstore.kg (и x-storefront-host —
// на компанию TomStore). Сборку не ломаем (деплой TomStore работает и так),
// но в проде предупреждаем явно — один раз, только на сервере.
if (
  process.env.NODE_ENV === "production" &&
  typeof window === "undefined" &&
  !hasCustomDomain
) {
  console.warn(
    `[site] NEXT_PUBLIC_SITE_URL не задан или не похож на домен (${raw || "пусто"}) — ` +
      `используется ${CANONICAL_ORIGIN}. Если это сайт не TomStore, задайте ` +
      `NEXT_PUBLIC_SITE_URL=https://<ваш-домен>, иначе сайт покажет товары и бренд TomStore.`,
  );
}

/**
 * Хост для бэкенда (x-storefront-host): по нему бэкенд выбирает компанию
 * витрины. Нижний регистр, без порта; мусор → "".
 */
export const normalizeStorefrontHost = (value?: string | null): string => {
  const host = String(value || "")
    .split(",")[0]
    .trim()
    .toLowerCase()
    .replace(/:\d+$/, "");
  return /^[a-z0-9.-]{1,253}$/.test(host) ? host : "";
};

/** Хост сайта этого деплоя — для SSR/ISR (там нет запроса посетителя). */
export const SITE_HOST = normalizeStorefrontHost(new URL(SITE_URL).host);
