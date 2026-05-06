import Box from "@component/Box";
import Image from "@component/Image";
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
          <Image mb="1.5rem" src="/assets/images/logo-no-bg.svg" alt="TomStore" height="60px" />
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
                  <Link href="/" key={ind}>
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
