import { Link } from "@i18n/navigation";
import styled from "styled-components";
import CategoryPromoCard from "@component/product-cards/CategoryPromoCard";
import CategorySectionCreator from "@component/CategorySectionCreator";
import Category from "@models/category.model";

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;

  @media only screen and (max-width: 959px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media only screen and (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

type HomePopularCategoriesSectionProps = {
  categories: Category[];
  title: string;
};

export default function HomePopularCategoriesSection({
  categories,
  title,
}: HomePopularCategoriesSectionProps) {
  if (!categories.length) return null;

  return (
    <CategorySectionCreator
      iconName="categories"
      title={title}
      seeMoreLink="/catalog/all?sort=popular">
      <CategoryGrid>
        {categories.slice(0, 6).map((category, index) => (
          <Link
            href={`/catalog/${category.slug}`}
            key={category.slug}
            style={{ display: "block", height: "100%" }}
          >
            <CategoryPromoCard
              title={category.name}
              imgUrl={category.image || "/assets/images/banners/category-1.webp"}
              subtitle={category.description ?? ""}
              priority={index === 0}
            />
          </Link>
        ))}
      </CategoryGrid>
    </CategorySectionCreator>
  );
}
