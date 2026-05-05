"use client";

import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
  useQuery(storefrontCategoriesQueryOptions());

export const useStorefrontCatalog = (params: StorefrontCatalogParams = {}) =>
  useQuery(storefrontCatalogQueryOptions(params));

export const useStorefrontProducts = (
  params: StorefrontCatalogParams = {},
  initialData?: Product[],
) =>
  useQuery({
    ...storefrontProductsQueryOptions(params),
    initialData,
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
