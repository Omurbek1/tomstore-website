"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  qty: number;
  name: string;
  slug?: string;
  price: number;
  imgUrl?: string;
  id: string | number;
  /**
   * Магазин (филиал), по цене которого лежит позиция. Нет — цена магазина
   * по умолчанию. При смене магазина корзина переоценивается (CartBranchSync).
   */
  branchId?: string | null;
}

export interface CartState {
  cart: CartItem[];
}

export type CartRepriceUpdate = {
  id: string | number;
  price: number;
  branchId: string | null;
};

interface CartStore extends CartState {
  changeCartAmount: (item: CartItem) => void;
  /** Переоценка позиций под выбранный магазин (CartBranchSync). */
  repriceItems: (updates: CartRepriceUpdate[]) => void;
}

const CART_STORAGE_KEY = "tomstore_cart";

function changeCartAmount(cart: CartItem[], updatedItem: CartItem) {
  if (updatedItem.qty < 1) {
    return cart.filter((item) => item.id !== updatedItem.id);
  }

  const itemExists = cart.some((item) => item.id === updatedItem.id);

  if (!itemExists) {
    return [...cart, updatedItem];
  }

  return cart.map((item) =>
    item.id === updatedItem.id ? { ...item, ...updatedItem } : item,
  );
}

function migratePersistedCart(persistedState: unknown): CartState {
  if (Array.isArray(persistedState)) {
    return { cart: persistedState as CartItem[] };
  }

  if (
    persistedState &&
    typeof persistedState === "object" &&
    "cart" in persistedState &&
    Array.isArray((persistedState as CartState).cart)
  ) {
    return persistedState as CartState;
  }

  if (
    persistedState &&
    typeof persistedState === "object" &&
    "state" in persistedState &&
    Array.isArray((persistedState as { state?: CartState }).state?.cart)
  ) {
    return { cart: (persistedState as { state: CartState }).state.cart };
  }

  return { cart: [] };
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],

      changeCartAmount: (item) => {
        set((state) => ({ cart: changeCartAmount(state.cart, item) }));
      },

      repriceItems: (updates) => {
        if (!updates.length) return;
        const byId = new Map(updates.map((update) => [String(update.id), update]));
        set((state) => ({
          cart: state.cart.map((item) => {
            const update = byId.get(String(item.id));
            return update
              ? { ...item, price: update.price, branchId: update.branchId }
              : item;
          }),
        }));
      },
    }),
    {
      name: CART_STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState) => migratePersistedCart(persistedState),
      partialize: (state) => ({ cart: state.cart }),
    },
  ),
);
