import type { Metadata } from "next";
import Link from "next/link";
import AppLayout from "@component/layout/main-layout";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { H1, H2, Paragraph } from "@component/Typography";
import Breadcrumbs from "@component/seo/Breadcrumbs";
import cities from "@data/cities";
import { CityCard } from "./DostavkaStyles";

import { SITE_URL } from "@lib/siteUrl";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === "en"
      ? "Delivery Across Kyrgyzstan — TomStore"
      : locale === "ky"
      ? "Кыргызстан боюнча жеткирүү — TomStore"
      : "Доставка электроники по всему Кыргызстану — TomStore";

  const description =
    locale === "en"
      ? "TomStore delivers laptops, printers and computers to all cities of Kyrgyzstan: Bishkek, Osh, Jalal-Abad, Karakol and more."
      : locale === "ky"
      ? "TomStore Кыргызстандын бардык шаарларына: Бишкек, Ош, Жалал-Абад, Каракол жана башкаларга жеткирет."
      : "TomStore доставляет ноутбуки, принтеры и компьютеры во все города Кыргызстана: Бишкек, Ош, Джалал-Абад, Каракол и другие.";

  const url = `${SITE_URL}/${locale}/dostavka`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ru: `${SITE_URL}/ru/dostavka`,
        en: `${SITE_URL}/en/dostavka`,
        ky: `${SITE_URL}/ky/dostavka`,
      },
    },
    openGraph: { title, description, url, type: "website" },
  };
}

const ServiceSchema = ({
  locale,
  citiesRu,
}: {
  locale: string;
  citiesRu: string;
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "DeliveryChargeSpecification",
    eligibleRegion: {
      "@type": "Country",
      name: "Kyrgyzstan",
    },
    name:
      locale === "en"
        ? "Delivery across Kyrgyzstan"
        : "Доставка по Кыргызстану",
    description:
      locale === "en"
        ? `TomStore delivers to all cities of Kyrgyzstan including ${citiesRu}`
        : `TomStore доставляет во все города Кыргызстана: ${citiesRu}`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default async function DostavkaPage({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === "en";
  const isKy = locale === "ky";

  const homeLabel = isEn ? "Home" : isKy ? "Башкы бет" : "Главная";
  const delivLabel = isEn ? "Delivery" : isKy ? "Жеткирүү" : "Доставка";

  const h1 = isEn
    ? "Delivery Across Kyrgyzstan"
    : isKy
    ? "Кыргызстан боюнча жеткирүү"
    : "Доставка по всему Кыргызстану";

  const lead = isEn
    ? "TomStore ships laptops, printers, computers and accessories to every city and region of Kyrgyzstan. Select your city below to see delivery times and details."
    : isKy
    ? "TomStore ноутбук, принтер, компьютер жана аксессуарларды Кыргызстандын бардык шаарларына жана аймактарына жеткирет. Шаарыңызды тандаңыз."
    : "TomStore отправляет ноутбуки, принтеры, компьютеры и аксессуары в каждый город и регион Кыргызстана. Выберите ваш город ниже, чтобы узнать сроки и условия доставки.";

  const citiesRu = cities.map((c) => c.nameRu).join(", ");

  // Group by region
  const byRegion = cities.reduce<Record<string, typeof cities>>(
    (acc, city) => {
      const region = isEn ? city.regionEn : isKy ? city.regionKy : city.regionRu;
      if (!acc[region]) acc[region] = [];
      acc[region].push(city);
      return acc;
    },
    {},
  );

  return (
    <AppLayout>
      <Box pt="20px" pb="60px">
        <ServiceSchema locale={locale} citiesRu={citiesRu} />

        <Breadcrumbs
          items={[{ label: homeLabel, href: "/" }, { label: delivLabel }]}
          locale={locale}
        />

        <H1 mb="0.5rem">{h1}</H1>
        <Paragraph color="text.muted" mb="2.5rem" style={{ maxWidth: 640 }}>
          {lead}
        </Paragraph>

        {Object.entries(byRegion).map(([region, regionCities]) => (
          <Box key={region} mb="2.5rem">
            <H2 fontSize="17px" mb="1rem" pb="0.5rem" style={{ borderBottom: "2px solid #e3e3e3" }}>
              {region}
            </H2>
            <Grid container spacing={4}>
              {regionCities.map((city) => {
                const name = isEn ? city.nameEn : isKy ? city.nameKy : city.nameRu;
                const days = city.deliveryDays;
                return (
                  <Grid item lg={3} sm={4} xs={6} key={city.slug}>
                    <CityCard
                      as={Link}
                      href={`/${locale}/dostavka/${city.slug}`}
                      borderRadius={10}
                    >
                      <div className="left">
                        <div className="city-name">{name}</div>
                        <div className="region">
                          {isEn ? "Delivery:" : isKy ? "Жеткирүү:" : "Доставка:"}
                        </div>
                      </div>
                      <div className="days">{days}</div>
                    </CityCard>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        ))}
      </Box>
    </AppLayout>
  );
}
