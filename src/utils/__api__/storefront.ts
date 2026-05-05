import { cache } from "react";
import { QueryClient, queryOptions } from "@tanstack/react-query";
import Brand from "@models/Brand.model";
import Category from "@models/category.model";
import Product from "@models/product.model";
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
  updatedAt?: string;
  createdAt?: string;
};

type StorefrontProductDetails = StorefrontProductCard & {
  fullDescription?: string;
  attributes?: Array<{ name: string; value: string }>;
  relatedProducts?: StorefrontProductCard[];
  recommendedProducts?: StorefrontProductCard[];
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

const PLACEHOLDER_IMAGE = "/assets/images/products/iphone-xi.png";
const DEFAULT_BACKEND_URL = "http://127.0.0.1:3000";
const REVALIDATE_SECONDS = 60;
const STALE_TIME_MS = REVALIDATE_SECONDS * 1000;
const CATEGORY_STALE_TIME_MS = 10 * 60 * 1000;

const trimTrailingSlashes = (value?: string | null) =>
  String(value || "").replace(/\/+$/, "");

const getBackendUrl = () =>
  trimTrailingSlashes(
    process.env.BACKEND_URL ||
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      DEFAULT_BACKEND_URL,
  );

const buildStorefrontUrl = (path: string) =>
  `${getBackendUrl()}${path.startsWith("/") ? path : `/${path}`}`;

export const resolveStorefrontMediaUrl = (value?: string | null) => {
  const url = String(value || "").trim();
  if (!url) return undefined;
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("data:")
  ) {
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
    thumbnail: images[0] || PLACEHOLDER_IMAGE,
    images: images.length ? images : [PLACEHOLDER_IMAGE],
    brand: product.brand || undefined,
    status: product.availability?.label,
    shortDescription: product.shortDescription || undefined,
    availabilityLabel: product.availability?.label,
    isInStock: product.availability?.isInStock,
    labels: product.labels || [],
    categories: product.category ? [product.category] : [],
    published: true,
  };
};

const mapStorefrontProductDetails = (
  product: StorefrontProductDetails,
): Product => ({
  ...mapStorefrontProduct(product),
  fullDescription: product.fullDescription || product.shortDescription || "",
  attributes: product.attributes || [],
});

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
) =>
  queryOptions({
    queryKey: [...storefrontQueryKeys.catalog(params), "products"] as const,
    staleTime: STALE_TIME_MS,
    queryFn: () =>
      getStorefrontCatalog({ pageSize: 12, ...params }).then((catalog) =>
        catalog.items.map(mapStorefrontProduct),
      ),
  });

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
    gcTime: 30 * 60 * 1000,
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
          String(slide.backgroundImageUrl || "").trim(),
      ),
    )
    .filter((slide) => {
      const key = [
        slide.title,
        slide.subtitle,
        slide.primaryCtaLabel,
        slide.primaryCtaHref,
        slide.backgroundImageUrl,
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
      index,
    ]
      .map((value) => String(value || "").trim())
      .filter(Boolean)
      .join("-"),
    title: slide.title,
    imgUrl: resolveStorefrontMediaUrl(slide.backgroundImageUrl),
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

export const getSearchSuggestions = async (q: string): Promise<SearchSuggestion[]> => {
  if (!q || q.trim().length < 2) return [];
  try {
    const url = buildStorefrontUrl(
      `/storefront/search/suggestions?q=${encodeURIComponent(q.trim())}`,
    );
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) return [];
    return response.json();
  } catch {
    return [];
  }
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

export const getProductSlugs = async () => {
  return getServerQueryClient().fetchQuery(storefrontSlugsQueryOptions());
};
