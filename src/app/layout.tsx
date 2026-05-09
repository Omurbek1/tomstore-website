import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";

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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TomStore",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/images/logo.svg`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+996-508-724-365",
    contactType: "customer service",
    availableLanguage: ["Russian", "Kyrgyz"],
  },
  sameAs: [],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "TomStore",
  description: "Интернет-магазин электроники с доставкой по всему Кыргызстану. Ноутбуки, принтеры, ПК, мониторы. Гарантия, рассрочка, доставка в Бишкек, Ош, Джалал-Абад, Каракол и все регионы КР.",
  url: SITE_URL,
  telephone: "+996-508-724-365",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Бишкек",
    addressRegion: "Чуйская область",
    addressCountry: "KG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 42.8746,
    longitude: 74.5698,
  },
  areaServed: [
    { "@type": "City", name: "Бишкек" },
    { "@type": "City", name: "Ош" },
    { "@type": "City", name: "Джалал-Абад" },
    { "@type": "City", name: "Каракол" },
    { "@type": "City", name: "Токмок" },
    { "@type": "City", name: "Нарын" },
    { "@type": "City", name: "Талас" },
    { "@type": "City", name: "Баткен" },
    { "@type": "City", name: "Балыкчы" },
    { "@type": "City", name: "Кара-Балта" },
    { "@type": "City", name: "Кант" },
    { "@type": "City", name: "Узген" },
    { "@type": "City", name: "Кара-Суу" },
    { "@type": "City", name: "Чолпон-Ата" },
    { "@type": "City", name: "Кызыл-Кия" },
    { "@type": "City", name: "Майлуу-Суу" },
    { "@type": "AdministrativeArea", name: "Кыргызская Республика" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "20:00",
    },
  ],
  priceRange: "$$",
  currenciesAccepted: "KGS",
  paymentAccepted: "Cash, Credit Card",
  hasMap: "https://2gis.kg/bishkek",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
