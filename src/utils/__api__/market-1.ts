import Shop from "@models/shop.model";
import Brand from "@models/Brand.model";
import Product from "@models/product.model";
import Service from "@models/service.model";
import Category from "@models/category.model";
import MainCarouselItem from "@models/market-1.model";
import {
  getBrands as getStorefrontBrands,
  getCategories as getStorefrontCategories,
  getStorefrontHome,
  mapStorefrontCategory,
  mapStorefrontProduct,
} from "./storefront";

const getTopRatedProduct = async (): Promise<Product[]> => {
  const home = await getStorefrontHome();
  return home.popularProducts.slice(0, 4).map(mapStorefrontProduct);
};

const getPopularProducts = async (): Promise<Product[]> => {
  const home = await getStorefrontHome();
  return home.popularProducts.map(mapStorefrontProduct);
};

const getRecommendedProducts = async (): Promise<Product[]> => {
  const home = await getStorefrontHome();
  const source = home.recommendedProducts.length
    ? home.recommendedProducts
    : home.popularProducts;
  return source.map(mapStorefrontProduct);
};

const getHitProducts = async (): Promise<Product[]> => {
  const home = await getStorefrontHome();
  const source = home.hitProducts.length ? home.hitProducts : home.popularProducts;
  return source.map(mapStorefrontProduct);
};

const getSaleProducts = async (): Promise<Product[]> => {
  const home = await getStorefrontHome();
  const source = home.saleProducts.length ? home.saleProducts : home.popularProducts;
  return source.map(mapStorefrontProduct);
};

const getTopRatedBrand = async (): Promise<Brand[]> => {
  return getStorefrontBrands();
};

const getNewArrivalList = async (): Promise<Product[]> => {
  const home = await getStorefrontHome();
  const source = home.newProducts.length ? home.newProducts : home.popularProducts;
  return source.slice(0, 12).map(mapStorefrontProduct);
};

const getCarBrands = async (): Promise<Brand[]> => {
  return getStorefrontBrands();
};

const getCarList = async (): Promise<Product[]> => {
  const home = await getStorefrontHome();
  return home.popularProducts.slice(0, 9).map(mapStorefrontProduct);
};

const getMobileBrands = async (): Promise<Brand[]> => {
  return getStorefrontBrands();
};

const getMobileShops = async (): Promise<Shop[]> => {
  return [];
};

const getMobileList = async (): Promise<Product[]> => {
  const home = await getStorefrontHome();
  const source = home.newProducts.length ? home.newProducts : home.popularProducts;
  return source.slice(0, 9).map(mapStorefrontProduct);
};

const getOpticsBrands = async (): Promise<Brand[]> => {
  return getStorefrontBrands();
};

const getOpticsShops = async (): Promise<Shop[]> => {
  return [];
};

const getOpticsList = async (): Promise<Product[]> => {
  const home = await getStorefrontHome();
  const source = home.recommendedProducts.length
    ? home.recommendedProducts
    : home.popularProducts;
  return source.slice(0, 9).map(mapStorefrontProduct);
};

const getCategories = async (): Promise<Category[]> => {
  return getStorefrontCategories();
};

const getMoreItems = async (): Promise<Product[]> => {
  const home = await getStorefrontHome();
  const source = home.recommendedProducts.length
    ? home.recommendedProducts
    : home.popularProducts;
  return source.slice(0, 12).map(mapStorefrontProduct);
};

const getServiceList = async (): Promise<Service[]> => {
  return [];
};

const getMainCarousel = async (): Promise<[MainCarouselItem]> => {
  return [
    {
      id: 1,
      title: "TOMSTORE",
      imgUrl: "/assets/images/products/iphone-xi.png",
      buttonText: "Смотреть каталог",
      buttonLink: "/sale-page-1",
      description: "Актуальные товары из CRM",
    } as MainCarouselItem,
  ];
};

const getFlashDeals = async (): Promise<Product[]> => {
  return getSaleProducts().then((products) => products.slice(0, 12));
};

const getTopCategories = async (): Promise<Category[]> => {
  const home = await getStorefrontHome();
  return home.categories.map(mapStorefrontCategory);
};

const getBigDiscountList = async (): Promise<Product[]> => {
  return getSaleProducts().then((products) => products.slice(0, 12));
};

export default {
  getCarList,
  getCarBrands,
  getMoreItems,
  getHitProducts,
  getFlashDeals,
  getSaleProducts,
  getMobileList,
  getCategories,
  getOpticsList,
  getServiceList,
  getPopularProducts,
  getRecommendedProducts,
  getMobileShops,
  getOpticsShops,
  getMainCarousel,
  getMobileBrands,
  getOpticsBrands,
  getTopCategories,
  getTopRatedBrand,
  getNewArrivalList,
  getBigDiscountList,
  getTopRatedProduct
};
