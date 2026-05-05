"use client";

import { useCallback } from "react";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  storefrontCatalogQueryOptions,
  storefrontCategoriesQueryOptions,
  storefrontHomeQueryOptions,
  storefrontProductQueryOptions,
  storefrontProductsQueryOptions,
  type StorefrontCatalogParams,
  type StorefrontProductPayload,
} from "@utils/__api__/storefront";
import Product from "@models/product.model";

export const useStorefrontHome = () => useQuery(storefrontHomeQueryOptions());

export const useStorefrontCategories = () =>
  useQuery({
    ...storefrontCategoriesQueryOptions(),
    placeholderData: keepPreviousData,
  });

export const useStorefrontCatalog = (params: StorefrontCatalogParams = {}) =>
  useQuery(storefrontCatalogQueryOptions(params));

export const useStorefrontProducts = (
  params: StorefrontCatalogParams = {},
  placeholderData?: Product[],
) =>
  useQuery({
    ...storefrontProductsQueryOptions(params),
    placeholderData,
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
        storefrontProductsQueryOptions({ pageSize: 48, sort: "popular", ...params }),
      );
    },
    [queryClient],
  );
};
