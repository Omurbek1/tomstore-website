import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import Login from "@sections/auth/Login";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "metadata.login" });

  return {
    title: t("title"),
    description: t("description")
  };
}

export default function LoginPage() {
  return <Login />;
}
