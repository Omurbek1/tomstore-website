import { useLocale } from "next-intl";
import { currency } from "@utils/utils";

export default function useCurrency() {
  const locale = useLocale();
  return (price: number, fraction?: number) => currency(price, fraction, locale);
}
