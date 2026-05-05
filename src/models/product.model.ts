import Shop from "./shop.model";
import Review from "./Review.model";

interface Product {
  unit?: any;
  slug: string;
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
}

export default Product;
