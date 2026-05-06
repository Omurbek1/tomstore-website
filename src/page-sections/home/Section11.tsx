import Grid from "@component/grid/Grid";
import Container from "@component/Container";
import ProductGridCard from "@component/product-cards/ProductGridCard";
import CategorySectionHeader from "@component/CategorySectionHeader";
import { getTranslations } from "next-intl/server";
// API FUNCTIONS
import api from "@utils/__api__/market-1";

export default async function Section11() {
  const moreItems = await api.getMoreItems();
  const t = await getTranslations("home");

  if (!moreItems.length) return null;

  return (
    <Container mb="70px">
      <CategorySectionHeader title={t("moreForYou")} seeMoreLink="/catalog/all?sort=popular" />

      <Grid container spacing={6}>
        {moreItems.map((item) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={item.id}>
            <ProductGridCard
              hoverEffect
              id={item.id}
              slug={item.slug}
              title={item.title}
              price={item.price}
              off={item.discount}
              rating={item.rating}
              imgUrl={item.thumbnail}
              images={item.images as string[]}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
