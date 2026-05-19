import { SITE_URL } from "@lib/siteUrl";

export default function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "TomStore — Электроника в Бишкеке",
    alternateName: "TomStore.kg",
    url: SITE_URL,
    description:
      "Интернет-магазин ноутбуков, принтеров, ПК и электроники с доставкой по Кыргызстану. Гарантия, рассрочка.",
    inLanguage: ["ru", "ky", "en"],
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/ru/product/search/{search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
