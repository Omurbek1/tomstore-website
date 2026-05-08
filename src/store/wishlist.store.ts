"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface WishlistItem {
  id: string | number;
  slug: string;
  title: string;
  price: number;
  imgUrl: string;
}

export interface WishlistState {
  wishlist: WishlistItem[];
}

interface WishlistStore extends WishlistState {
  toggleWishlist: (item: WishlistItem) => void;
}

const WISHLIST_STORAGE_KEY = "tomstore_wishlist";

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set) => ({
      wishlist: [],

      toggleWishlist: (item) => {
        set((state) => {
          const exists = state.wishlist.some((w) => w.id === item.id);
          if (exists) {
            return { wishlist: state.wishlist.filter((w) => w.id !== item.id) };
          }
          return { wishlist: [...state.wishlist, item] };
        });
      },
    }),
    {
      name: WISHLIST_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ wishlist: state.wishlist }),
    },
  ),
);
