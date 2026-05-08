import type { Metadata } from "next";
import ContactsPageClient from "./ContactsPageClient";

import { SITE_URL } from "@lib/siteUrl";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const isKy = locale === "ky";
  const url = `${SITE_URL}/${locale}/contacts`;

  const title = isEn
    ? "Contacts — TomStore Bishkek"
    : isKy
    ? "Байланыш — TomStore Бишкек"
    : "Контакты — TomStore Бишкек";

  const description = isEn
    ? "TomStore contacts: phone +996 508 724 365, WhatsApp, Instagram @tomstore.kg. Address: Kalyk Akiev 66, Vesna Mall, Bishkek. Working hours: Mon–Sat 09:00–19:00."
    : isKy
    ? "TomStore байланышы: телефон +996 508 724 365, WhatsApp, Instagram @tomstore.kg. Дарек: Калык Акиев 66, Весна СБ, Бишкек. Иш убактысы: Дш–Иш 09:00–19:00."
    : "Контакты TomStore: телефон +996 508 724 365, WhatsApp, Instagram @tomstore.kg. Адрес: Калык Акиев 66, ТЦ Весна, Бишкек. Режим работы: Пн–Сб 09:00–19:00.";

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ru: `${SITE_URL}/ru/contacts`,
        en: `${SITE_URL}/en/contacts`,
        ky: `${SITE_URL}/ky/contacts`,
      },
    },
    openGraph: { title, description, url, type: "website" },
  };
}

export default async function ContactsPage({ params }: Props) {
  const { locale } = await params;
  return <ContactsPageClient locale={locale} />;
}
