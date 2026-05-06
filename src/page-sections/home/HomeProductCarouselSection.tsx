import Box from "@component/Box";
import styled from "styled-components";
import { Carousel } from "@component/carousel";
import ProductGridCard from "@component/product-cards/ProductGridCard";
import CategorySectionCreator from "@component/CategorySectionCreator";
import Product from "@models/product.model";

const ProductSlide = styled(Box)`
  height: 100%;
  min-height: 410px;
  min-width: 0;
`;

const responsive = [
  { breakpoint: 1279, settings: { slidesToShow: 4 } },
  { breakpoint: 959, settings: { slidesToShow: 3 } },
  { breakpoint: 650, settings: { slidesToShow: 2 } },
  { breakpoint: 500, settings: { slidesToShow: 1 } },
];

type HomeProductCarouselSectionProps = {
  products: Product[];
  title: string;
  iconName: string;
  seeMoreLink: string;
};

export default function HomeProductCarouselSection({
  products,
  title,
  iconName,
  seeMoreLink,
}: HomeProductCarouselSectionProps) {
  if (!products.length) return null;

  return (
    <CategorySectionCreator
      iconName={iconName}
      title={title}
      seeMoreLink={seeMoreLink}>
      <Box mt="-0.25rem" mb="-0.25rem">
        <Carousel slidesToShow={4} responsive={responsive}>
          {products.map((product) => (
            <ProductSlide py="0.25rem" key={product.id}>
              <ProductGridCard
                id={product.id}
                slug={product.slug}
                price={product.price}
                title={product.title}
                off={product.discount}
                images={product.images}
                imgUrl={product.thumbnail}
                rating={product.rating || 4}
              />
            </ProductSlide>
          ))}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  );
}
