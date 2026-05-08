export type OrderLineItem = {
  name: string;
  quantity: number;
  price: number;
};

export type OrderSummary = {
  subtotal: number;
  shipping: number | null;
  tax: number | null;
  discount: number | null;
  total: number;
};

export const ORDER_ITEMS: OrderLineItem[] = [
  { name: "Ноутбук Lenovo IdeaPad 3", quantity: 1, price: 45900 },
  { name: "Мышь беспроводная Logitech", quantity: 2, price: 1290 },
];

export const ORDER_SUMMARY: OrderSummary = {
  subtotal: 48480,
  shipping: 0,
  tax: null,
  discount: null,
  total: 48480,
};
