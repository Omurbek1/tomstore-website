import Box from "@component/Box";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import Container from "@component/Container";
import TopRatedProductCard from "@component/product-cards/TopRatedProductCard";
import BrandShowcaseCard from "@component/product-cards/BrandShowcaseCard";
import CategorySectionHeader from "@component/CategorySectionHeader";
import { Link } from "i18n/navigation";
import Brand from "@models/Brand.model";
import Product from "@models/product.model";

type HomeStorefrontHighlightsSectionProps = {
  products: Product[];
  brands: Brand[];
  topProductsTitle: string;
  featuredBrandsTitle: string;
};

export default function HomeStorefrontHighlightsSection({
  products,
  brands,
  topProductsTitle,
  featuredBrandsTitle,
}: HomeStorefrontHighlightsSectionProps) {
  const featuredBrands = brands.slice(0, 2);
  const hasTopProducts = products.length > 0;
  const hasFeaturedBrands = featuredBrands.length > 0;

  if (!hasTopProducts && !hasFeaturedBrands) return null;

  return (
    <Box mb="3.75rem">
      <Container>
        <Grid container spacing={6}>
          {hasTopProducts && (
            <Grid item lg={hasFeaturedBrands ? 6 : 12} xs={12}>
              <CategorySectionHeader
                iconName="ranking-1"
                title={topProductsTitle}
                seeMoreLink="/catalog/all?sort=popular"
              />

              <Card p="1rem" borderRadius={8}>
                <Grid container spacing={4}>
                  {products.map((product) => (
                    <Grid item md={3} sm={6} xs={6} key={product.id}>
                      <Link href={`/product/${product.slug}`}>
                        <TopRatedProductCard
                          title={product.title}
                          price={product.price}
                          imgUrl={product.thumbnail}
                          rating={product.rating || 4}
                          reviewCount={product.reviews?.length || 12}
                        />
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Grid>
          )}

          {hasFeaturedBrands && (
            <Grid item md={hasTopProducts ? 6 : 12} xs={12}>
              <CategorySectionHeader
                iconName="Group"
                title={featuredBrandsTitle}
                seeMoreLink="/catalog/all?sort=popular"
              />

              <Card p="1rem" borderRadius={8}>
                <Grid container spacing={4}>
                  {featuredBrands.map((brand) => (
                    <Grid item sm={6} xs={12} key={brand.id}>
                      <Link href={`/catalog/all?brand=${brand.slug}&sort=popular`}>
                        <BrandShowcaseCard title={brand.name} imgUrl={brand.image} />
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
