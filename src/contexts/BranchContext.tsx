"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type PropsWithChildren,
} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  storefrontBranchesQueryOptions,
  storefrontConfigQueryOptions,
  storefrontProductQueryOptions,
  type StorefrontBranch,
} from "@utils/__api__/storefront";
import { useCartStore, type CartItem, type CartRepriceUpdate } from "../store/cart.store";
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
  /** Домен привязан к одному магазину (lockedBranchId): выбора нет. */
  locked: boolean;
  selectBranch: (branchId: string) => void;
};

const EMPTY_BRANCHES: StorefrontBranch[] = [];

const BranchContext = createContext<BranchContextValue>({
  branches: EMPTY_BRANCHES,
  defaultBranch: null,
  activeBranch: null,
  branchParam: undefined,
  resolved: true,
  locked: false,
  selectBranch: () => {},
});

export function BranchProvider({ children }: PropsWithChildren) {
  const cookieBranchId = useBranchCookie();
  const branchesQuery = useQuery(storefrontBranchesQueryOptions());
  const branches = branchesQuery.data ?? EMPTY_BRANCHES;
  const flaggedDefault = branches.find((branch) => branch.isDefault) || null;

  // config нужен всегда: lockedBranchId (домен одного магазина) есть только
  // в нём; defaultBranchId — запасной, если бэкенд не отметил isDefault.
  const configQuery = useQuery({
    ...storefrontConfigQueryOptions(),
    enabled: branches.length > 0,
  });
  const configDefaultId = configQuery.data?.defaultBranchId || null;
  const lockedBranchId = configQuery.data?.lockedBranchId || null;
  const lockedBranch = lockedBranchId
    ? branches.find((branch) => branch.id === lockedBranchId) || null
    : null;

  // Магазин закреплён за доменом — чужой магазин из cookie (с другого
  // домена/до привязки) убираем, иначе цены/корзина шли бы не по тому филиалу.
  useEffect(() => {
    if (lockedBranchId && cookieBranchId && cookieBranchId !== lockedBranchId) {
      writeBranchCookie(null);
    }
  }, [cookieBranchId, lockedBranchId]);

  const value = useMemo<BranchContextValue>(() => {
    const defaultBranch =
      flaggedDefault ||
      (configDefaultId ? branches.find((branch) => branch.id === configDefaultId) || null : null);
    const selected = lockedBranch
      ? lockedBranch
      : cookieBranchId
        ? branches.find((branch) => branch.id === cookieBranchId) || null
        : null;
    const waitingForConfig = branches.length > 0 && configQuery.isPending;
    const resolved = !cookieBranchId || (!branchesQuery.isPending && !waitingForConfig);
    const branchParam =
      resolved && selected && selected.id !== defaultBranch?.id ? selected.id : undefined;

    return {
      branches,
      defaultBranch,
      activeBranch: selected || defaultBranch,
      branchParam,
      resolved,
      locked: Boolean(lockedBranch),
      selectBranch: (branchId: string) => {
        if (lockedBranch) return;
        writeBranchCookie(branchId);
      },
    };
  }, [
    branches,
    branchesQuery.isPending,
    configDefaultId,
    configQuery.isPending,
    cookieBranchId,
    flaggedDefault,
    lockedBranch,
  ]);

  return (
    <BranchContext.Provider value={value}>
      <CartBranchSync />
      {children}
    </BranchContext.Provider>
  );
}

const MAX_REPRICE_SLUGS = 30;

/**
 * Корзина хранит цену и магазин каждой позиции. Сменился магазин (или позиция
 * добавлена без магазина) → переоцениваем по API (тот же запрос товара с
 * ?branch=, что и на странице товара; кэш react-query/прокси). Итоговую цену
 * заказа всё равно пересчитывает сервер.
 */
function CartBranchSync() {
  const { activeBranch, defaultBranch, branchParam, resolved } = useContext(BranchContext);
  const cart = useCartStore((state) => state.cart);
  const repriceItems = useCartStore((state) => state.repriceItems);
  const queryClient = useQueryClient();
  // Не повторяем неудачные/неразрешимые попытки по кругу.
  const attemptedRef = useRef(new Set<string>());

  const activeId = activeBranch?.id ?? null;
  const defaultId = defaultBranch?.id ?? null;

  useEffect(() => {
    if (!resolved || !activeId) return;

    const attemptKey = (item: CartItem) => `${activeId}:${item.slug}:${item.id}`;
    const stale = cart.filter(
      (item) =>
        item.slug &&
        (item.branchId ?? defaultId) !== activeId &&
        !attemptedRef.current.has(attemptKey(item)),
    );
    if (!stale.length) return;

    stale.forEach((item) => attemptedRef.current.add(attemptKey(item)));
    const slugs = Array.from(new Set(stale.map((item) => item.slug as string))).slice(
      0,
      MAX_REPRICE_SLUGS,
    );

    let cancelled = false;
    Promise.all(
      slugs.map((slug) =>
        queryClient
          .fetchQuery(storefrontProductQueryOptions(slug, branchParam))
          .then((payload) => [slug, payload] as const)
          .catch(() => [slug, null] as const),
      ),
    ).then((results) => {
      if (cancelled) return;
      const bySlug = new Map(results);
      const updates: CartRepriceUpdate[] = [];

      for (const item of stale) {
        const payload = bySlug.get(item.slug as string);
        if (!payload) continue;
        const { product } = payload;
        const variant = product.variants?.find((v) => String(v.id) === String(item.id));
        const price =
          String(product.id) === String(item.id)
            ? product.price
            : variant
              ? variant.price
              : product.variants?.length
                ? null
                : product.price;
        if (price === null || !Number.isFinite(price)) continue;
        updates.push({ id: item.id, price, branchId: activeId });
      }

      repriceItems(updates);
    });

    return () => {
      cancelled = true;
      // Прерванный проход (корзина/магазин сменились) — разрешаем повтор.
      stale.forEach((item) => attemptedRef.current.delete(attemptKey(item)));
    };
  }, [activeId, branchParam, cart, defaultId, queryClient, repriceItems, resolved]);

  return null;
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
