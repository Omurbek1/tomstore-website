"use client";

import { useLocale } from "next-intl";
import { useBranchPrice } from "@context/BranchContext";
import { currency } from "@utils/utils";

const DEFAULT_OLD_PRICE_STYLE = { marginLeft: 6, opacity: 0.6, fontSize: "0.85em" } as const;

type Props = {
  id?: string | number;
  price: number;
  oldPrice?: number | null;
  className?: string;
  oldPriceClassName?: string;
};

/**
 * Цена карточки с подменой на цену выбранного магазина. Серверная разметка —
 * цена по умолчанию; после загрузки цен филиала меняется только текст
 * (размеры блока те же — без сдвига вёрстки).
 */
export default function BranchPriceText({
  id,
  price,
  oldPrice,
  className,
  oldPriceClassName,
}: Props) {
  const locale = useLocale();
  const branchPrice = useBranchPrice(id, price, oldPrice);
  const showOld = !!branchPrice.oldPrice && branchPrice.oldPrice > branchPrice.price;

  return (
    <span className={className}>
      {currency(branchPrice.price, 0, locale)}
      {showOld ? (
        <del
          className={oldPriceClassName}
          style={oldPriceClassName ? undefined : DEFAULT_OLD_PRICE_STYLE}
        >
          {currency(branchPrice.oldPrice as number, 0, locale)}
        </del>
      ) : null}
    </span>
  );
}
