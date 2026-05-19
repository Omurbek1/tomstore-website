import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { notFound } from "next/navigation";
import { Locale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import relativeTime from "dayjs/plugin/relativeTime";
import StyledComponentsRegistry from "@lib/registry";
import { ThemeProvider } from "theme";
import NProgressBar from "@component/NProgress";
import { routing } from "@i18n/routing";
import { Provider } from "@lib/Provider";
import ThemeInitializer from "@component/ThemeInitializer";

type LocaleLayoutProps = PropsWithChildren<{
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

import { SITE_URL } from "@lib/siteUrl";

export async function generateMetadata({
  params,
}: Omit<LocaleLayoutProps, "children">): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes((locale as any) || "")) {
    notFound();
  }

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "LocaleLayout",
  });

  const title = t("title");
  const description = t("description");

  return {
    title: {
      default: title,
      template: `%s | TomStore`,
    },
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ru: "/ru",
        en: "/en",
        ky: "/ky",
        "x-default": "/ru",
      },
    },
    openGraph: {
      siteName: "TomStore",
      locale: locale === "en" ? "en_US" : locale === "ky" ? "ky_KG" : "ru_RU",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/assets/images/logo.svg`,
          width: 800,
          height: 600,
          alt: "TomStore — Электроника в Бишкеке",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@tomstorekg",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  };
}


dayjs.extend(relativeTime);
dayjs.extend(isToday);

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes((locale as any) || "")) {
    notFound();
  }

  const messages = await getMessages({ locale: locale as Locale });

  return (
    <div>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <StyledComponentsRegistry>
          <ThemeInitializer />
          <Provider>
            <ThemeProvider>
              {children}
              <NProgressBar />
            </ThemeProvider>
          </Provider>
        </StyledComponentsRegistry>
      </NextIntlClientProvider>
    </div>
  );
}
