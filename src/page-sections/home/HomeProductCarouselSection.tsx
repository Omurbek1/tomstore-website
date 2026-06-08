import HomeProductCard from "@component/product-cards/HomeProductCard";
import CategorySectionCreator from "@component/CategorySectionCreator";
import Product from "@models/product.model";
import styles from "./HomeProductCarouselSection.module.css";

type HomeProductCarouselSectionProps = {
  products: Product[];
  title: string;
  iconName: string;
  seeMoreLink: string;
};

// Серверный компонент: сетка на CSS-модуле вместо styled(Box). Карточки —
// серверные children, переданные в клиентский CategorySectionCreator, поэтому
// рендерятся на сервере (0 клиентского JS на товары).
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
      seeMoreLink={seeMoreLink}
    >
      <div className={styles.grid}>
        {products.slice(0, 8).map((product) => (
          <div className={styles.cell} key={product.id}>
            <HomeProductCard
              slug={product.slug}
              title={product.title}
              price={product.price}
              imgUrl={product.thumbnail}
              discount={product.discount}
            />
          </div>
        ))}
      </div>
    </CategorySectionCreator>
  );
}
