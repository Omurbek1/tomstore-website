"use client";

import { PropsWithChildren } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@i18n/navigation";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
// STYLED COMPONENTS
import { StyledGrid } from "../styles";
import { DashboardNavigationWrapper, StyledDashboardNav } from "../styles";

import { navigationLinkDefs } from "./navigation";

export default function VendorDashboardLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const t = useTranslations("dashboard.vendorNav");

  return (
    <Grid container spacing={6}>
      <StyledGrid item lg={3} xs={12}>
        <DashboardNavigationWrapper px="0px" py="1.5rem" color="gray.900" borderRadius={12}>
          {navigationLinkDefs.map((item) => (
            <StyledDashboardNav
              href={item.href}
              key={item.titleKey}
              isActive={pathname.includes(item.href)}>
              <FlexBox alignItems="center" style={{ gap: 8 }}>
                <item.Icon size={18} className="icon" />
                <span>{t(item.titleKey)}</span>
              </FlexBox>

              <span>{"count" in item ? item.count : undefined}</span>
            </StyledDashboardNav>
          ))}
        </DashboardNavigationWrapper>
      </StyledGrid>

      <Grid item lg={9} xs={12}>
        {children}
      </Grid>
    </Grid>
  );
}
