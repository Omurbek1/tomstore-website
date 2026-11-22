import Shop from "./shop.model";
import Review from "./Review.model";

export type ProductVariant = {
  id: string;
  title: string;
  cpu: string;
  ram: number;
  storage: string;
  color: string;
  price: number;
  oldPrice?: number;
  warehouse?: string;
  inStock: boolean;
  description?: string | null;
  attributes?: Array<{ name: string; value: string }>;
  images: string[];
};

interface Product {
  unit?: any;
  slug: string;
  name?: string;
  description?: string;
  price: number;
  title: string;
  rating: number;
  reviewCount?: number;
  discount: number;
  thumbnail: string;
  imageSizes?: {
    thumb?: string;
    medium?: string;
    large?: string;
    original?: string;
  };
  id: string;
  shop?: Shop;
  brand?: string;
  size?: string[];
  status?: string;
  colors?: string[];
  images?: string[];
  categories: any[];
  reviews?: Review[];
  published?: boolean;
  oldPrice?: number | null;
  shortDescription?: string;
  fullDescription?: string;
  availabilityLabel?: string;
  isInStock?: boolean;
  labels?: string[];
  attributes?: Array<{ name: string; value: string }>;
  variants?: ProductVariant[];
  videoUrl?: string | null;
  /** Филиал, по которому посчитаны price/oldPrice (null — базовая/по умолчанию). */
  priceBranchId?: string | null;
  /** Цены и наличие по магазинам (только на странице товара). */
  branchPrices?: Array<{
    branchId: string;
    branchName: string;
    price: number;
    oldPrice?: number | null;
    inStock?: boolean;
  }>;
  priceRange?: { low: number; high: number } | null;
}

export default Product;
