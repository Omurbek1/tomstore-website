import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVacancy } from "@utils/__api__/storefront";
import { SITE_URL } from "@lib/siteUrl";
import { buildFallbackMetadata } from "@lib/seoMetadata";
import VacancyDetailClient from "./VacancyDetailClient";

type Props = { params: Promise<{ locale: string; id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const vacancy = await getVacancy(id);
  if (!vacancy) {
    return buildFallbackMetadata({
      locale,
      path: `/vacancies/${id}`,
      title: "Вакансии TomStore",
      description:
        "Открытые вакансии TomStore в магазине электроники. Работа в Бишкеке, развитие, команда и актуальные позиции.",
    });
  }

  const url = `${SITE_URL}/${locale}/vacancies/${id}`;
  const title = `${vacancy.title} — TomStore`;
  const description = vacancy.description
    ? vacancy.description.slice(0, 160)
    : locale === "en"
    ? "Open position at TomStore electronics store in Bishkek."
    : "Открытая вакансия в магазине электроники TomStore, Бишкек.";

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ru: `${SITE_URL}/ru/vacancies/${id}`,
        en: `${SITE_URL}/en/vacancies/${id}`,
        ky: `${SITE_URL}/ky/vacancies/${id}`,
      },
    },
    openGraph: { title, description, url, type: "website" },
  };
}

export default async function VacancyDetailPage({ params }: Props) {
  const { locale, id } = await params;
  const vacancy = await getVacancy(id);
  if (!vacancy) notFound();

  return <VacancyDetailClient locale={locale} vacancy={vacancy} />;
}
