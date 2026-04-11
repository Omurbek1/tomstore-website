import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Public_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { Locale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import relativeTime from "dayjs/plugin/relativeTime";
import StyledComponentsRegistry from "@lib/registry";
import CartProvider from "@context/CartContext";
import { ThemeProvider } from "theme";
import NProgressBar from "@component/NProgress";
import { routing } from "i18n/routing";
import { Provider } from "@lib/Provider";
// @ts-ignore
import "slick-carousel/slick/slick.css";
// @ts-ignore
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

  if (!routing.locales.includes((locale as any) || "")) {
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
    <div className={publicSans.className}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <StyledComponentsRegistry>
          <Provider>
            <CartProvider>
              <ThemeProvider>
                {children}
                <NProgressBar />
              </ThemeProvider>
            </CartProvider>
          </Provider>
        </StyledComponentsRegistry>
      </NextIntlClientProvider>
    </div>
  );
}
