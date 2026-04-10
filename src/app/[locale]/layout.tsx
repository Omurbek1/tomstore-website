import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Public_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { Locale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import StyledComponentsRegistry from "@lib/registry";
import CartProvider from "@context/CartContext";
import { ThemeProvider } from "theme";
import NProgressBar from "@component/NProgress";
import { routing } from "i18n/routing";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
});

type LocaleLayoutProps = PropsWithChildren<{
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<LocaleLayoutProps, "children">): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "LocaleLayout",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as unknown as Locale)) {
    notFound();
  }

  const messages = await getMessages({ locale: locale as Locale });

  return (
    <div className={publicSans.className}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <StyledComponentsRegistry>
          <CartProvider>
            <ThemeProvider>
              {children}
              <NProgressBar />
            </ThemeProvider>
          </CartProvider>
        </StyledComponentsRegistry>
      </NextIntlClientProvider>
    </div>
  );
}
