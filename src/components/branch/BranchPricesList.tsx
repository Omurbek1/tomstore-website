"use client";

import { useLocale, useTranslations } from "next-intl";
import { useBranch } from "@context/BranchContext";
import { currency } from "@utils/utils";
import type Product from "@models/product.model";
import styles from "./BranchPricesList.module.css";

type Props = {
  branchPrices: NonNullable<Product["branchPrices"]>;
  /** Выбранный вид (память/цвет) — цены магазинов этого вида. */
  variantId?: string | null;
};

/**
 * «Цены и наличие в магазинах» на странице товара. Рендерится на сервере
 * (данные из SSR — видны поисковикам), на клиенте лишь подсвечивается
 * выбранный магазин и можно переключиться на другой.
 */
export default function BranchPricesList({ branchPrices, variantId }: Props) {
  const t = useTranslations("branch");
  const locale = useLocale();
  const { activeBranch, defaultBranch, selectBranch, branches, locked } = useBranch();

  // Домен одного магазина — сравнивать не с чем.
  if (locked || branchPrices.length < 2) return null;

  const activeId = activeBranch?.id ?? defaultBranch?.id;
  const knownBranchIds = new Set(branches.map((branch) => branch.id));

  return (
    <section className={styles.root} aria-labelledby="branch-prices-title">
      <h2 id="branch-prices-title" className={styles.title}>
        {t("pricesInStores")}
      </h2>
      <ul className={styles.list}>
        {branchPrices.map((row) => {
          const isActive = row.branchId === activeId;
          // У вида своя цена в магазине — показываем её (иначе цена товара).
          const own = variantId ? row.variantPrices?.[variantId] : undefined;
          const price = own?.price ?? row.price;
          const oldPrice = own ? own.oldPrice : row.oldPrice;
          const hasOld = !!oldPrice && oldPrice > price;
          const canSelect = !isActive && knownBranchIds.has(row.branchId);
          return (
            <li
              key={row.branchId}
              className={isActive ? `${styles.row} ${styles.rowActive}` : styles.row}
            >
              <div className={styles.store}>
                <span className={styles.storeName}>{row.branchName}</span>
                {row.inStock === undefined ? null : (
                  <span className={row.inStock ? styles.inStock : styles.outOfStock}>
                    {row.inStock ? t("inStock") : t("outOfStock")}
                  </span>
                )}
              </div>
              <div className={styles.priceCell}>
                <span className={styles.price}>{currency(price, 0, locale)}</span>
                {hasOld ? (
                  <del className={styles.oldPrice}>{currency(oldPrice as number, 0, locale)}</del>
                ) : null}
              </div>
              <div className={styles.action}>
                {isActive ? (
                  <span className={styles.current}>{t("currentStore")}</span>
                ) : canSelect ? (
                  <button
                    type="button"
                    className={styles.select}
                    onClick={() => selectBranch(row.branchId)}
                  >
                    {t("pickStore")}
                  </button>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
