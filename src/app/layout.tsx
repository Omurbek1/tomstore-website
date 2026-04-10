import type { Metadata, Viewport } from "next";
import type { PropsWithChildren } from "react";
import { Public_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

// PROVIDERS
import StyledComponentsRegistry from "@lib/registry";
import CartProvider from "@context/CartContext";
import { ThemeProvider } from "theme";
import NProgressBar from "@component/NProgress";

// CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isRu = locale === "ru";

  return {
    metadataBase: new URL("https://tomstore.kg"),
    title: {
      default: isRu
        ? "TomStore — Ноутбуки, принтеры, ПК и электроника в Бишкеке"
        : "TomStore — Laptops, Printers, PCs & Electronics in Bishkek",
      template: "%s | TomStore",
    },
    description: isRu
      ? "TomStore — магазин электроники в Бишкеке. Ноутбуки, принтеры, компьютеры, комплектующие и аксессуары. Гарантия, рассрочка, доставка по всему Кыргызстану."
      : "TomStore is an electronics store in Bishkek. Laptops, printers, PCs, components and accessories. Warranty, installment plans and delivery across Kyrgyzstan.",

    keywords: isRu
      ? [
          "ноутбуки Бишкек",
          "принтеры Бишкек",
          "магазин электроники Бишкек",
          "ПК Бишкек",
        ]
      : [
          "laptops Bishkek",
          "printers Bishkek",
          "electronics store Kyrgyzstan",
          "PC shop Bishkek",
        ],

    openGraph: {
      type: "website",
      locale: isRu ? "ru_RU" : "en_US",
      url: "https://tomstore.kg",
      siteName: "TomStore",
      title: isRu
        ? "TomStore — электроника в Бишкеке"
        : "TomStore — Electronics in Bishkek",
      description: isRu
        ? "Ноутбуки, принтеры, ПК в наличии. Рассрочка и доставка по Кыргызстану."
        : "Laptops, printers and PCs in stock. Installment and delivery across Kyrgyzstan.",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },

    alternates: {
      canonical: locale === "ru" ? "/ru" : "/en",
      languages: {
        ru: "/ru",
        en: "/en",
      },
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111827",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={publicSans.className}>
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
      </body>
    </html>
  );
}
