"use client";

import Box from "./Box";
import Icon from "./icon/Icon";
import FlexBox from "./FlexBox";
import Typography from "./Typography";
import { useTranslations } from "next-intl";

export default function AppStore() {
  const t = useTranslations("appStore");

  return (
    <FlexBox flexWrap="wrap" m="-0.5rem">
      {appList.map((item) => (
        <a
          href={item.url}
          key={item.translationKey}
          target="_blank"
          rel="noreferrer noopener"
        >
          <Box
            m="0.5rem"
            color="white"
            p="10px 16px"
            display="flex"
            bg="#0C2A4D"
            cursor="pointer"
            borderRadius="5px"
            alignItems="center"
          >
            <Icon defaultColor="auto" size="24px">
              {item.iconName}
            </Icon>

            <Box ml="8px">
              <Typography fontSize="8px" fontWeight="600" lineHeight="1">
                {t(`${item.translationKey}.subtitle`)}
              </Typography>

              <Typography fontSize="14px" fontWeight="900">
                {t(`${item.translationKey}.title`)}
              </Typography>
            </Box>
          </Box>
        </a>
      ))}
    </FlexBox>
  );
}

const appList = [
  { iconName: "play-store", translationKey: "googlePlay", url: "/" },
  { iconName: "app-store", translationKey: "appleStore", url: "/" },
];
