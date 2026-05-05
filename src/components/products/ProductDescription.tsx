import { useTranslations } from "next-intl";
import Box from "@component/Box";
import Typography, { H3, SemiSpan } from "@component/Typography";
import Product from "@models/product.model";

type Props = {
  product?: Product;
};

export default function ProductDescription({ product }: Props) {
  const t = useTranslations("product");
  const attributes = Array.isArray(product?.attributes)
    ? product.attributes.filter((attribute) => attribute.name || attribute.value)
    : [];
  const description = String(
    product?.fullDescription || product?.shortDescription || "",
  ).trim();
  const fallbackRows = [
    product?.brand ? { name: "Бренд", value: product.brand } : null,
    product?.availabilityLabel
      ? { name: "Наличие", value: product.availabilityLabel }
      : null,
    product?.categories?.length
      ? { name: "Категория", value: product.categories.join(", ") }
      : null,
  ].filter(Boolean) as Array<{ name: string; value: string }>;
  const rows = attributes.length ? attributes : fallbackRows;

  return (
    <div>
      <H3 mb="1rem">{t("specification")}</H3>
      {description ? (
        <Typography mb="1rem">{description}</Typography>
      ) : null}

      {rows.length ? (
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(220px, 1fr))"
          gridGap="12px"
        >
          {rows.map((row) => (
            <Box
              key={`${row.name}-${row.value}`}
              border="1px solid"
              borderColor="gray.300"
              borderRadius="8px"
              p="0.875rem"
            >
              <SemiSpan display="block" mb="0.25rem">
                {row.name}
              </SemiSpan>
              <Typography fontWeight={600}>{row.value}</Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography color="text.muted">
          Описание и характеристики скоро появятся.
        </Typography>
      )}
    </div>
  );
}
