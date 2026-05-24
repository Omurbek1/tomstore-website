import { cache } from "react";
import { QueryClient, queryOptions, infiniteQueryOptions } from "@tanstack/react-query";

const safeDecode = (v: string) => { try { return decodeURIComponent(v); } catch { return v; } };
import Brand from "@models/Brand.model";
import Category from "@models/category.model";
import Product, { ProductVariant } from "@models/product.model";
import { Meta } from "interfaces";

type StorefrontAvailability = {
  status: string;
  label: string;
  isInStock: boolean;
  quantity: number;
  incomingQty: number;
  incomingEta?: string | null;
};

type StorefrontProductCard = {
  id: string;
  slug: string;
  sku?: string;
  name: string;
  shortDescription?: string;
  price: number;
  oldPrice?: number | null;
  availability: StorefrontAvailability;
  quantity: number;
  brand?: string;
  category?: string;
  labels?: Array<"hit" | "new" | "sale">;
  isFeatured?: boolean;
  isOnSale?: boolean;
  isNew?: boolean;
  mainImage?: string;
  gallery?: string[];
  imageSizes?: {
    thumb?: string;
    medium?: string;
    large?: string;
    original?: string;
  };
  updatedAt?: string;
  createdAt?: string;
};

type StorefrontProductDetails = StorefrontProductCard & {
  fullDescription?: string;
  attributes?: Array<{ name: string; value: string }>;
  variants?: StorefrontProductVariant[];
  relatedProducts?: StorefrontProductCard[];
  recommendedProducts?: StorefrontProductCard[];
  videoUrl?: string | null;
};

type StorefrontProductVariant = {
  id: string;
  label?: string;
  title?: string;
  name?: string;
  cpu?: string;
  ram?: number | string;
  storage?: string;
  color?: string;
  price?: number | string;
  oldPrice?: number | string | null;
  warehouse?: string | null;
  inStock?: boolean;
  stockQty?: number;
  sku?: string | null;
  description?: string | null;
  attributes?: Array<{ name: string; value: string }>;
  images?: string[];
  gallery?: string[];
  mainImage?: string;
};

type StorefrontCategory = {
  name: string;
  slug: string;
  totalProducts: number;
  image?: string;
};

export type StorefrontBrand = {
  name: string;
  slug: string;
  totalProducts: number;
};

export type StorefrontHeroSlide = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  backgroundImageUrl?: string;
  mobileBackgroundImageUrl?: string;
};

type StorefrontCatalogResponse = {
  items: StorefrontProductCard[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  filters: {
    categories: StorefrontCategory[];
    brands: StorefrontBrand[];
    minPrice: number;
    maxPrice: number;
    selectedCategory?: string;
    selectedBrand?: string;
    selectedAvailability?: string;
    selectedLabel?: string;
    selectedSort?: string;
    selectedMinPrice?: number;
    selectedMaxPrice?: number;
    query?: string;
  };
};

export type StorefrontCatalogFilters = StorefrontCatalogResponse["filters"];

export type StorefrontHomeResponse = {
  hero: StorefrontHeroSlide & {
    slides?: StorefrontHeroSlide[];
  };
  categories: StorefrontCategory[];
  popularProducts: StorefrontProductCard[];
  recommendedProducts: StorefrontProductCard[];
  hitProducts: StorefrontProductCard[];
  saleProducts: StorefrontProductCard[];
  newProducts: StorefrontProductCard[];
  brands: StorefrontBrand[];
};

export type ProductPage = {
  meta: Meta;
  result: Product[];
};

export type StorefrontHeroCarouselItem = {
  id: string;
  title?: string;
  imgUrl?: string;
  mobileImgUrl?: string;
  buttonText?: string;
  buttonLink?: string;
  description?: string;
};

export type StorefrontCatalogParams = Record<
  string,
  string | number | undefined
>;

export type StorefrontProductPayload = {
  product: Product;
  relatedProducts: Product[];
  recommendedProducts: Product[];
};

export const EMPTY_STOREFRONT_HOME: StorefrontHomeResponse = {
  hero: {
    title: "",
    subtitle: "",
    primaryCtaLabel: "",
    primaryCtaHref: "/catalog",
    secondaryCtaLabel: "",
    secondaryCtaHref: "/contacts",
    slides: [],
  },
  categories: [],
  popularProducts: [],
  recommendedProducts: [],
  hitProducts: [],
  saleProducts: [],
  newProducts: [],
  brands: [],
};

const PLACEHOLDER_IMAGE = "/assets/images/products/placeholder.webp";
const DEFAULT_BACKEND_URL = "http://127.0.0.1:3000";
const REVALIDATE_SECONDS = 60;

// Совпадает с backend in-memory cache (ProductsService.PUBLIC_LIST_TTL_MS = 60_000).
// Меняй обе константы вместе, иначе клиент будет видеть устаревшие данные дольше, чем нужно.
export const STOREFRONT_DEFAULT_STALE_TIME_MS = REVALIDATE_SECONDS * 1000;
export const STOREFRONT_DEFAULT_GC_TIME_MS = 5 * 60 * 1000;
export const STOREFRONT_CATEGORY_STALE_TIME_MS = 10 * 60 * 1000;
export const STOREFRONT_CATEGORY_GC_TIME_MS = 30 * 60 * 1000;

const STALE_TIME_MS = STOREFRONT_DEFAULT_STALE_TIME_MS;
const CATEGORY_STALE_TIME_MS = STOREFRONT_CATEGORY_STALE_TIME_MS;

const trimTrailingSlashes = (value?: string | null) =>
  String(value || "").replace(/\/+$/, "");

const getBackendUrl = () =>
  trimTrailingSlashes(
    process.env.BACKEND_URL ||
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      DEFAULT_BACKEND_URL,
  );

const buildStorefrontUrl = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // On the client, proxy through /api to avoid CORS issues
  if (typeof window !== "undefined") {
    return `/api${normalizedPath}`;
  }

  const backendUrl = getBackendUrl();
  if (
    process.env.NODE_ENV === "production" &&
    backendUrl === DEFAULT_BACKEND_URL
  ) {
    console.warn(
      "[storefront] BACKEND_URL is not configured; using localhost in production",
    );
  }

  return `${backendUrl}${normalizedPath}`;
};

export const resolveStorefrontMediaUrl = (value?: string | null) => {
  const url = String(value || "").trim();
  if (!url) return undefined;
  try {
    const parsedUrl = new URL(url);
    if (
      parsedUrl.hostname.toLowerCase().startsWith("encrypted-tbn") &&
      parsedUrl.hostname.toLowerCase().endsWith(".gstatic.com")
    ) {
      return undefined;
    }
  } catch {
    // Relative URLs are handled below.
  }
  if (url.startsWith("/uploads/")) return `/api${url}`;
  if (url.startsWith("uploads/")) return `/api/${url}`;
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("data:")
  ) {
    try {
      const parsedUrl = new URL(url);
      const backendUrl = new URL(getBackendUrl());
      if (
        parsedUrl.origin === backendUrl.origin &&
        parsedUrl.pathname.startsWith("/uploads/")
      ) {
        return `/api${parsedUrl.pathname}${parsedUrl.search}`;
      }
    } catch {
      // Keep the original URL below if parsing fails.
    }

    return url;
  }
  if (url.startsWith("/assets/")) return url;
  return `${getBackendUrl()}${url.startsWith("/") ? url : `/${url}`}`;
};

export const buildStorefrontImageUrl = (value?: string | null) =>
  resolveStorefrontMediaUrl(value) || PLACEHOLDER_IMAGE;

export const storefrontQueryKeys = {
  all: ["storefront"] as const,
  home: () => [...storefrontQueryKeys.all, "home"] as const,
  categories: () => [...storefrontQueryKeys.all, "categories"] as const,
  catalog: (params: Record<string, string | number | undefined> = {}) =>
    [...storefrontQueryKeys.all, "catalog", normalizeQueryParams(params)] as const,
  product: (slug: string) => [...storefrontQueryKeys.all, "product", slug] as const,
  slugs: () => [...storefrontQueryKeys.all, "slugs"] as const,
  searchSuggestions: (q: string) =>
    [...storefrontQueryKeys.all, "search-suggestions", q.trim().toLowerCase()] as const,
};

const getServerQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: STALE_TIME_MS,
        },
      },
    }),
);

const normalizeQueryParams = (
  params: Record<string, string | number | undefined> = {},
) =>
  Object.fromEntries(
    Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== "" && value !== "all")
      .sort(([left], [right]) => left.localeCompare(right)),
  );

const storefrontFetch = async <T>(path: string): Promise<T> => {
  const response = await fetch(buildStorefrontUrl(path), {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(
      `Storefront backend request failed: ${response.status} ${response.statusText} (${path})`,
    );
  }

  return response.json() as Promise<T>;
};

const toDiscountPercent = (price: number, oldPrice?: number | null) => {
  if (!oldPrice || oldPrice <= price || oldPrice <= 0) return 0;
  return Math.max(0, Math.round(((oldPrice - price) / oldPrice) * 100));
};

export const mapStorefrontProduct = (
  product: StorefrontProductCard,
): Product => {
  const gallery = [
    product.mainImage,
    ...(Array.isArray(product.gallery) ? product.gallery : []),
  ]
    .map(buildStorefrontImageUrl)
    .filter(Boolean);
  const images = Array.from(new Set(gallery));
  const imageSizes = product.imageSizes
    ? {
        thumb: buildStorefrontImageUrl(product.imageSizes.thumb),
        medium: buildStorefrontImageUrl(product.imageSizes.medium),
        large: buildStorefrontImageUrl(product.imageSizes.large),
        original: buildStorefrontImageUrl(product.imageSizes.original),
      }
    : undefined;
  const thumbnail = imageSizes?.thumb || images[0] || PLACEHOLDER_IMAGE;
  const productImages = Array.from(
    new Set([
      imageSizes?.medium,
      imageSizes?.large,
      ...images,
    ].filter(Boolean) as string[]),
  );

  return {
    id: product.id,
    slug: product.slug || product.id,
    title: product.name,
    price: Number(product.price || 0),
    oldPrice: product.oldPrice ?? null,
    discount: toDiscountPercent(
      Number(product.price || 0),
      Number(product.oldPrice || 0) || null,
    ),
    rating: 4,
    thumbnail,
    imageSizes,
    images: productImages.length ? productImages : [PLACEHOLDER_IMAGE],
    brand: product.brand || undefined,
    status: product.availability?.label,
    shortDescription: product.shortDescription || undefined,
    availabilityLabel: product.availability?.label,
    isInStock: product.availability?.isInStock,
    labels: product.labels || [],
    categories: product.category ? [safeDecode(product.category)] : [],
    published: true,
  };
};

const mapStorefrontProductDetails = (
  product: StorefrontProductDetails,
): Product => ({
  ...mapStorefrontProduct(product),
  name: product.name,
  description: product.fullDescription || product.shortDescription || "",
  fullDescription: product.fullDescription || product.shortDescription || "",
  attributes: product.attributes || [],
  variants: mapStorefrontProductVariants(product),
  videoUrl: product.videoUrl || null,
});

const mapStorefrontProductVariants = (
  product: StorefrontProductDetails,
): ProductVariant[] => {
  if (!Array.isArray(product.variants)) return [];

  return product.variants
    .map((variant): ProductVariant | null => {
      const id = String(variant.id || "").trim();
      const label = String(variant.label || variant.title || variant.name || "").trim();
      if (!id || !label) return null;

      const variantImages = [
        variant.mainImage,
        ...(Array.isArray(variant.images) ? variant.images : []),
        ...(Array.isArray(variant.gallery) ? variant.gallery : []),
      ]
        .filter(Boolean)
        .map((url) => buildStorefrontImageUrl(url as string));
      const productImages = [
        product.mainImage,
        ...(Array.isArray(product.gallery) ? product.gallery : []),
      ]
        .filter(Boolean)
        .map((url) => buildStorefrontImageUrl(url as string));

      const images = Array.from(
        new Set(variantImages.length ? variantImages : productImages),
      );

      const variantAttributes = Array.isArray(variant.attributes)
        ? variant.attributes
        : [];

      return {
        id,
        title: label,
        cpu: String(variant.cpu || "").trim(),
        ram: Number(variant.ram || 0),
        storage: String(variant.storage || "").trim(),
        color: String(variant.color || "").trim(),
        price: Number(variant.price || product.price || 0),
        oldPrice:
          variant.oldPrice === null || variant.oldPrice === undefined
            ? undefined
            : Number(variant.oldPrice),
        warehouse: variant.warehouse || undefined,
        inStock: variant.inStock ?? (Number(variant.stockQty || 0) > 0),
        description: variant.description || null,
        attributes: variantAttributes,
        images: images.length ? images : [buildStorefrontImageUrl(product.mainImage)],
      };
    })
    .filter((variant): variant is ProductVariant => Boolean(variant));
};

export const mapStorefrontCategory = (
  category: StorefrontCategory,
): Category => ({
  id: category.slug || category.name,
  name: category.name,
  slug: category.slug || category.name,
  image: buildStorefrontImageUrl(category.image),
  parent: [],
  description: `${category.totalProducts} товаров`,
});

const mapStorefrontBrand = (
  brand: StorefrontBrand,
  products: Product[],
): Brand => {
  const linkedProduct = products.find(
    (product) =>
      String(product.brand || "").toLowerCase() === brand.name.toLowerCase(),
  );

  return {
    id: brand.slug || brand.name,
    name: brand.name,
    slug: brand.slug || brand.name,
    type: "brand",
    image: linkedProduct?.thumbnail || PLACEHOLDER_IMAGE,
  };
};

const toMeta = (catalog: StorefrontCatalogResponse): Meta => ({
  page: catalog.page,
  pageSize: catalog.pageSize,
  total: catalog.total,
  totalPage: catalog.totalPages,
});

const buildCatalogPath = (params: Record<string, string | number | undefined>) => {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "" || value === "all") continue;
    searchParams.set(key, String(value));
  }

  const query = searchParams.toString();
  return `/storefront/catalog${query ? `?${query}` : ""}`;
};

export const storefrontHomeQueryOptions = () =>
  queryOptions({
    queryKey: storefrontQueryKeys.home(),
    staleTime: STALE_TIME_MS,
    queryFn: () => storefrontFetch<StorefrontHomeResponse>("/storefront/home"),
  });

export const storefrontCatalogQueryOptions = (
  params: StorefrontCatalogParams = {},
) => {
  const normalizedParams = normalizeQueryParams(params);

  return queryOptions({
    queryKey: storefrontQueryKeys.catalog(normalizedParams),
    staleTime: STALE_TIME_MS,
    queryFn: () =>
      storefrontFetch<StorefrontCatalogResponse>(
        buildCatalogPath(normalizedParams),
      ),
  });
};

export const storefrontProductsQueryOptions = (
  params: StorefrontCatalogParams = {},
) => {
  const normalizedParams = normalizeQueryParams({ pageSize: 48, ...params });
  return queryOptions({
    queryKey: [...storefrontQueryKeys.catalog(normalizedParams), "products"] as const,
    staleTime: STALE_TIME_MS,
    queryFn: () =>
      storefrontFetch<StorefrontCatalogResponse>(
        buildCatalogPath(normalizedParams),
      ).then((catalog) => catalog.items.map(mapStorefrontProduct)),
  });
};

export type StorefrontInfinitePage = {
  items: Product[];
  nextPage: number | undefined;
  total: number;
  totalPages: number;
  filters: StorefrontCatalogResponse["filters"] | undefined;
};

export const storefrontInfiniteCatalogQueryOptions = (
  params: StorefrontCatalogParams = {},
) => {
  const normalizedParams = normalizeQueryParams({ pageSize: 24, ...params });
  return infiniteQueryOptions({
    queryKey: [...storefrontQueryKeys.catalog(normalizedParams), "infinite"] as const,
    staleTime: STALE_TIME_MS,
    initialPageParam: 1,
    queryFn: ({ pageParam }): Promise<StorefrontInfinitePage> =>
      storefrontFetch<StorefrontCatalogResponse>(
        buildCatalogPath({ ...normalizedParams, page: pageParam as number }),
      ).then((catalog) => ({
        items: catalog.items.map(mapStorefrontProduct),
        nextPage: catalog.page < catalog.totalPages ? catalog.page + 1 : undefined,
        total: catalog.total,
        totalPages: catalog.totalPages,
        filters: catalog.filters,
      })),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};

export const storefrontProductPageQueryOptions = (
  page = 1,
  pageSize = 28,
) =>
  queryOptions({
    queryKey: [
      ...storefrontQueryKeys.catalog({ page, pageSize }),
      "page",
    ] as const,
    staleTime: STALE_TIME_MS,
    queryFn: async (): Promise<ProductPage> => {
      const catalog = await getStorefrontCatalog({ page, pageSize });
      return {
        meta: toMeta(catalog),
        result: catalog.items.map(mapStorefrontProduct),
      };
    },
  });

export const storefrontCategoriesQueryOptions = () =>
  queryOptions({
    queryKey: storefrontQueryKeys.categories(),
    staleTime: CATEGORY_STALE_TIME_MS,
    gcTime: STOREFRONT_CATEGORY_GC_TIME_MS,
    queryFn: () =>
      storefrontFetch<StorefrontCategory[]>("/storefront/categories").then(
        (categories) => categories.map(mapStorefrontCategory),
      ),
  });

export const storefrontProductQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: storefrontQueryKeys.product(slug),
    staleTime: STALE_TIME_MS,
    queryFn: () =>
      storefrontFetch<StorefrontProductDetails>(
        `/storefront/products/${encodeURIComponent(slug)}`,
      ).then((product): StorefrontProductPayload => ({
        product: mapStorefrontProductDetails(product),
        relatedProducts: (product.relatedProducts || []).map(mapStorefrontProduct),
        recommendedProducts: (product.recommendedProducts || []).map(
          mapStorefrontProduct,
        ),
      })),
  });

export const storefrontSlugsQueryOptions = () =>
  queryOptions({
    queryKey: storefrontQueryKeys.slugs(),
    staleTime: STALE_TIME_MS,
    queryFn: async () => {
      const catalog = await storefrontFetch<StorefrontCatalogResponse>(
        buildCatalogPath({ pageSize: 48 }),
      );
      return catalog.items.map((product) => ({ slug: product.slug || product.id }));
    },
  });

const getHeroSlides = (
  home: StorefrontHomeResponse,
): StorefrontHeroSlide[] => {
  const slides = Array.isArray(home.hero?.slides) && home.hero.slides.length
    ? home.hero.slides
    : home.hero
      ? [home.hero]
      : [];
  const seen = new Set<string>();

  return slides
    .filter((slide) =>
      Boolean(
        String(slide.title || "").trim() ||
          String(slide.subtitle || "").trim() ||
          String(slide.backgroundImageUrl || "").trim() ||
          String(slide.mobileBackgroundImageUrl || "").trim(),
      ),
    )
    .filter((slide) => {
      const key = [
        slide.title,
        slide.subtitle,
        slide.primaryCtaLabel,
        slide.primaryCtaHref,
        slide.backgroundImageUrl,
        slide.mobileBackgroundImageUrl,
      ]
        .map((value) => String(value || "").trim())
        .join("|");

      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
};

export const mapStorefrontHeroCarousel = (
  home: StorefrontHomeResponse,
): StorefrontHeroCarouselItem[] =>
  getHeroSlides(home).map((slide, index) => ({
    id: [
      slide.title,
      slide.primaryCtaHref,
      slide.backgroundImageUrl,
      slide.mobileBackgroundImageUrl,
      index,
    ]
      .map((value) => String(value || "").trim())
      .filter(Boolean)
      .join("-"),
    title: slide.title,
    imgUrl: resolveStorefrontMediaUrl(slide.backgroundImageUrl),
    mobileImgUrl: resolveStorefrontMediaUrl(slide.mobileBackgroundImageUrl),
    buttonText: slide.primaryCtaLabel,
    buttonLink: slide.primaryCtaHref,
    description: slide.subtitle,
  }));

export type SearchSuggestion = {
  id: string;
  slug: string;
  name: string;
  price: number;
  category?: string;
  brand?: string;
  image?: string;
  matchedAttribute?: string | null;
};

export const SEARCH_SUGGESTIONS_MIN_LENGTH = 2;
export const SEARCH_SUGGESTIONS_STALE_TIME_MS = 30_000;

export const getSearchSuggestions = async (q: string): Promise<SearchSuggestion[]> => {
  const trimmed = String(q || "").trim();
  if (trimmed.length < SEARCH_SUGGESTIONS_MIN_LENGTH) return [];
  try {
    const url = buildStorefrontUrl(
      `/storefront/search/suggestions?q=${encodeURIComponent(trimmed)}`,
    );
    const response = await fetch(url);
    if (!response.ok) return [];
    return response.json();
  } catch {
    return [];
  }
};

export const storefrontSearchSuggestionsQueryOptions = (q: string) => {
  const normalized = q.trim();
  return queryOptions({
    queryKey: storefrontQueryKeys.searchSuggestions(normalized),
    staleTime: SEARCH_SUGGESTIONS_STALE_TIME_MS,
    queryFn: () => getSearchSuggestions(normalized),
    enabled: normalized.length >= SEARCH_SUGGESTIONS_MIN_LENGTH,
  });
};

export const getStorefrontHome = () =>
  getServerQueryClient().fetchQuery(storefrontHomeQueryOptions());

export const getSafeStorefrontHome = async (): Promise<StorefrontHomeResponse> => {
  try {
    return await getStorefrontHome();
  } catch (error) {
    console.error("[storefront] Failed to load home data", error);
    return EMPTY_STOREFRONT_HOME;
  }
};

export const getStorefrontCatalog = (
  params: StorefrontCatalogParams = {},
) => getServerQueryClient().fetchQuery(storefrontCatalogQueryOptions(params));

export const getSafeStorefrontCatalog = async (
  params: StorefrontCatalogParams = {},
): Promise<StorefrontCatalogResponse | null> => {
  try {
    return await getStorefrontCatalog(params);
  } catch (error) {
    console.error("[storefront] Failed to load catalog", { params, error });
    return null;
  }
};

export const getProductPage = async (
  page = 1,
  pageSize = 28,
): Promise<ProductPage> => {
  return getServerQueryClient().fetchQuery(
    storefrontProductPageQueryOptions(page, pageSize),
  );
};

export const getProducts = async (
  params: StorefrontCatalogParams = {},
) => {
  return getServerQueryClient().fetchQuery(
    storefrontProductsQueryOptions(params),
  );
};

export const getSafeProducts = async (
  params: StorefrontCatalogParams = {},
): Promise<Product[]> => {
  try {
    return await getProducts(params);
  } catch (error) {
    console.error("[storefront] Failed to load catalog products", {
      params,
      error,
    });
    return [];
  }
};

export const getCategories = async () => {
  return getServerQueryClient().fetchQuery(storefrontCategoriesQueryOptions());
};

export const getBrands = async () => {
  const catalog = await getStorefrontCatalog({ pageSize: 48 });
  const products = catalog.items.map(mapStorefrontProduct);
  return catalog.filters.brands.map((brand) => mapStorefrontBrand(brand, products));
};

export const getProductBySlug = async (slug: string) => {
  return getServerQueryClient().fetchQuery(storefrontProductQueryOptions(slug));
};

export const getSafeProductBySlug = async (
  slug: string,
): Promise<StorefrontProductPayload | null> => {
  try {
    return await getProductBySlug(slug);
  } catch (error) {
    console.error("[storefront] Failed to load product", { slug, error });
    return null;
  }
};

export const getProductSlugs = async () => {
  return getServerQueryClient().fetchQuery(storefrontSlugsQueryOptions());
};

// ─── Blog ────────────────────────────────────────────────────────────────────

export type StorefrontBlogPostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl?: string;
  coverVideoUrl?: string;
  category?: string;
  tags: string[];
  authorName?: string;
  authorRole?: string;
  publishedAt: string;
  views: number;
};

export type StorefrontBlogPostDetails = StorefrontBlogPostSummary & {
  content: string;
  recentPosts: StorefrontBlogPostSummary[];
  featuredProducts: StorefrontProductCard[];
  categories: StorefrontBlogCategory[];
  availableTags: StorefrontBlogTag[];
};

export type StorefrontBlogCategory = {
  name: string;
  slug: string;
  totalPosts: number;
};

export type StorefrontBlogTag = {
  name: string;
  slug: string;
  totalPosts: number;
};

export type StorefrontBlogListResponse = {
  enabled: boolean;
  items: StorefrontBlogPostSummary[];
  recentPosts: StorefrontBlogPostSummary[];
  categories: StorefrontBlogCategory[];
  tags: StorefrontBlogTag[];
  total: number;
  query?: string;
  selectedCategory?: string;
  selectedTag?: string;
};

const buildBlogPath = (params?: { q?: string; category?: string; tag?: string }) => {
  if (!params) return "/storefront/blogs";
  const qs = new URLSearchParams();
  if (params.q) qs.set("q", params.q);
  if (params.category) qs.set("category", params.category);
  if (params.tag) qs.set("tag", params.tag);
  const str = qs.toString();
  return str ? `/storefront/blogs?${str}` : "/storefront/blogs";
};

export const storefrontBlogQueryKeys = {
  all: ["storefront", "blog"] as const,
  list: (params?: { q?: string; category?: string; tag?: string }) =>
    [...storefrontBlogQueryKeys.all, "list", params ?? {}] as const,
  post: (slug: string) => [...storefrontBlogQueryKeys.all, "post", slug] as const,
};

export const storefrontBlogListQueryOptions = (params?: {
  q?: string;
  category?: string;
  tag?: string;
}) =>
  queryOptions({
    queryKey: storefrontBlogQueryKeys.list(params),
    staleTime: STALE_TIME_MS,
    queryFn: () => storefrontFetch<StorefrontBlogListResponse>(buildBlogPath(params)),
  });

export const storefrontBlogPostQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: storefrontBlogQueryKeys.post(slug),
    staleTime: STALE_TIME_MS,
    queryFn: () =>
      storefrontFetch<StorefrontBlogPostDetails>(`/storefront/blogs/${encodeURIComponent(slug)}`),
  });

export const getBlogList = async (params?: {
  q?: string;
  category?: string;
  tag?: string;
}): Promise<StorefrontBlogListResponse> => {
  try {
    return await getServerQueryClient().fetchQuery(storefrontBlogListQueryOptions(params));
  } catch {
    return { enabled: false, items: [], recentPosts: [], categories: [], tags: [], total: 0 };
  }
};

export const getBlogPost = async (slug: string): Promise<StorefrontBlogPostDetails | null> => {
  try {
    return await getServerQueryClient().fetchQuery(storefrontBlogPostQueryOptions(slug));
  } catch {
    return null;
  }
};

export const getBlogSlugs = async (): Promise<string[]> => {
  try {
    const list = await getBlogList();
    return list.items.map((p) => p.slug).filter(Boolean);
  } catch {
    return [];
  }
};

// ─── Vacancies ────────────────────────────────────────────────────────────────

export type StorefrontVacancy = {
  id: string;
  title: string;
  role?: string | null;
  branchName?: string | null;
  status?: "open" | "paused" | "closed";
  headcount?: number;
  formSlug?: string | null;
  description?: string | null;
  requirements?: string | null;
  salaryText?: string | null;
  workFormat?: string | null;
  workSchedule?: string | null;
  workAddress?: string | null;
  bannerImageUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type StorefrontVacanciesResponse = {
  items: StorefrontVacancy[];
  total: number;
};

export const storefrontVacanciesQueryKeys = {
  all: ["storefront", "vacancies"] as const,
  list: () => [...storefrontVacanciesQueryKeys.all, "list"] as const,
  detail: (id: string) => [...storefrontVacanciesQueryKeys.all, id] as const,
};

export const storefrontVacanciesQueryOptions = () =>
  queryOptions({
    queryKey: storefrontVacanciesQueryKeys.list(),
    staleTime: STALE_TIME_MS,
    queryFn: () =>
      storefrontFetch<StorefrontVacanciesResponse>("/storefront/vacancies"),
  });

export const storefrontVacancyQueryOptions = (id: string) =>
  queryOptions({
    queryKey: storefrontVacanciesQueryKeys.detail(id),
    staleTime: STALE_TIME_MS,
    queryFn: () =>
      storefrontFetch<StorefrontVacancy>(`/storefront/vacancies/${encodeURIComponent(id)}`),
  });

export const getVacancies = async (): Promise<StorefrontVacanciesResponse> => {
  try {
    return await getServerQueryClient().fetchQuery(storefrontVacanciesQueryOptions());
  } catch {
    return { items: [], total: 0 };
  }
};

export const getVacancy = async (id: string): Promise<StorefrontVacancy | null> => {
  try {
    return await getServerQueryClient().fetchQuery(storefrontVacancyQueryOptions(id));
  } catch {
    return null;
  }
};
