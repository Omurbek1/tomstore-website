import { Link } from "@i18n/navigation";
import { calculateDiscount, currency } from "@utils/utils";
import NextImage from "@component/NextImage";
import styles from "./HomeProductCard.module.css";

type HomeProductCardProps = {
  slug: string;
  title: string;
  price: number;
  imgUrl: string;
  discount?: number;
  priority?: boolean;
  compact?: boolean;
  sizes?: string;
};

const PRODUCT_IMAGE_FALLBACK = "/assets/images/products/placeholder.webp";

// Серверный компонент (без styled-components / "use client") — карточка чисто
// презентационная, повторяется десятки раз на главной/каталоге. Перенос стилей
// в CSS-модуль убирает её клиентский JS и ускоряет гидрацию.
export default function HomeProductCard({
  slug,
  title,
  price,
  imgUrl,
  discount,
  priority = false,
  compact = false,
  sizes,
}: HomeProductCardProps) {
  const imageSrc = imgUrl || PRODUCT_IMAGE_FALLBACK;

  return (
    <Link
      href={`/product/${slug}`}
      className={compact ? `${styles.card} ${styles.cardCompact}` : styles.card}
    >
      <div
        className={
          compact ? `${styles.imageWrap} ${styles.imageWrapCompact}` : styles.imageWrap
        }
      >
        <NextImage
          src={imageSrc}
          alt={title}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          quality={80}
          sizes={
            sizes ??
            (compact
              ? "(max-width: 960px) 25vw, 140px"
              : "(max-width: 500px) 100vw, (max-width: 650px) 50vw, (max-width: 960px) 33vw, 277px")
          }
          fallbackSrc={PRODUCT_IMAGE_FALLBACK}
          style={{ objectFit: "contain" }}
        />
      </div>

      <h3 title={title} className={styles.title}>
        {title}
      </h3>

      <span className={styles.price}>
        {calculateDiscount(price, discount || 0, "ru") || currency(price, 0, "ru")}
      </span>
    </Link>
  );
}
