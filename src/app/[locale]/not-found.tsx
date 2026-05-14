"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link, useRouter } from "../../i18n/navigation";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";

export default function NotFound() {
  const t = useTranslations("notFound");
  const router = useRouter();

  return (
    <FlexBox
      px="1rem"
      minHeight="100vh"
      alignItems="center"
      flexDirection="column"
      justifyContent="center">
      <Image
        src="/assets/images/illustrations/404.svg"
        alt="Not found"
        width={320}
        height={240}
        unoptimized
        style={{ width: "100%", maxWidth: 320, height: "auto", marginBottom: "2rem" }}
      />

      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem", textAlign: "center" }}>
        {t("title")}
      </h1>

      <p style={{ color: "#666", marginBottom: "2rem", textAlign: "center", maxWidth: 400 }}>
        {t("description")}
      </p>

      <FlexBox flexWrap="wrap" justifyContent="center">
        <Button variant="outlined" color="primary" m="0.5rem" onClick={() => router.back()}>
          {t("goBack")}
        </Button>

        <Link href="/">
          <Button variant="outlined" color="primary" m="0.5rem">
            {t("goHome")}
          </Button>
        </Link>

        <Link href="/products">
          <Button variant="contained" color="primary" m="0.5rem">
            {t("catalog")}
          </Button>
        </Link>
      </FlexBox>
    </FlexBox>
  );
}
