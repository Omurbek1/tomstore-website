import Box from "@component/Box";
import styled from "styled-components";
import ProductGridCard from "@component/product-cards/ProductGridCard";
import CategorySectionCreator from "@component/CategorySectionCreator";
import Product from "@models/product.model";

const ProductGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;

  @media only screen and (max-width: 959px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media only screen and (max-width: 650px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media only screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

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
      <ProductGrid mt="-0.25rem" mb="-0.25rem">
        {products.slice(0, 8).map((product) => (
          <Box py="0.25rem" key={product.id} minWidth="0" style={{ minHeight: 410 }}>
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
          </Box>
        ))}
      </ProductGrid>
    </CategorySectionCreator>
  );
}
