import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import ProductCard2 from "@component/product-cards/ProductCard2";
import CategorySectionCreator from "@component/CategorySectionCreator";
import Product from "@models/product.model";

type HomeNewArrivalsSectionProps = {
  products: Product[];
  title: string;
};

export default function HomeNewArrivalsSection({
  products,
  title,
}: HomeNewArrivalsSectionProps) {
  if (!products.length) return null;

  return (
    <CategorySectionCreator
      iconName="new-product-1"
      title={title}
      seeMoreLink="/catalog/all?label=new&sort=newest">
      <Card p="1rem" borderRadius={8}>
        <Grid container spacing={6}>
          {products.map((product) => (
            <Grid item lg={2} md={3} sm={4} xs={6} key={product.id}>
              <ProductCard2
                slug={product.slug}
                title={product.title}
                price={product.price}
                imgUrl={product.thumbnail}
              />
            </Grid>
          ))}
        </Grid>
      </Card>
    </CategorySectionCreator>
  );
}
