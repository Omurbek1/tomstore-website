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
}

export interface CartState {
  cart: CartItem[];
}

interface CartStore extends CartState {
  changeCartAmount: (item: CartItem) => void;
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
