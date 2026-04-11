import { useTranslations } from "next-intl";
import Typography, { H3 } from "@component/Typography";

export default function ProductDescription() {
  const t = useTranslations("product");

  return (
    <div>
      <H3 mb="1rem">{t("specification")}</H3>
      <Typography>
        {t("specLines.brand")} <br />
        {t("specLines.model")} <br />
        {t("specLines.wireless")} <br />
        {t("specLines.frequency")} <br />
        {t("specLines.features")} <br />
        {t("specLines.origin")} <br />
      </Typography>
    </div>
  );
}
