"use client";

import Image from "next/image";
import styled from "styled-components";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import AppStore from "@component/AppStore";
import Container from "@component/Container";
import { useTranslations } from "next-intl";
import { Link } from "@i18n/navigation";
import { StyledLink } from "./styles";
import { aboutLinkKeys, customerCareLinkKeys, iconList } from "./data";

const ABOUT_LINK_HREFS: Record<string, string> = {
  ourStory: "/about",
  ourStores: "/shops",
  blog: "/blog",
  terms: "/contacts",
  privacy: "/contacts",
  careers: "/vacancies",
};

const CUSTOMER_CARE_HREFS: Record<string, string> = {
  helpCenter: "/contacts",
  howToBuy: "/contacts",
  trackOrder: "/contacts",
  corporatePurchasing: "/contacts",
  returns: "/contacts",
};

const FooterRoot = styled.footer`
  background: ${({ theme }) =>
    theme.isDark
      ? `linear-gradient(160deg, ${theme.colors.secondary[100]} 0%, ${theme.colors.body.default} 100%)`
      : "#0F3460"};
`;

const FooterHeading = styled.p`
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  line-height: 1;
  margin: 0 0 1.25rem;
`;

const FooterBody = styled.p`
  margin: 0;
  padding: 0.3rem 0;
  color: ${({ theme }) => theme.isDark ? theme.colors.text.hint : "rgba(255,255,255,0.65)"};
`;

const SocialCircle = styled(Box)`
  background: ${({ theme }) =>
    theme.isDark ? theme.colors.gray[300] : "rgba(0,0,0,0.2)"};
`;

export default function Footer1() {
  const t = useTranslations("footer");

  return (
    <FooterRoot>
      <Container p="1rem" color="white">
        <Box py="5rem" overflow="hidden">
          <Grid container spacing={6}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <Link href="/">
                <Image
                  alt="TomStore"
                  src="/assets/images/logo-no-bg.svg"
                  width={150}
                  height={44}
                  unoptimized
                  style={{
                    width: 150,
                    height: 44,
                    objectFit: "contain",
                    objectPosition: "left center",
                    marginBottom: "1rem",
                  }}
                />
              </Link>

              <p style={{ color: "rgba(255,255,255,0.65)", marginBottom: "1.25rem", maxWidth: 320 }}>
                {t("description")}
              </p>

              <AppStore />
            </Grid>

            <Grid item lg={2} md={6} sm={6} xs={12}>
              <FooterHeading>
                {t("aboutUs")}
              </FooterHeading>
              <div>
                {aboutLinkKeys.map((item) => (
                  <StyledLink href={ABOUT_LINK_HREFS[item] ?? "/"} key={item}>
                    {t(`aboutLinks.${item}`)}
                  </StyledLink>
                ))}
              </div>
            </Grid>

            <Grid item lg={3} md={6} sm={6} xs={12}>
              <FooterHeading>
                {t("customerCare")}
              </FooterHeading>
              <div>
                {customerCareLinkKeys.map((item) => (
                  <StyledLink href={CUSTOMER_CARE_HREFS[item] ?? "/"} key={item}>
                    {t(`customerCareLinks.${item}`)}
                  </StyledLink>
                ))}
              </div>
            </Grid>

            <Grid item lg={3} md={6} sm={6} xs={12}>
              <FooterHeading>
                {t("contactUs")}
              </FooterHeading>

              <FooterBody>{t("address")}</FooterBody>

              <FooterBody>
                {t("emailLabel")}:{" "}
                <a href={`mailto:${t("emailValue")}`} style={{ color: "inherit" }}>
                  {t("emailValue")}
                </a>
              </FooterBody>

              <FooterBody style={{ marginBottom: "1rem" }}>
                {t("phoneLabel")}:{" "}
                <a href={`tel:${t("phoneValue").replace(/\s/g, "")}`} style={{ color: "inherit" }}>
                  {t("phoneValue")}
                </a>
              </FooterBody>

              <FlexBox className="flex" mx="-5px">
                {iconList.map((item) => (
                  <a
                    href={item.url}
                    target="_blank"
                    key={item.iconName}
                    rel="noreferrer noopenner"
                    aria-label={`Open TomStore ${item.iconName}`}
                    title={`TomStore ${item.iconName}`}
                  >
                    <SocialCircle m="5px" p="10px" size="small" borderRadius="50%">
                      <Icon size="12px" defaultColor="auto">
                        {item.iconName}
                      </Icon>
                    </SocialCircle>
                  </a>
                ))}
              </FlexBox>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </FooterRoot>
  );
}
