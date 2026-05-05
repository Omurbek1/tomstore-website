import { getTranslations } from "next-intl/server";
import Brand from "@models/Brand.model";
import Product from "@models/product.model";
import {
  getStorefrontHome,
  mapStorefrontCategory,
  mapStorefrontHeroCarousel,
  mapStorefrontProduct,
} from "@utils/__api__/storefront";
import HomeHeroSection from "@sections/home/HomeHeroSection";
import HomePopularCategoriesSection from "@sections/home/HomePopularCategoriesSection";
import HomeProductCarouselSection from "@sections/home/HomeProductCarouselSection";
import HomeNewArrivalsSection from "@sections/home/HomeNewArrivalsSection";
import HomeStorefrontHighlightsSection from "@sections/home/HomeStorefrontHighlightsSection";
import HomeRecommendedProductsSection from "@sections/home/HomeRecommendedProductsSection";

const uniqueProducts = (products: Product[]) => {
  const seen = new Set<string | number>();
  return products.filter((product) => {
    if (seen.has(product.id)) return false;
    seen.add(product.id);
    return true;
  });
};

const buildHomeBrands = (
  brands: Array<{ name: string; slug: string }>,
  products: Product[],
): Brand[] =>
  brands.map((brand) => {
    const linkedProduct = products.find(
      (product) =>
        String(product.brand || "").toLowerCase() === brand.name.toLowerCase(),
    );

    return {
      id: brand.slug || brand.name,
      name: brand.name,
      slug: brand.slug || brand.name,
      type: "brand",
      image: linkedProduct?.thumbnail || "/assets/images/products/iphone-xi.png",
    };
  });

export default async function HomePage() {
  const [home, t] = await Promise.all([
    getStorefrontHome(),
    getTranslations("home"),
  ]);

  const heroSlides = mapStorefrontHeroCarousel(home);
  const categories = home.categories.slice(0, 8).map(mapStorefrontCategory);
  const saleProducts = home.saleProducts.slice(0, 12).map(mapStorefrontProduct);
  const newProducts = home.newProducts.slice(0, 12).map(mapStorefrontProduct);
  const popularProducts = home.popularProducts.slice(0, 8).map(mapStorefrontProduct);
  const recommendedProducts = (
    home.recommendedProducts.length ? home.recommendedProducts : home.popularProducts
  )
    .slice(0, 12)
    .map(mapStorefrontProduct);
  const brandSourceProducts = uniqueProducts([
    ...popularProducts,
    ...recommendedProducts,
    ...saleProducts,
    ...newProducts,
  ]);
  const featuredBrands = buildHomeBrands(home.brands.slice(0, 12), brandSourceProducts);

  return (
    <main>
      <HomeHeroSection slides={heroSlides} />
      <HomePopularCategoriesSection
        categories={categories}
        title={t("topCategories")}
      />
      <HomeProductCarouselSection
        iconName="light"
        products={saleProducts}
        title={t("flashDeals")}
        seeMoreLink="/catalog/all?label=sale&sort=popular"
      />
      <HomeNewArrivalsSection
        products={newProducts}
        title={t("newArrivals")}
      />
      <HomeStorefrontHighlightsSection
        products={popularProducts.slice(0, 4)}
        brands={featuredBrands}
        topProductsTitle={t("topRatings")}
        featuredBrandsTitle={t("featuredBrands")}
      />
      <HomeRecommendedProductsSection
        products={recommendedProducts}
        title={t("moreForYou")}
      />
    </main>
  );
}
