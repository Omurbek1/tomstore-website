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
  discount: number;
  thumbnail: string;
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
}

export default Product;
