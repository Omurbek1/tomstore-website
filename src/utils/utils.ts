import ceil from "lodash-es/ceil";
import { differenceInMinutes } from "date-fns/differenceInMinutes";
import isPropValid from "@emotion/is-prop-valid";

export const isValidProp = (prop: string) => isPropValid(prop);

// CONVERT HEX TO RGB COLOR
export const convertHexToRGB = (hex: string) => {
  // check if it's a rgba

  if (hex.match("rgba")) {
    let triplet = hex.slice(5).split(",").slice(0, -1).join(",");
    return triplet;
  }
  let c: any;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",");
  }
};

// GET THE DATE/TIME DIFFERENCE
export const getDateDifference = (date: string) => {
  let diff = differenceInMinutes(new Date(), new Date(date));
  if (diff < 60) return diff + " minutes ago";

  diff = ceil(diff / 60);
  if (diff < 24) return `${diff} hour${diff === 0 ? "" : "s"} ago`;

  diff = ceil(diff / 24);
  if (diff < 30) return `${diff} day${diff === 0 ? "" : "s"} ago`;

  diff = ceil(diff / 30);
  if (diff < 12) return `${diff} month${diff === 0 ? "" : "s"} ago`;

  diff = diff / 12;
  return `${diff.toFixed(1)} year${ceil(diff) === 0 ? "" : "s"} ago`;
};

export const renderProductCount = (
  page: number,
  productPerPage: number,
  totalProductLenth: number
) => {
  let startNumber = page * productPerPage;
  let endNumber = (page + 1) * productPerPage;

  if (endNumber > totalProductLenth) endNumber = totalProductLenth;

  return `Showing ${startNumber + 1}-${endNumber} of ${totalProductLenth} products`;
};

/**
 * CALCULATE PRICE WITH PRODUCT DISCOUNT THEN RETURN NEW PRODUCT PRICES
 * @param  price - PRODUCT PRICE
 * @param  discount - DISCOUNT PERCENT
 * @returns - RETURN NEW PRICE
 */

export function calculateDiscount(price: number, discount: number, locale?: string) {
  const afterDiscount = Number((price - price * (discount / 100)).toFixed(2));
  return currency(afterDiscount, 2, locale);
}

const LOCALE_CURRENCY_MAP: Record<string, { currency: string; locale: string }> = {
  en: { currency: "USD", locale: "en-US" },
  ru: { currency: "KGS", locale: "ru-KG" },
  ky: { currency: "KGS", locale: "ky-KG" }
};

export function getCurrencyConfig(locale: string) {
  return LOCALE_CURRENCY_MAP[locale] ?? LOCALE_CURRENCY_MAP.ru;
}

/**
 * CHANGE THE CURRENCY FORMAT
 * @param  price - PRODUCT PRICE
 * @param  fraction - HOW MANY FRACTION WANT TO SHOW
 * @param  locale - APP LOCALE (en, ru, ky)
 * @returns - RETURN PRICE WITH CURRENCY
 */

export function currency(price: number, fraction: number = 2, locale?: string) {
  const config = locale ? getCurrencyConfig(locale) : { currency: "KGS", locale: "ru-KG" };

  const formatCurrency = new Intl.NumberFormat(config.locale, {
    currency: config.currency,
    style: "currency",
    maximumFractionDigits: fraction,
    minimumFractionDigits: fraction
  });

  return formatCurrency.format(price);
}
