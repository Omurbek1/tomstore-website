import Box from "@component/Box";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import { Span } from "@component/Typography";
import { useTranslations } from "next-intl";

export default function Divide() {
  const t = useTranslations("auth");

  return (
    <Box mb="1rem">
      <Divider />

      <FlexBox justifyContent="center" mt="-14px">
        <Span color="text.muted" bg="body.paper" px="1rem">
          {t("divider")}
        </Span>
      </FlexBox>
    </Box>
  );
}
