import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import GoogleAnalytics from "@component/GoogleAnalytics";
import OrganizationJsonLd from "@component/seo/OrganizationJsonLd";

import { SITE_URL } from "@lib/siteUrl";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

const SITE_DESCRIPTION =
  "TomStore — интернет-магазин электроники с доставкой по всему Кыргызстану. Ноутбуки, принтеры, ПК, мониторы, гарантия и рассрочка.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TomStore — Электроника с доставкой по Кыргызстану",
    template: "%s | TomStore",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "TomStore — Электроника с доставкой по Кыргызстану",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "TomStore",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/assets/images/logo.svg`,
        width: 800,
        height: 600,
        alt: "TomStore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TomStore — Электроника с доставкой по Кыргызстану",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const backendOrigin = (() => {
    try {
      const url = new URL(BACKEND_URL);
      return url.hostname === "127.0.0.1" || url.hostname === "localhost" ? null : url.origin;
    } catch {
      return null;
    }
  })();

  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: "@view-transition{navigation:auto}" }} />
        {backendOrigin && <link rel="preconnect" href={backendOrigin} />}
        {backendOrigin && <link rel="dns-prefetch" href={backendOrigin} />}
      </head>
      <body>
        {/* Единый источник правды для Organization/LocalBusiness schema на всех страницах.
            Раньше здесь были два хардкод-объекта, дублировавшие OrganizationJsonLd
            на главной/contacts/bishkek/kyrgyzstan с расходящимися данными. */}
        <OrganizationJsonLd />
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
