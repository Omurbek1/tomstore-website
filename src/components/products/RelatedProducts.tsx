import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { H3 } from "@component/Typography";
import { ProductGridCard } from "@component/product-cards";
import Product from "@models/product.model";
import { useTranslations } from "next-intl";

// ============================================================
type Props = { products: Product[] };
// ============================================================

export default function RelatedProducts({ products }: Props) {
  const t = useTranslations("product");

  return (
    <Box mb="3.75rem">
      <H3 mb="1.5rem">{t("relatedProducts")}</H3>

      <Grid container spacing={8}>
        {products.map((item) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={item.id}>
            <ProductGridCard
              hoverEffect
              id={item.id}
              slug={item.slug}
              price={item.price}
              title={item.title}
              off={item.discount}
              images={item.images || []}
              imgUrl={item.thumbnail}
              rating={item.rating || 4}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
