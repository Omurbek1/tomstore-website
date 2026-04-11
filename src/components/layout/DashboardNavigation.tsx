"use client";

import { Fragment } from "react";
import {
  IconPin,
  IconUser,
  IconHeart,
  IconHelpCircle,
  IconCreditCard,
  IconShoppingBagCheck
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { usePathname } from "i18n/navigation";

import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
// STYLED COMPONENTS
import { DashboardNavigationWrapper, StyledDashboardNav } from "./styles";

export default function DashboardNavigation() {
  const pathname = usePathname();
  const t = useTranslations("dashboard");
  const navigationLinks = [
    {
      title: t("groups.dashboard"),
      links: [
        { href: "/orders", title: t("nav.orders"), Icon: IconShoppingBagCheck, count: 5 },
        { href: "/wish-list", title: t("nav.wishlist"), Icon: IconHeart, count: 19 },
        { href: "/support-tickets", title: t("nav.supportTickets"), Icon: IconHelpCircle, count: 1 }
      ]
    },
    {
      title: t("groups.accountSettings"),
      links: [
        { href: "/profile", title: t("nav.profileInfo"), Icon: IconUser, count: 3 },
        { href: "/address", title: t("nav.addresses"), Icon: IconPin, count: 16 },
        { href: "/payment-methods", title: t("nav.paymentMethods"), Icon: IconCreditCard, count: 4 }
      ]
    }
  ];

  return (
    <DashboardNavigationWrapper px="0px" pb="1.5rem" color="gray.900" borderRadius={8}>
      {navigationLinks.map((navGroup) => (
        <Fragment key={navGroup.title}>
          <Typography p="26px 30px 1rem" color="text.muted" fontSize="12px">
            {navGroup.title}
          </Typography>

          {navGroup.links.map(({ Icon, count, href, title }) => (
            <StyledDashboardNav href={href} key={title} isActive={pathname.includes(href)}>
              <FlexBox alignItems="center" style={{ gap: 8 }}>
                <Icon size={20} className="icon" />

                <span>{title}</span>
              </FlexBox>

              <span>{count}</span>
            </StyledDashboardNav>
          ))}
        </Fragment>
      ))}
    </DashboardNavigationWrapper>
  );
}
