import Image from "next/image";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import AppStore from "@component/AppStore";
import { Paragraph } from "@component/Typography";
import { getTranslations } from "next-intl/server";
import { Link } from "@i18n/navigation";
// STYLED COMPONENTS
import { StyledBox, StyledLink, Wrapper } from "./styles";
// CUSTOM DATA
import { customerCareLinkKeys } from "../footer-1/data";
import { iconList } from "./data";

export default async function Footer2() {
  const t = await getTranslations("footer");

  return (
    <footer>
      <Wrapper>
        <Link href="/">
          <Image
            src="/assets/images/logo-no-bg.svg"
            alt="TomStore"
            width={150}
            height={44}
            unoptimized
            style={{
              width: 150,
              height: 44,
              objectFit: "contain",
              objectPosition: "left center",
              marginBottom: "1.5rem",
            }}
          />
        </Link>

        <Grid container spacing={6}>
          <Grid item md={6} sm={6} xs={12}>
            <Paragraph mb="1.25rem" color="gray.500" maxWidth="370px">
              {t("description")}
            </Paragraph>

            <AppStore />
          </Grid>

          <Grid item md={6} sm={6} xs={12}>
            <StyledBox maxWidth="230px" mt="-0.35rem">
              <div>
                {customerCareLinkKeys.map((item) => (
                  <StyledLink href="/" key={item}>
                    {t(`customerCareLinks.${item}`)}
                  </StyledLink>
                ))}
              </div>

              <FlexBox mx="-5px" mt="1rem">
                {iconList.map((item, ind) => (
                  <Link
                    href="/"
                    key={ind}
                    aria-label={`Open TomStore ${item}`}
                    title={`TomStore ${item}`}
                  >
                    <Box
                      m="5px"
                      p="10px"
                      size="small"
                      cursor="pointer"
                      borderRadius="50%"
                      bg="rgba(0,0,0,0.2)">
                      <Icon size="12px" defaultColor="auto">
                        {item}
                      </Icon>
                    </Box>
                  </Link>
                ))}
              </FlexBox>
            </StyledBox>
          </Grid>
        </Grid>
      </Wrapper>
    </footer>
  );
}
