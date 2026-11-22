/**
 * Телефон Кыргызстана: ввод в любом виде (0555…, 555…, 996…, +996…) →
 * «+996 555 123 456». Валиден ровно 9 цифр абонента после 996.
 */
const subscriberDigits = (value: string) => {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("996")) digits = digits.slice(3);
  else if (digits.startsWith("0")) digits = digits.slice(1);
  return digits.slice(0, 9);
};

export const formatKgPhone = (value: string) => {
  const d = subscriberDigits(value);
  if (!d && !/\d/.test(value)) return "";
  const parts = [d.slice(0, 3), d.slice(3, 6), d.slice(6, 9)].filter(Boolean);
  return `+996${parts.length ? ` ${parts.join(" ")}` : ""}`;
};

export const isValidKgPhone = (value: string) => subscriberDigits(value).length === 9;

/** Для API: «+996555123456». */
export const toKgE164 = (value: string) => `+996${subscriberDigits(value)}`;
