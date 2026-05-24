"use client";

import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  SEARCH_SUGGESTIONS_MIN_LENGTH,
  storefrontSearchSuggestionsQueryOptions,
} from "@utils/__api__/storefront";

const DEFAULT_DEBOUNCE_MS = 300;

export function useDebouncedValue<T>(value: T, delayMs = DEFAULT_DEBOUNCE_MS) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handle = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(handle);
  }, [value, delayMs]);

  return debounced;
}

export function useSearchSuggestions(
  query: string,
  debounceMs = DEFAULT_DEBOUNCE_MS,
) {
  const trimmed = query.trim();
  const debouncedQuery = useDebouncedValue(trimmed, debounceMs);
  const enabled = debouncedQuery.length >= SEARCH_SUGGESTIONS_MIN_LENGTH;

  return useQuery({
    ...storefrontSearchSuggestionsQueryOptions(debouncedQuery),
    enabled,
    placeholderData: enabled ? keepPreviousData : undefined,
  });
}
