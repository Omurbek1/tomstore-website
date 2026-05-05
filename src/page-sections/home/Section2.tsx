import Box from "@component/Box";
import { Carousel } from "@component/carousel";
import ProductCard1 from "@component/product-cards/ProductCard1";
import CategorySectionCreator from "@component/CategorySectionCreator";
import { getTranslations } from "next-intl/server";
// API FUNCTIONS
import api from "@utils/__api__/market-1";

const responsive = [
  { breakpoint: 1279, settings: { slidesToShow: 4 } },
  { breakpoint: 959, settings: { slidesToShow: 3 } },
  { breakpoint: 650, settings: { slidesToShow: 2 } },
  { breakpoint: 500, settings: { slidesToShow: 1 } }
];

export default async function Section2() {
  const products = await api.getFlashDeals();
  const t = await getTranslations("home");

  if (!products.length) return null;

  return (
    <CategorySectionCreator
      iconName="light"
      title={t("flashDeals")}
      seeMoreLink="/catalog/all?label=sale&sort=popular">
      <Box mt="-0.25rem" mb="-0.25rem">
        <Carousel slidesToShow={4} responsive={responsive}>
          {products.map((item, ind) => (
            <Box py="0.25rem" key={item.id}>
              <ProductCard1
                id={item.id}
                slug={item.slug}
                price={item.price}
                title={item.title}
                off={item.discount}
                images={item.images}
                imgUrl={item.thumbnail}
                rating={item.rating || 4}
              />
            </Box>
          ))}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  );
}
