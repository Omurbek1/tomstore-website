import { useQuery } from "@tanstack/react-query";
import {
  storefrontBlogListQueryOptions,
  storefrontBlogPostQueryOptions,
  type StorefrontBlogListResponse,
  type StorefrontBlogPostDetails,
} from "@utils/__api__/storefront";

export function useBlogList(
  params?: { q?: string; category?: string; tag?: string },
  initialData?: StorefrontBlogListResponse,
) {
  return useQuery({
    ...storefrontBlogListQueryOptions(params),
    initialData,
  });
}

export function useBlogPost(slug: string, initialData?: StorefrontBlogPostDetails) {
  return useQuery({
    ...storefrontBlogPostQueryOptions(slug),
    initialData,
  });
}
