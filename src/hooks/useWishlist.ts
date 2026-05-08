import { useWishlistStore, WishlistItem } from "../store/wishlist.store";

export function useWishlistItems() {
  return useWishlistStore((state) => state.wishlist);
}

export function useWishlistCount() {
  return useWishlistStore((state) => state.wishlist.length);
}

export function useIsWishlisted(id: string | number) {
  return useWishlistStore((state) => state.wishlist.some((w) => w.id === id));
}

export function useToggleWishlist() {
  return useWishlistStore((state) => state.toggleWishlist);
}

export function useWishlistItem(id: string | number) {
  return useWishlistStore((state) => state.wishlist.find((w) => w.id === id));
}
