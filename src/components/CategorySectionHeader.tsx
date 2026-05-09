"use client";

import { IconChevronRight } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

import Icon from "./icon/Icon";
import FlexBox from "./FlexBox";
import { H2, SemiSpan } from "./Typography";
import { Link } from "@i18n/navigation";

// ==============================================================
interface Props {
  title?: string;
  iconName?: string;
  seeMoreLink?: string;
}
// ==============================================================

export default function CategorySectionHeader({ title, iconName, seeMoreLink }: Props) {
  const t = useTranslations("common");

  return (
    <FlexBox justifyContent="space-between" alignItems="center" mb="1.5rem">
      <FlexBox alignItems="center">
        {iconName && (
          <Icon mr="0.5rem" color="primary">
            {iconName}
          </Icon>
        )}

        <H2 fontWeight="bold" lineHeight="1" color="text.primary">
          {title}
        </H2>
      </FlexBox>

      {seeMoreLink && (
        <Link
          href={seeMoreLink}
          aria-label={`${t("viewAll")}: ${title || ""}`.trim()}
          style={{
            alignItems: "center",
            display: "inline-flex",
            minHeight: 44,
            paddingInline: 8,
          }}>
          <FlexBox alignItems="center" ml="0.5rem" color="text.secondary">
            <SemiSpan mr="0.5rem">{t("viewAll")}</SemiSpan>
            <IconChevronRight size={16} stroke={1.5} />
          </FlexBox>
        </Link>
      )}
    </FlexBox>
  );
}
