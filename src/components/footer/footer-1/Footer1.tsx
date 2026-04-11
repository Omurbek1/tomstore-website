"use client";

import Box from "@component/Box";
import Image from "@component/Image";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import AppStore from "@component/AppStore";
import Container from "@component/Container";
import Typography, { Paragraph } from "@component/Typography";
import { useTranslations } from "next-intl";
import { Link } from "i18n/navigation";
// STYLED COMPONENTS
import { StyledLink } from "./styles";
// CUSTOM DATA
import { aboutLinkKeys, customerCareLinkKeys, iconList } from "./data";

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
                  <Image alt="logo" mb="1rem" src="/assets/images/logo.svg" />
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
                    <StyledLink href="/" key={item}>
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
                    <StyledLink href="/" key={item}>
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
                  {t("emailLabel")}: {t("emailValue")}
                </Typography>

                <Typography py="0.3rem" mb="1rem" color="gray.500">
                  {t("phoneLabel")}: {t("phoneValue")}
                </Typography>

                <FlexBox className="flex" mx="-5px">
                  {iconList.map((item) => (
                    <a
                      href={item.url}
                      target="_blank"
                      key={item.iconName}
                      rel="noreferrer noopenner"
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
        </Container>
      </Box>
    </footer>
  );
}
