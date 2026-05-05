import Product from "@models/product.model";
import Shop from "@models/shop.model";
import {
  getProductBySlug,
  getProductSlugs,
  getProducts,
} from "./storefront";

// get all product slug
const getSlugs = async (): Promise<{ slug: string }[]> => {
  return getProductSlugs();
};

// get product based on slug
const getProduct = async (slug: string): Promise<Product> => {
  const { product } = await getProductBySlug(slug);
  return product;
};

const getFrequentlyBought = async (): Promise<Product[]> => {
  return getProducts({ sort: "popular", pageSize: 3 });
};

const getRelatedProducts = async (): Promise<Product[]> => {
  return getProducts({ sort: "popular", pageSize: 4 });
};

const getAvailableShop = async (): Promise<Shop[]> => {
  return [];
};

export default { getSlugs, getProduct, getFrequentlyBought, getRelatedProducts, getAvailableShop };
