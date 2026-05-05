"use client";

import { useMemo, useReducer, createContext, PropsWithChildren, useEffect } from "react";

// ==============================================================
interface CartItem {
  qty: number;
  name: string;
  slug?: string;
  price: number;
  imgUrl?: string;
  id: string | number;
}

interface InitialState {
  cart: CartItem[];
}

interface CartAction {
  payload: CartItem;
  type: "CHANGE_CART_AMOUNT";
}

interface ContextProps {
  state: InitialState;
  dispatch: (args: CartAction) => void;
}
// ==============================================================

const CART_STORAGE_KEY = "tomstore_cart";

const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch {
    return [];
  }
};

const INITIAL_STATE: InitialState = { cart: [] };

export const CartContext = createContext<ContextProps>({
  state: INITIAL_STATE,
  dispatch: () => {}
});

const reducer = (state: InitialState, action: CartAction) => {
  switch (action.type) {
    case "CHANGE_CART_AMOUNT": {
      const currentCart = state.cart;
      const updatedItem = action.payload;
      const itemExists = currentCart.find((item) => item.id === updatedItem.id);

      if (updatedItem.qty < 1) {
        return {
          ...state,
          cart: currentCart.filter((item) => item.id !== updatedItem.id)
        };
      }

      if (itemExists) {
        const updatedCart = currentCart.map((item) =>
          item.id === updatedItem.id ? { ...item, qty: updatedItem.qty } : item
        );
        return { ...state, cart: updatedCart };
      }

      return { ...state, cart: [...currentCart, updatedItem] };
    }

    default:
      return state;
  }
};

export default function CartProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE, () => ({
    cart: loadCartFromStorage()
  }));

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
    } catch {
      // ignore storage errors
    }
  }, [state.cart]);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <CartContext value={contextValue}>{children}</CartContext>;
}
