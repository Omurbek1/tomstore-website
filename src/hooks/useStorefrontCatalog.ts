"use client";

import { useCallback } from "react";
import { keepPreviousData, useQuery, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import {
  storefrontCatalogQueryOptions,
  storefrontCategoriesQueryOptions,
  storefrontHomeQueryOptions,
  storefrontProductQueryOptions,
  storefrontProductsQueryOptions,
  storefrontInfiniteCatalogQueryOptions,
  type StorefrontCatalogParams,
  type StorefrontProductPayload,
  type StorefrontInfinitePage,
} from "@utils/__api__/storefront";
import Product from "@models/product.model";
import { useBranch } from "@context/BranchContext";

export const useStorefrontHome = () => useQuery(storefrontHomeQueryOptions());

export const useStorefrontCategories = () =>
  useQuery({
    ...storefrontCategoriesQueryOptions(),
    placeholderData: keepPreviousData,
  });

export const useStorefrontCatalog = (params: StorefrontCatalogParams = {}) =>
  useQuery({
    ...storefrontCatalogQueryOptions(params),
    placeholderData: keepPreviousData,
  });

export const useStorefrontProducts = (
  params: StorefrontCatalogParams = {},
  fallbackData?: Product[],
) =>
  useQuery({
    ...storefrontProductsQueryOptions(params),
    // Show previous results while new query is fetching (prevents blank flash).
    // Falls back to SSR data on the very first client render.
    placeholderData: (prev: Product[] | undefined) => prev ?? fallbackData,
  });

export const useInfiniteStorefrontProducts = (
  params: StorefrontCatalogParams = {},
  initialProducts?: Product[],
) => {
  // Выбран не основной магазин → тот же каталог с ?branch= (цены филиала).
  // Пока не ясно, какой магазин (cookie есть, список грузится) — не грузим,
  // показываем серверный список, чтобы не делать лишний запрос.
  const { branchParam, resolved } = useBranch();
  return useInfiniteQuery<StorefrontInfinitePage>({
    ...storefrontInfiniteCatalogQueryOptions({ ...params, branch: branchParam }),
    enabled: resolved,
    placeholderData: (prev) =>
      prev ??
      (initialProducts?.length
        ? {
            pages: [
              {
                items: initialProducts,
                nextPage: 2,
                total: initialProducts.length,
                totalPages: 99,
                filters: undefined,
              },
            ],
            pageParams: [1],
          }
        : undefined),
  });
};

export const useStorefrontProduct = (
  slug: string,
  initialData?: StorefrontProductPayload,
) =>
  useQuery({
    ...storefrontProductQueryOptions(slug),
    enabled: Boolean(slug),
    initialData,
  });

/**
 * Товар с ценами выбранного магазина. Основной магазин → запроса нет,
 * используются серверные данные; иначе — ?branch=, а до ответа держим
 * серверные (без мигания и сдвига вёрстки).
 */
export const useBranchStorefrontProduct = (slug: string) => {
  const { branchParam } = useBranch();
  return useQuery({
    ...storefrontProductQueryOptions(slug, branchParam),
    enabled: Boolean(slug && branchParam),
    placeholderData: keepPreviousData,
  });
};

export const usePrefetchStorefrontProduct = () => {
  const queryClient = useQueryClient();
  const { branchParam } = useBranch();

  return useCallback(
    (slug: string) => {
      if (!slug) return;
      // Без филиала страница товара берёт серверные данные — префетч не нужен
      // для цен, но кэширует JSON для клиентских переходов (как раньше).
      queryClient.prefetchQuery(storefrontProductQueryOptions(slug, branchParam));
    },
    [branchParam, queryClient],
  );
};

export const usePrefetchStorefrontCatalog = () => {
  const queryClient = useQueryClient();

  return useCallback(
    (params: StorefrontCatalogParams = {}) => {
      queryClient.prefetchQuery(
        storefrontProductsQueryOptions({ pageSize: 24, sort: "popular", ...params }),
      );
    },
    [queryClient],
  );
};
