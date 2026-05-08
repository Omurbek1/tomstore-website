import Grid from "@component/grid/Grid";
import Container from "@component/Container";
import HomeProductCard from "@component/product-cards/HomeProductCard";
import CategorySectionHeader from "@component/CategorySectionHeader";
import Product from "@models/product.model";

type HomeRecommendedProductsSectionProps = {
  products: Product[];
  title: string;
};

export default function HomeRecommendedProductsSection({
  products,
  title,
}: HomeRecommendedProductsSectionProps) {
  if (!products.length) return null;

  return (
    <Container mb="70px">
      <CategorySectionHeader title={title} seeMoreLink="/catalog/all?sort=popular" />

      <Grid container spacing={6}>
        {products.map((product, index) => (
          <Grid item lg={3} md={4} sm={6} xs={6} key={product.id}>
            <HomeProductCard
              slug={product.slug}
              title={product.title}
              price={product.price}
              imgUrl={product.thumbnail}
              discount={product.discount}
              priority={index < 2}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
