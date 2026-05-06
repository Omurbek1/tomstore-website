import Grid from "@component/grid/Grid";
import Container from "@component/Container";
import ProductGridCard from "@component/product-cards/ProductGridCard";
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
        {products.map((product) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={product.id}>
            <ProductGridCard
              hoverEffect
              id={product.id}
              slug={product.slug}
              title={product.title}
              price={product.price}
              off={product.discount}
              rating={product.rating}
              imgUrl={product.thumbnail}
              images={product.images as string[]}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
