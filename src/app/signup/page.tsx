import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import Signup from "@sections/auth/Signup";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "metadata.signup" });

  return {
    title: t("title"),
    description: t("description")
  };
}

export default function SignUpPage() {
  return <Signup />;
}
