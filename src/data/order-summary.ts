export const ORDER_ITEMS = [
  { name: "iPhone 12", quantity: 1, price: 999 },
  { name: "iPhone 12 Pro", quantity: 1, price: 1199 },
  { name: "iPhone 12 Pro Max", quantity: 1, price: 1299 }
];

const subtotal = ORDER_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0);
const tax = 40;
const shipping: number | null = null;
const discount: number | null = null;

export const ORDER_SUMMARY = {
  subtotal,
  shipping,
  tax,
  discount,
  total: subtotal + tax
};
