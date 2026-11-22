"use client";

import { useLocale, useTranslations } from "next-intl";
import { useBranch } from "@context/BranchContext";
import { currency } from "@utils/utils";
import type Product from "@models/product.model";
import styles from "./BranchPricesList.module.css";

type Props = {
  branchPrices: NonNullable<Product["branchPrices"]>;
};

/**
 * «Цены и наличие в магазинах» на странице товара. Рендерится на сервере
 * (данные из SSR — видны поисковикам), на клиенте лишь подсвечивается
 * выбранный магазин и можно переключиться на другой.
 */
export default function BranchPricesList({ branchPrices }: Props) {
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
          const hasOld = !!row.oldPrice && row.oldPrice > row.price;
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
                <span className={styles.price}>{currency(row.price, 0, locale)}</span>
                {hasOld ? (
                  <del className={styles.oldPrice}>{currency(row.oldPrice as number, 0, locale)}</del>
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
