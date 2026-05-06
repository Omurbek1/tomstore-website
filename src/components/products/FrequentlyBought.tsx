"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import styled from "styled-components";

import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import NextImage from "@component/NextImage";
import { Button } from "@component/buttons";
import Typography, { H3, H6, SemiSpan } from "@component/Typography";
import { useChangeCartAmount } from "@hook/useCart";
import useCurrency from "@hook/useCurrency";
import Product from "@models/product.model";

const MAX_BUNDLE_ITEMS = 4;

const FrequentlyBoughtWrapper = styled("section")`
  margin-bottom: 3.75rem;
`;

const BundleLayout = styled("div")`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 18px;
  align-items: stretch;

  @media only screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const BundleItemsGrid = styled("div")`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
`;

const BundleCard = styled(Link)`
  position: relative;
  display: grid;
  grid-template-columns: 76px minmax(0, 1fr);
  gap: 12px;
  min-width: 0;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.body.paper};
  color: inherit;
  transition: border-color 150ms ease, box-shadow 150ms ease, transform 150ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.success.main};
    box-shadow: 0 16px 40px -30px rgba(15, 23, 42, 0.45);
    transform: translateY(-1px);
  }
`;

const ProductImageBox = styled("div")`
  width: 76px;
  height: 76px;
  overflow: hidden;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gray[100]};

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ProductTitle = styled("div")`
  display: -webkit-box;
  min-width: 0;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 14px;
  font-weight: 700;
  line-height: 1.35;
  overflow-wrap: anywhere;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const PlusBadge = styled("span")`
  position: absolute;
  top: 50%;
  right: -18px;
  z-index: 2;
  display: flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.body.paper};
  color: ${({ theme }) => theme.colors.success.main};
  font-weight: 800;
  transform: translateY(-50%);

  @media only screen and (max-width: 900px) {
    display: none;
  }
`;

const SummaryCard = styled("div")`
  display: flex;
  min-height: 100%;
  flex-direction: column;
  justify-content: center;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.colors.success.main};
  border-radius: 8px;
  background: linear-gradient(180deg, rgba(51, 208, 103, 0.12), rgba(255, 255, 255, 0.96));
`;

const SummaryDivider = styled("div")`
  height: 1px;
  margin: 14px 0;
  background: ${({ theme }) => theme.colors.gray[300]};
`;

const GiftStrip = styled("div")`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
`;

const GiftChip = styled("span")`
  display: inline-flex;
  min-height: 28px;
  align-items: center;
  padding: 5px 10px;
  border: 1px solid ${({ theme }) => theme.colors.success.main};
  border-radius: 999px;
  background: rgba(51, 208, 103, 0.1);
  color: ${({ theme }) => theme.colors.success.main};
  font-size: 12px;
  font-weight: 700;
  line-height: 1.2;
`;

type BundleProduct = Product & {
  effectivePrice: number;
  compareAtPrice: number;
  savings: number;
};

type Props = {
  baseProduct?: Product;
  products: Product[];
};

function getEffectivePrice(product: Product) {
  const discount = Number(product.discount || 0);
  const price = Number(product.price || 0);

  if (discount <= 0) return price;
  return Number((price - price * (discount / 100)).toFixed(2));
}

function toBundleProduct(product: Product): BundleProduct {
  const effectivePrice = getEffectivePrice(product);
  const compareAtPrice =
    product.oldPrice && product.oldPrice > effectivePrice
      ? product.oldPrice
      : Number(product.price || 0);

  return {
    ...product,
    effectivePrice,
    compareAtPrice,
    savings: Math.max(compareAtPrice - effectivePrice, 0),
  };
}

const normalizeText = (value?: string) =>
  String(value || "")
    .toLowerCase()
    .replace(/ё/g, "е");

function detectProductType(product?: Product) {
  const text = normalizeText(
    [
      product?.title,
      product?.brand,
      product?.shortDescription,
      product?.fullDescription,
      ...(product?.categories || []),
      ...(product?.attributes || []).map(
        (item) => `${item.name} ${item.value}`,
      ),
    ].join(" "),
  );

  if (
    /(ноутбук|laptop|ultrabook|macbook|thinkpad|ideapad|vivobook|aspire|nitro)/.test(
      text,
    )
  ) {
    return "laptop";
  }
  if (
    /(принтер|мфу|printer|laserjet|inkjet|epson|canon|pantum|xerox)/.test(text)
  ) {
    return "printer";
  }
  if (/(системный блок|компьютер|desktop|mini pc|\bpc\b)/.test(text)) {
    return "desktop";
  }

  return "default";
}

function getGiftSuggestions(product?: Product) {
  const type = detectProductType(product);

  if (type === "laptop") {
    return ["giftWindowsSetup", "giftLaptopBag", "giftMouse", "giftMousepad"];
  }
  if (type === "printer") {
    return ["giftPrinterInk", "giftPrinterCable", "giftPaper"];
  }
  if (type === "desktop") {
    return ["giftWindowsSetup", "giftKeyboard", "giftMouse", "giftMousepad"];
  }

  return ["giftAccessory", "giftDeliverySetup"];
}

export default function FrequentlyBought({ baseProduct, products }: Props) {
  const t = useTranslations("product");
  const locale = useLocale();
  const formatCurrency = useCurrency();
  const changeCartAmount = useChangeCartAmount();

  const bundleProducts = useMemo(
    () =>
      products
        .filter((product) => product?.id && product?.slug && product?.title)
        .slice(0, MAX_BUNDLE_ITEMS)
        .map(toBundleProduct),
    [products],
  );

  const totals = useMemo(
    () =>
      bundleProducts.reduce(
        (acc, product) => ({
          price: acc.price + product.effectivePrice,
          compareAtPrice: acc.compareAtPrice + product.compareAtPrice,
          savings: acc.savings + product.savings,
        }),
        { price: 0, compareAtPrice: 0, savings: 0 },
      ),
    [bundleProducts],
  );
  const giftSuggestions = useMemo(
    () => getGiftSuggestions(baseProduct),
    [baseProduct],
  );

  if (bundleProducts.length === 0) return null;

  const handleAddBundleToCart = () => {
    bundleProducts.forEach((product) => {
      changeCartAmount({
        id: product.id,
        price: product.effectivePrice,
        qty: 1,
        name: product.title,
        imgUrl: product.thumbnail,
      });
    });
  };

  return (
    <FrequentlyBoughtWrapper>
      <FlexBox
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        mb="18px"
        style={{ gap: 10 }}
      >
        <Box>
          <H3 mb="4px">{t("frequentlyBought")}</H3>
          <SemiSpan color="text.muted">{t("bundleHint")}</SemiSpan>
        </Box>
      </FlexBox>

      <GiftStrip aria-label={t("giftSuggestions")}>
        <GiftChip>{t("giftSuggestions")}</GiftChip>
        {giftSuggestions.map((item) => (
          <GiftChip key={item}>{t(item)}</GiftChip>
        ))}
      </GiftStrip>

      <BundleLayout>
        <BundleItemsGrid>
          {bundleProducts.map((item, index) => (
            <BundleCard key={item.id} href={`/${locale}/product/${item.slug}`}>
              <ProductImageBox>
                <NextImage
                  src={item.thumbnail || "/assets/images/products/Rectangle 116.png"}
                  width={160}
                  height={160}
                  alt={item.title}
                />
              </ProductImageBox>

              <Box minWidth={0}>
                <ProductTitle title={item.title}>{item.title}</ProductTitle>

                <FlexBox alignItems="baseline" flexWrap="wrap" mt="8px" style={{ gap: 6 }}>
                  <H6 color="success.main">{formatCurrency(item.effectivePrice)}</H6>
                  {item.savings > 0 ? (
                    <SemiSpan color="text.muted">
                      <del>{formatCurrency(item.compareAtPrice)}</del>
                    </SemiSpan>
                  ) : null}
                </FlexBox>
              </Box>

              {index < bundleProducts.length - 1 ? <PlusBadge>+</PlusBadge> : null}
            </BundleCard>
          ))}
        </BundleItemsGrid>

        <SummaryCard>
          <SemiSpan fontWeight={700} color="success.main">
            {t("bundleOffer")}
          </SemiSpan>

          <Typography mt="8px" color="text.muted" fontSize="14px" lineHeight="1.5">
            {t("bundleItemsCount", { count: bundleProducts.length })}
          </Typography>

          <SummaryDivider />

          <SemiSpan color="text.muted">{t("bundleTotal")}</SemiSpan>
          <H3 color="text.primary" mt="4px">
            {formatCurrency(totals.price)}
          </H3>

          {totals.savings > 0 ? (
            <SemiSpan mt="6px" color="success.main" fontWeight={700}>
              {t("saveAmount", { amount: formatCurrency(totals.savings) })}
            </SemiSpan>
          ) : null}

          <Button
            fullWidth
            mt="18px"
            size="small"
            color="primary"
            variant="contained"
            onClick={handleAddBundleToCart}
          >
            {t("addBundleToCart")}
          </Button>
        </SummaryCard>
      </BundleLayout>
    </FrequentlyBoughtWrapper>
  );
}
