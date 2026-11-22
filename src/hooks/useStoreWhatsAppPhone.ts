"use client";

import { useQuery } from "@tanstack/react-query";
import { storefrontConfigQueryOptions } from "@utils/__api__/storefront";

/**
 * WhatsApp компании сайта из /storefront/config (тот же запрос, что у выбора
 * магазина — кэш общий). null — config ещё грузится/без номера: тогда
 * buildWhatsAppOrderUrl берёт номер из env сайта.
 */
export const useStoreWhatsAppPhone = (): string | null =>
  useQuery(storefrontConfigQueryOptions()).data?.whatsappPhone ?? null;
