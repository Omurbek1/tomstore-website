import { SITE_URL } from "@lib/siteUrl";

export default function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "Store", "ElectronicsStore"],
        "@id": `${SITE_URL}/#organization`,
        name: "TomStore",
        alternateName: ["TomStore.kg", "ТомСтор"],
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/assets/images/logo.svg`,
          width: 300,
          height: 100,
        },
        image: `${SITE_URL}/assets/images/logo.svg`,
        description:
          "TomStore — интернет-магазин ноутбуков, принтеров, ПК и электроники в Бишкеке. Доставка по всему Кыргызстану. Гарантия, рассрочка.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "ул. Калык Акиева 66, ТЦ Весна, 3-й этаж, С47",
          addressLocality: "Бишкек",
          addressRegion: "Чуйская область",
          addressCountry: "KG",
          postalCode: "720000",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 42.8746,
          longitude: 74.5698,
        },
        telephone: "+996-508-724-365",
        email: "info@tomstore.kg",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "09:00",
            closes: "19:00",
          },
        ],
        sameAs: [
          "https://www.instagram.com/tomstore.kg",
          "https://wa.me/996508724365",
        ],
        priceRange: "$$",
        currenciesAccepted: "KGS",
        paymentAccepted: "Cash, Credit Card, Installment",
        areaServed: [
          { "@type": "Country", name: "Kyrgyzstan", "@id": "https://www.wikidata.org/wiki/Q813" },
          { "@type": "City", name: "Bishkek" },
          { "@type": "City", name: "Osh" },
          { "@type": "City", name: "Jalal-Abad" },
          { "@type": "City", name: "Karakol" },
          { "@type": "City", name: "Naryn" },
          { "@type": "City", name: "Talas" },
          { "@type": "City", name: "Batken" },
          { "@type": "AdministrativeArea", name: "Chuy Region" },
          { "@type": "AdministrativeArea", name: "Issyk-Kul Region" },
          { "@type": "AdministrativeArea", name: "Osh Region" },
          { "@type": "AdministrativeArea", name: "Jalal-Abad Region" },
          { "@type": "AdministrativeArea", name: "Naryn Region" },
          { "@type": "AdministrativeArea", name: "Talas Region" },
          { "@type": "AdministrativeArea", name: "Batken Region" },
        ],
        hasMap: "https://maps.google.com/?q=Калык+Акиева+66+Бишкек+ТЦ+Весна",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+996-508-724-365",
          contactType: "customer service",
          areaServed: "KG",
          availableLanguage: ["Russian", "Kyrgyz"],
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
