import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import ProductTileCard from "@component/product-cards/ProductTileCard";
import CategorySectionCreator from "@component/CategorySectionCreator";
import { getTranslations } from "next-intl/server";
// API FUNCTIONS
import api from "@utils/__api__/market-1";

export default async function Section5() {
  const newArrivalsList = await api.getNewArrivalList();
  const t = await getTranslations("home");

  if (!newArrivalsList.length) return null;

  return (
    <CategorySectionCreator
      iconName="new-product-1"
      title={t("newArrivals")}
      seeMoreLink="/catalog/all?label=new&sort=newest">
      <Card p="1rem" borderRadius={8}>
        <Grid container spacing={6}>
          {newArrivalsList.map((item) => (
            <Grid item lg={2} md={3} sm={4} xs={6} key={item.id}>
              <ProductTileCard
                slug={item.slug}
                title={item.title}
                price={item.price}
                imgUrl={item.thumbnail}
              />
            </Grid>
          ))}
        </Grid>
      </Card>
    </CategorySectionCreator>
  );
}
