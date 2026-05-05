import Box from "@component/Box";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import Container from "@component/Container";
import ProductCard4 from "@component/product-cards/ProductCard4";
import ProductCard5 from "@component/product-cards/ProductCard5";
import CategorySectionHeader from "@component/CategorySectionHeader";
import { getTranslations } from "next-intl/server";
import { Link } from "i18n/navigation";
// API FUNCTIONS
import api from "@utils/__api__/market-1";

export default async function Section4() {
  const t = await getTranslations("home");
  const [topRatedList, topRatedBrands] = await Promise.all([
    api.getTopRatedProduct(),
    api.getTopRatedBrand()
  ]);
  const featuredBrands = topRatedBrands.slice(0, 2);
  const hasTopRatedProducts = topRatedList.length > 0;
  const hasFeaturedBrands = featuredBrands.length > 0;

  if (!hasTopRatedProducts && !hasFeaturedBrands) return null;

  return (
    <Box mb="3.75rem">
      <Container>
        <Grid container spacing={6}>
          {hasTopRatedProducts && (
            <Grid item lg={hasFeaturedBrands ? 6 : 12} xs={12}>
              <CategorySectionHeader
                iconName="ranking-1"
                title={t("topRatings")}
                seeMoreLink="/catalog/all?sort=popular"
              />

              <Card p="1rem" borderRadius={8}>
                <Grid container spacing={4}>
                  {topRatedList.map((item) => (
                    <Grid item md={3} sm={6} xs={6} key={item.id}>
                      <Link href={`/product/${item.slug}`}>
                        <ProductCard4
                          title={item.title}
                          price={item.price}
                          imgUrl={item.thumbnail}
                          rating={item.rating || 4}
                          reviewCount={item.reviews?.length || 12}
                        />
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Grid>
          )}

          {hasFeaturedBrands && (
            <Grid item md={hasTopRatedProducts ? 6 : 12} xs={12}>
              <CategorySectionHeader
                iconName="Group"
                title={t("featuredBrands")}
                seeMoreLink="/catalog/all?sort=popular"
              />

              <Card p="1rem" borderRadius={8}>
                <Grid container spacing={4}>
                  {featuredBrands.map((item) => (
                    <Grid item sm={6} xs={12} key={item.id}>
                      <Link href={`/catalog/all?brand=${item.slug}&sort=popular`}>
                        <ProductCard5 title={item.name} imgUrl={item.image} />
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
