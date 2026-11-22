"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useBranch } from "@context/BranchContext";
import {
  collectStorefrontHomeProducts,
  mapStorefrontProduct,
  storefrontCatalogQueryOptions,
  storefrontHomeQueryOptions,
  type StorefrontCatalogParams,
} from "@utils/__api__/storefront";
import { useBranchPricesStore } from "../../store/branchPrices.store";

/**
 * Невидимые компоненты: при выбранном не-основном магазине тянут те же данные
 * с ?branch= (через прокси, кэш 60 с) и кладут цены в стор — серверные
 * карточки (BranchPriceText/useBranchPrice) подменяют цену без перерисовки
 * страницы. Магазин по умолчанию — запросов нет.
 */
export function HomeBranchPriceSync() {
  const { branchParam } = useBranch();
  const merge = useBranchPricesStore((state) => state.merge);
  const { data } = useQuery({
    ...storefrontHomeQueryOptions(branchParam),
    enabled: Boolean(branchParam),
  });

  useEffect(() => {
    if (branchParam && data) merge(branchParam, collectStorefrontHomeProducts(data));
  }, [branchParam, data, merge]);

  return null;
}

export function CatalogBranchPriceSync({ params }: { params: StorefrontCatalogParams }) {
  const { branchParam } = useBranch();
  const merge = useBranchPricesStore((state) => state.merge);
  const { data } = useQuery({
    ...storefrontCatalogQueryOptions({ ...params, branch: branchParam }),
    enabled: Boolean(branchParam),
  });

  useEffect(() => {
    if (branchParam && data) merge(branchParam, data.items.map(mapStorefrontProduct));
  }, [branchParam, data, merge]);

  return null;
}
