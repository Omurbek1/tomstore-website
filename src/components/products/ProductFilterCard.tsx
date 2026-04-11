"use client";

import { useTranslations } from "next-intl";
import Card from "@component/Card";
import Avatar from "@component/avatar";
import Rating from "@component/rating";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import CheckBox from "@component/CheckBox";
import TextField from "@component/text-field";
import { Accordion, AccordionHeader } from "@component/accordion";
import { H5, H6, Paragraph, SemiSpan } from "@component/Typography";

const CATEGORIES = [
  { titleKey: "bathPreparations", childKeys: ["bubbleBath", "bathCapsules", "others"] },
  { titleKey: "eyeMakeupPreparations" },
  { titleKey: "fragrance" },
  { titleKey: "hairPreparations" }
];

const OTHER_OPTIONS = ["onSale", "inStock", "featured"] as const;
const BRANDS = ["Maccs", "Karts", "Baars", "Bukks", "Luasis"];
const COLORS = ["#1C1C1C", "#FF7A7A", "#FFC672", "#84FFB5", "#70F6FF", "#6B7AFF"];

export default function ProductFilterCard() {
  const t = useTranslations("product.filters");
  const render = (items: string[]) =>
    items.map((name) => (
      <Paragraph
        py="6px"
        pl="22px"
        key={name}
        fontSize="14px"
        color="text.muted"
        className="cursor-pointer">
        {t(`categoryItems.${name}`)}
      </Paragraph>
    ));

  return (
    <Card p="18px 27px" elevation={5} borderRadius={12}>
      <H6 mb="10px">{t("categories")}</H6>

      {CATEGORIES.map((item) =>
        item.childKeys ? (
          <Accordion key={item.titleKey} expanded>
            <AccordionHeader px="0px" py="6px" color="text.muted">
              <SemiSpan className="cursor-pointer" mr="9px">
                {t(`categoryItems.${item.titleKey}`)}
              </SemiSpan>
            </AccordionHeader>

            {render(item.childKeys)}
          </Accordion>
        ) : (
          <Paragraph
            py="6px"
            fontSize="14px"
            key={item.titleKey}
            color="text.muted"
            className="cursor-pointer">
            {t(`categoryItems.${item.titleKey}`)}
          </Paragraph>
        )
      )}

      <Divider mt="18px" mb="24px" />

      {/* PRICE RANGE FILTER */}
      <H6 mb="16px">{t("priceRange")}</H6>
      <FlexBox justifyContent="space-between" alignItems="center">
        <TextField placeholder="0" type="number" fullWidth />

        <H5 color="text.muted" px="0.5rem">
          -
        </H5>

        <TextField placeholder="250" type="number" fullWidth />
      </FlexBox>

      <Divider my="24px" />

      {/* BRANDS FILTER */}
      <H6 mb="16px">{t("brands")}</H6>
      {BRANDS.map((item) => (
        <CheckBox
          my="10px"
          key={item}
          name={item}
          value={item}
          color="secondary"
          label={<SemiSpan color="inherit">{item}</SemiSpan>}
          onChange={(e) => console.log(e.target.value, e.target.checked)}
        />
      ))}

      <Divider my="24px" />

      {/* STOCK AND SALES FILTERS */}
      {OTHER_OPTIONS.map((item) => (
        <CheckBox
          my="10px"
          key={item}
          name={item}
          value={item}
          color="secondary"
          label={<SemiSpan color="inherit">{t(`otherOptions.${item}`)}</SemiSpan>}
          onChange={(e) => console.log(e.target.value, e.target.checked)}
        />
      ))}

      <Divider my="24px" />

      {/* RATING FILTER */}
      <H6 mb="16px">{t("ratings")}</H6>
      {[5, 4, 3, 2, 1].map((item) => (
        <CheckBox
          my="10px"
          key={item}
          value={item}
          color="secondary"
          label={<Rating value={item} outof={5} color="warn" />}
          onChange={(e) => console.log(e.target.value, e.target.checked)}
        />
      ))}

      <Divider my="24px" />

      {/* COLORS FILTER */}
      <H6 mb="16px">{t("colors")}</H6>
      <FlexBox mb="1rem">
        {COLORS.map((item, ind) => (
          <Avatar key={ind} bg={item} size={25} mr="10px" style={{ cursor: "pointer" }} />
        ))}
      </FlexBox>
    </Card>
  );
}
