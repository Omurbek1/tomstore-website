"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type PropsWithChildren,
} from "react";
import { useQuery } from "@tanstack/react-query";
import {
  storefrontBranchesQueryOptions,
  storefrontConfigQueryOptions,
  type StorefrontBranch,
} from "@utils/__api__/storefront";
import { useBranchCookie, writeBranchCookie } from "@lib/branch/branchCookie";
import { useBranchPricesStore, type BranchPriceEntry } from "../store/branchPrices.store";

type BranchContextValue = {
  branches: StorefrontBranch[];
  defaultBranch: StorefrontBranch | null;
  /** Выбранный посетителем магазин, иначе — магазин по умолчанию. */
  activeBranch: StorefrontBranch | null;
  /**
   * id филиала для ?branch= — только если выбран НЕ филиал по умолчанию.
   * undefined → показываем цены, отрисованные сервером (по умолчанию).
   */
  branchParam: string | undefined;
  /** false, пока есть cookie, а список филиалов ещё грузится. */
  resolved: boolean;
  selectBranch: (branchId: string) => void;
};

const EMPTY_BRANCHES: StorefrontBranch[] = [];

const BranchContext = createContext<BranchContextValue>({
  branches: EMPTY_BRANCHES,
  defaultBranch: null,
  activeBranch: null,
  branchParam: undefined,
  resolved: true,
  selectBranch: () => {},
});

export function BranchProvider({ children }: PropsWithChildren) {
  const cookieBranchId = useBranchCookie();
  const branchesQuery = useQuery(storefrontBranchesQueryOptions());
  const branches = branchesQuery.data ?? EMPTY_BRANCHES;
  const flaggedDefault = branches.find((branch) => branch.isDefault) || null;

  // Флаг isDefault в списке — основной источник; config нужен, только если
  // бэкенд почему-то не отметил филиал по умолчанию.
  const configQuery = useQuery({
    ...storefrontConfigQueryOptions(),
    enabled: branches.length > 0 && !flaggedDefault,
  });
  const configDefaultId = configQuery.data?.defaultBranchId || null;

  const value = useMemo<BranchContextValue>(() => {
    const defaultBranch =
      flaggedDefault ||
      (configDefaultId ? branches.find((branch) => branch.id === configDefaultId) || null : null);
    const selected = cookieBranchId
      ? branches.find((branch) => branch.id === cookieBranchId) || null
      : null;
    const waitingForDefault = branches.length > 0 && !flaggedDefault && configQuery.isPending;
    const resolved = !cookieBranchId || (!branchesQuery.isPending && !waitingForDefault);
    const branchParam =
      resolved && selected && selected.id !== defaultBranch?.id ? selected.id : undefined;

    return {
      branches,
      defaultBranch,
      activeBranch: selected || defaultBranch,
      branchParam,
      resolved,
      selectBranch: (branchId: string) => writeBranchCookie(branchId),
    };
  }, [
    branches,
    branchesQuery.isPending,
    configDefaultId,
    configQuery.isPending,
    cookieBranchId,
    flaggedDefault,
  ]);

  return <BranchContext.Provider value={value}>{children}</BranchContext.Provider>;
}

export const useBranch = () => useContext(BranchContext);

/**
 * Цена товара для выбранного филиала. Если товар уже пришёл с ценой этого
 * филиала (priceBranchId) или цены филиала ещё нет — возвращает исходную.
 */
export function useBranchPrice(
  productId: string | number | undefined,
  price: number,
  oldPrice?: number | null,
): BranchPriceEntry & { isBranchPrice: boolean } {
  const { branchParam } = useBranch();
  const entry = useBranchPricesStore(
    useCallback(
      (state) =>
        branchParam && productId !== undefined
          ? state.prices[branchParam]?.[String(productId)]
          : undefined,
      [branchParam, productId],
    ),
  );

  return entry
    ? { ...entry, isBranchPrice: true }
    : { price, oldPrice: oldPrice ?? null, isBranchPrice: false };
}
