import { useCartStore } from "../store/cart.store";

export function useCartItems() {
  return useCartStore((state) => state.cart);
}

export function useCartCount() {
  return useCartStore((state) => state.cart.length);
}

export function useCartTotal() {
  return useCartStore((state) =>
    state.cart.reduce((total, item) => total + item.price * item.qty, 0),
  );
}

export function useCartItemById(id: string | number) {
  return useCartStore((state) => state.cart.find((item) => item.id === id));
}

export function useCartItemBySlug(slug: string) {
  return useCartStore((state) => state.cart.find((item) => item.slug === slug));
}

export function useCartItemByIdOrSlug(id: string | number, slug: string) {
  return useCartStore((state) =>
    state.cart.find((item) => item.id === id || item.id === slug),
  );
}

export function useChangeCartAmount() {
  return useCartStore((state) => state.changeCartAmount);
}
