import type { ReactNode } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
// @ts-ignore
import "slick-carousel/slick/slick.css";
// @ts-ignore
import "slick-carousel/slick/slick-theme.css";
// @ts-ignore
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tomstore.kg";

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
  description: "Магазин электроники в Бишкеке. Ноутбуки, принтеры, ПК. Гарантия, рассрочка, доставка.",
  url: SITE_URL,
  telephone: "+996-508-724-365",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Бишкек",
    addressCountry: "KG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 42.8746,
    longitude: 74.5698,
  },
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
};

export const dynamic = "force-dynamic";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
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
