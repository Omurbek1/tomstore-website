import { useQuery } from "@tanstack/react-query";
import {
  storefrontVacanciesQueryOptions,
  type StorefrontVacanciesResponse,
} from "@utils/__api__/storefront";

export function useVacancies(initialData?: StorefrontVacanciesResponse) {
  return useQuery({
    ...storefrontVacanciesQueryOptions(),
    initialData,
  });
}
