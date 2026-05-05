import { useTranslations } from "next-intl";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Typography, { H3, H4, SemiSpan } from "@component/Typography";
import Product from "@models/product.model";

type Props = {
  product?: Product;
};

type StructuredRows = {
  specs: Array<{ name: string; value: string }>;
  useCases: string[];
  highlights: string[];
};

const GENERIC_ATTRIBUTE_NAMES = new Set([
  "характеристика",
  "характеристики",
  "feature",
  "features",
  "specification",
  "specifications",
  "мүнөздөмө",
  "мүнөздөмөлөр",
]);

const BULLET_MARKER_PATTERN = /^[\s]*[•●▪■-]\s*/;
const HIGHLIGHT_MARKER_PATTERN = /^[\s]*(✓|✔|✅)\s*/;
const LEADING_MARKER_PATTERN = /^[\s•●▪■✓✔✅-]+/;

const normalizeText = (value?: string | null) =>
  String(value || "").replace(/\s+/g, " ").trim();

const normalizeComparableText = (value: string) =>
  normalizeText(value).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");

const isGenericAttributeName = (name: string) => {
  const normalized = normalizeText(name).toLowerCase();
  return (
    GENERIC_ATTRIBUTE_NAMES.has(normalized) ||
    normalized.startsWith("характерист")
  );
};

const stripAttributeMarker = (value: string) =>
  normalizeText(value.replace(LEADING_MARKER_PATTERN, ""));

const toSentenceCaseStart = (value: string) => {
  const normalized = normalizeText(value);
  const [first = "", second = ""] = Array.from(normalized);

  if (
    first &&
    first === first.toUpperCase() &&
    second &&
    second === second.toLowerCase()
  ) {
    return `${first.toLowerCase()}${normalized.slice(first.length)}`;
  }

  return normalized;
};

const structureRows = (product?: Product): StructuredRows => {
  const comparableProductName = normalizeComparableText(product?.title || "");
  const seenSpecs = new Set<string>();
  const seenUseCases = new Set<string>();
  const seenHighlights = new Set<string>();

  const initialRows: StructuredRows = {
    specs: [],
    useCases: [],
    highlights: [],
  };

  const attributes = Array.isArray(product?.attributes)
    ? product.attributes
    : [];

  const result = attributes.reduce<StructuredRows>((acc, attribute) => {
    const name = normalizeText(attribute.name);
    const rawValue = normalizeText(attribute.value);
    const value = stripAttributeMarker(rawValue);

    if (!name || !value) return acc;

    const comparableValue = normalizeComparableText(value);
    if (
      comparableValue &&
      comparableProductName &&
      (comparableValue === comparableProductName ||
        comparableValue.includes(comparableProductName))
    ) {
      return acc;
    }

    if (!isGenericAttributeName(name)) {
      const specKey = `${name.toLowerCase()}::${comparableValue}`;
      if (!seenSpecs.has(specKey)) {
        seenSpecs.add(specKey);
        acc.specs.push({ name, value });
      }
      return acc;
    }

    if (HIGHLIGHT_MARKER_PATTERN.test(rawValue)) {
      if (!seenHighlights.has(comparableValue)) {
        seenHighlights.add(comparableValue);
        acc.highlights.push(value);
      }
      return acc;
    }

    if (BULLET_MARKER_PATTERN.test(rawValue) || value.length <= 56) {
      if (!seenUseCases.has(comparableValue)) {
        seenUseCases.add(comparableValue);
        acc.useCases.push(value);
      }
      return acc;
    }

    if (!seenHighlights.has(comparableValue)) {
      seenHighlights.add(comparableValue);
      acc.highlights.push(value);
    }

    return acc;
  }, initialRows);

  if (result.specs.length === 0) {
    if (product?.brand) result.specs.push({ name: "Бренд", value: product.brand });
    if (product?.availabilityLabel) {
      result.specs.push({ name: "Наличие", value: product.availabilityLabel });
    }
    if (product?.categories?.length) {
      result.specs.push({
        name: "Категория",
        value: product.categories.join(", "),
      });
    }
  }

  return result;
};

export default function ProductDescription({ product }: Props) {
  const t = useTranslations("product");
  const description = String(
    product?.fullDescription || product?.shortDescription || "",
  ).trim();
  const structuredRows = structureRows(product);
  const hasStructuredRows =
    structuredRows.specs.length > 0 ||
    structuredRows.useCases.length > 0 ||
    structuredRows.highlights.length > 0;
  const hasHtmlDescription = /<[a-z][\s\S]*>/i.test(description);

  return (
    <Box>
      <Box bg="white" borderRadius="8px" shadow={1} p="1.5rem" mb="1.5rem">
        <H3 mb="1rem">{t("descriptionTab")}</H3>
        {description ? (
          hasHtmlDescription ? (
            <Box
              color="text.secondary"
              lineHeight="1.8"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : (
            <Typography
              color="text.secondary"
              lineHeight="1.8"
              style={{ whiteSpace: "pre-line" }}
            >
              {description}
            </Typography>
          )
        ) : (
          <Typography color="text.muted">
            Описание товара скоро появится.
          </Typography>
        )}
      </Box>

      {hasStructuredRows ? (
        <Box bg="white" borderRadius="8px" shadow={1} p="1.5rem">
          <H3 mb="1.25rem">{t("specification")}</H3>

          {structuredRows.specs.length > 0 ? (
            <Box
              display="grid"
              gridTemplateColumns="repeat(auto-fit, minmax(220px, 1fr))"
              gridGap="12px"
            >
              {structuredRows.specs.map((row) => (
                <Box
                  key={`${row.name}-${row.value}`}
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="16px"
                  p="1rem"
                  bg="gray.100"
                >
                  <SemiSpan
                    display="block"
                    mb="0.5rem"
                    fontSize="11px"
                    fontWeight={700}
                    style={{
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {row.name}
                  </SemiSpan>
                  <Typography fontWeight={600} color="text.secondary" lineHeight="1.6">
                    {row.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          ) : null}

          {structuredRows.useCases.length > 0 ? (
            <Box mt="1.5rem">
              <H4 mb="0.75rem" fontSize="14px" color="text.secondary">
                Лучше всего подходит
              </H4>
              <FlexBox flexWrap="wrap" m="-0.25rem">
                {structuredRows.useCases.map((item) => (
                  <Box
                    key={item}
                    m="0.25rem"
                    px="0.875rem"
                    py="0.55rem"
                    border="1px solid"
                    borderColor="primary.light"
                    borderRadius="999px"
                    bg="primary.light"
                  >
                    <Typography fontSize="14px" fontWeight={600} color="primary.main">
                      {toSentenceCaseStart(item)}
                    </Typography>
                  </Box>
                ))}
              </FlexBox>
            </Box>
          ) : null}

          {structuredRows.highlights.length > 0 ? (
            <Box mt="1.5rem">
              <H4 mb="0.75rem" fontSize="14px" color="text.secondary">
                Ключевые преимущества
              </H4>
              <Box display="grid" gridGap="10px">
                {structuredRows.highlights.map((item) => (
                  <FlexBox
                    key={item}
                    alignItems="flex-start"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="16px"
                    p="0.875rem"
                    bg="gray.white"
                  >
                    <FlexBox
                      width="24px"
                      height="24px"
                      minWidth="24px"
                      alignItems="center"
                      justifyContent="center"
                      borderRadius="999px"
                      bg="success.light"
                      color="success.main"
                      mr="0.75rem"
                    >
                      ✓
                    </FlexBox>
                    <Typography color="text.secondary" lineHeight="1.6">
                      {item}
                    </Typography>
                  </FlexBox>
                ))}
              </Box>
            </Box>
          ) : null}
        </Box>
      ) : null}
    </Box>
  );
}
