import { Link } from "@i18n/navigation";
import { Carousel } from "@component/carousel";
import CategoryPromoCard from "@component/product-cards/CategoryPromoCard";
import CategorySectionCreator from "@component/CategorySectionCreator";
import Category from "@models/category.model";

const responsive = [
  { breakpoint: 959, settings: { slidesToShow: 2 } },
  { breakpoint: 650, settings: { slidesToShow: 1 } },
];

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
      <Carousel slidesToShow={3} responsive={responsive}>
        {categories.map((category) => (
          <Link
            href={`/catalog/${category.slug}`}
            key={category.slug}
            style={{ display: "block", height: "100%" }}
          >
            <CategoryPromoCard
              title={category.name}
              imgUrl={category.image ?? ""}
              subtitle={category.description ?? ""}
            />
          </Link>
        ))}
      </Carousel>
    </CategorySectionCreator>
  );
}
