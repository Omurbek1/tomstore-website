"use client";

import Image from "next/image";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import AppStore from "@component/AppStore";
import Container from "@component/Container";
import Typography, { Paragraph } from "@component/Typography";
import { useTranslations } from "next-intl";
import { Link } from "@i18n/navigation";
// STYLED COMPONENTS
import { StyledLink } from "./styles";
// CUSTOM DATA
import { aboutLinkKeys, customerCareLinkKeys, iconList } from "./data";

const ABOUT_LINK_HREFS: Record<string, string> = {
  ourStory: "/about",
  ourStores: "/shops",
  blog: "/blog",
  terms: "/contacts",
  privacy: "/contacts",
  careers: "/contacts",
};

const CUSTOMER_CARE_HREFS: Record<string, string> = {
  helpCenter: "/contacts",
  howToBuy: "/contacts",
  trackOrder: "/contacts",
  corporatePurchasing: "/contacts",
  returns: "/contacts",
};

export default function Footer1() {
  const t = useTranslations("footer");

  return (
    <footer>
      <Box bg="#0F3460">
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

                <Paragraph mb="1.25rem" color="gray.500" maxWidth="320px">
                  {t("description")}
                </Paragraph>

                <AppStore />
              </Grid>

              <Grid item lg={2} md={6} sm={6} xs={12}>
                <Typography
                  mb="1.25rem"
                  lineHeight="1"
                  fontSize={20}
                  fontWeight="600"
                >
                  {t("aboutUs")}
                </Typography>

                <div>
                  {aboutLinkKeys.map((item) => (
                    <StyledLink href={ABOUT_LINK_HREFS[item] ?? "/"} key={item}>
                      {t(`aboutLinks.${item}`)}
                    </StyledLink>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Typography
                  mb="1.25rem"
                  lineHeight="1"
                  fontSize={20}
                  fontWeight="600"
                >
                  {t("customerCare")}
                </Typography>

                <div>
                  {customerCareLinkKeys.map((item) => (
                    <StyledLink href={CUSTOMER_CARE_HREFS[item] ?? "/"} key={item}>
                      {t(`customerCareLinks.${item}`)}
                    </StyledLink>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Typography
                  mb="1.25rem"
                  lineHeight="1"
                  fontSize={20}
                  fontWeight="600"
                >
                  {t("contactUs")}
                </Typography>

                <Typography py="0.3rem" color="gray.500">
                  {t("address")}
                </Typography>

                <Typography py="0.3rem" color="gray.500">
                  {t("emailLabel")}:{" "}
                  <a href={`mailto:${t("emailValue")}`} style={{ color: "inherit" }}>
                    {t("emailValue")}
                  </a>
                </Typography>

                <Typography py="0.3rem" mb="1rem" color="gray.500">
                  {t("phoneLabel")}:{" "}
                  <a href={`tel:${t("phoneValue").replace(/\s/g, "")}`} style={{ color: "inherit" }}>
                    {t("phoneValue")}
                  </a>
                </Typography>

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
                      <Box
                        m="5px"
                        p="10px"
                        size="small"
                        borderRadius="50%"
                        bg="rgba(0,0,0,0.2)"
                      >
                        <Icon size="12px" defaultColor="auto">
                          {item.iconName}
                        </Icon>
                      </Box>
                    </a>
                  ))}
                </FlexBox>
              </Grid>
            </Grid>
          </Box>

          {/* Map */}
          <Box pb="3rem">
            <Typography mb="1rem" lineHeight="1" fontSize={18} fontWeight="600">
              {t("contactUs")}
            </Typography>
            <Box borderRadius={8} overflow="hidden" style={{ height: 280 }}>
              <iframe
                src="https://maps.google.com/maps?q=ТЦ+Весна+Калык+Акиев+66+Бишкек&output=embed&hl=ru&z=16"
                width="100%"
                height="280"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="TomStore map"
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
