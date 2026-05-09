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
) =>
  useInfiniteQuery<StorefrontInfinitePage>({
    ...storefrontInfiniteCatalogQueryOptions(params),
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

export const useStorefrontProduct = (
  slug: string,
  initialData?: StorefrontProductPayload,
) =>
  useQuery({
    ...storefrontProductQueryOptions(slug),
    enabled: Boolean(slug),
    initialData,
  });

export const usePrefetchStorefrontProduct = () => {
  const queryClient = useQueryClient();

  return useCallback(
    (slug: string) => {
      if (!slug) return;
      queryClient.prefetchQuery(storefrontProductQueryOptions(slug));
    },
    [queryClient],
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
