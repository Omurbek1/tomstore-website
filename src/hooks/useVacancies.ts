import { useQuery } from "@tanstack/react-query";
import {
  storefrontVacanciesQueryOptions,
  storefrontVacancyQueryOptions,
  type StorefrontVacanciesResponse,
  type StorefrontVacancy,
} from "@utils/__api__/storefront";

export function useVacancies(initialData?: StorefrontVacanciesResponse) {
  return useQuery({
    ...storefrontVacanciesQueryOptions(),
    initialData,
  });
}

export function useVacancy(id: string, initialData?: StorefrontVacancy) {
  return useQuery({
    ...storefrontVacancyQueryOptions(id),
    initialData,
  });
}
