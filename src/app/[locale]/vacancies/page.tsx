import type { Metadata } from "next";
import { getVacancies } from "@utils/__api__/storefront";
import { SITE_URL } from "@lib/siteUrl";
import VacanciesPageClient from "./VacanciesPageClient";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const isKy = locale === "ky";
  const url = `${SITE_URL}/${locale}/vacancies`;

  const title = isEn
    ? "Vacancies — TomStore"
    : isKy
    ? "Вакансиялар — TomStore"
    : "Вакансии — TomStore";

  const description = isEn
    ? "Open positions at TomStore — electronics store in Bishkek. Join our team!"
    : isKy
    ? "TomStore электроника дүкөнүндө ачык вакансиялар — Бишкек. Биздин командага кошулуңуз!"
    : "Открытые вакансии в TomStore — магазин электроники в Бишкеке. Присоединяйтесь к нашей команде!";

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ru: `${SITE_URL}/ru/vacancies`,
        en: `${SITE_URL}/en/vacancies`,
        ky: `${SITE_URL}/ky/vacancies`,
      },
    },
    openGraph: { title, description, url, type: "website" },
  };
}

export default async function VacanciesPage({ params }: Props) {
  const { locale } = await params;
  const data = await getVacancies();
  return <VacanciesPageClient locale={locale} data={data} />;
}
