"use client";

import { create } from "zustand";

export type BranchPriceEntry = { price: number; oldPrice: number | null };

type BranchPricesState = {
  /** branchId → productId → цена филиала. Только в памяти (не persist). */
  prices: Record<string, Record<string, BranchPriceEntry>>;
  merge: (
    branchId: string,
    items: Array<{ id: string | number; price: number; oldPrice?: number | null }>,
  ) => void;
};

/**
 * Цены выбранного филиала для товаров, отрисованных сервером с ценами по
 * умолчанию (главная, SEO-страницы, похожие товары). Заполняется клиентскими
 * запросами с ?branch=, карточки читают отсюда через useBranchPrice.
 */
export const useBranchPricesStore = create<BranchPricesState>()((set) => ({
  prices: {},
  merge: (branchId, items) => {
    if (!branchId || !items.length) return;
    set((state) => {
      const current = state.prices[branchId] || {};
      let changed = false;
      const next = { ...current };
      for (const item of items) {
        const key = String(item.id);
        const price = Number(item.price || 0);
        const oldPrice =
          item.oldPrice === null || item.oldPrice === undefined ? null : Number(item.oldPrice);
        const prev = current[key];
        if (prev && prev.price === price && prev.oldPrice === oldPrice) continue;
        next[key] = { price, oldPrice };
        changed = true;
      }
      return changed ? { prices: { ...state.prices, [branchId]: next } } : state;
    });
  },
}));
