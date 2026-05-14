"use client";

import { useState } from "react";
import AppLayout from "@component/layout/main-layout";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { H1, H2, H3, Paragraph } from "@component/Typography";
import Breadcrumbs from "@component/seo/Breadcrumbs";
import styled from "styled-components";

import { SITE_URL } from "@lib/siteUrl";

// ── Styled Components ────────────────────────────────────────────────────

const HeroSection = styled.section`
  background: linear-gradient(135deg, #0f3460 0%, #16213e 100%);
  border-radius: 16px;
  padding: 3rem 2rem;
  color: #fff;
  margin-bottom: 2.5rem;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.75rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.75);
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ContactCard = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2rem 1.5rem;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.body.paper};
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  border: 2px solid transparent;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  text-align: center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
    transform: translateY(-3px);
  }
`;

const CardIcon = styled.div<{ $color: string }>`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const CardLabel = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.muted};
  font-weight: 500;
`;

const CardValue = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 1.25rem;
  padding-bottom: 0.6rem;
  border-bottom: 2px solid #e8e8e8;
`;

const HoursTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => theme.colors.body.paper};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);

  th {
    background: #0f3460;
    color: #fff;
    padding: 0.75rem 1rem;
    font-size: 13px;
    font-weight: 600;
    text-align: left;
  }

  td {
    padding: 0.7rem 1rem;
    font-size: 14px;
    border-bottom: 1px solid #f0f0f0;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:nth-child(even) td {
    background: #f9f9f9;
  }
`;

const MapWrapper = styled.div`
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 2.5rem;
`;

const MapPlaceholder = styled.button`
  width: 100%;
  height: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #0f3460 0%, #16213e 100%);
  border: none;
  cursor: pointer;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  transition: opacity 0.2s;
  &:hover { opacity: 0.9; }
  span.pin { font-size: 2.5rem; }
  span.hint { font-size: 13px; font-weight: 400; opacity: 0.7; }
`;

function LazyMap({ title }: { title: string }) {
  const [loaded, setLoaded] = useState(false);
  const MAP_SRC = "https://maps.google.com/maps?q=ТЦ+Весна+Калык+Акиев+66+Бишкек&output=embed&hl=ru&z=16";

  if (loaded) {
    return (
      <iframe
        src={MAP_SRC}
        width="100%"
        height="380"
        style={{ border: 0, display: "block" }}
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      />
    );
  }

  return (
    <MapPlaceholder onClick={() => setLoaded(true)} aria-label={title}>
      <span className="pin">📍</span>
      <span>{title}</span>
      <span className="hint">ТЦ Весна, Калык Акиев 66, Бишкек</span>
    </MapPlaceholder>
  );
}

const FaqItem = styled.div`
  background: ${({ theme }) => theme.colors.body.paper};
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  border-left: 4px solid ${({ theme }) => theme.colors.primary.main};

  h3 {
    font-size: 15px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0 0 0.5rem;
  }

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text.muted};
    margin: 0;
    line-height: 1.6;
  }
`;

// ── Schema ────────────────────────────────────────────────────────────────

function ContactSchema({ locale }: { locale: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${SITE_URL}/${locale}/contacts`,
    name:
      locale === "en"
        ? "Contact TomStore"
        : locale === "ky"
        ? "TomStore менен байланыш"
        : "Контакты TomStore",
    description:
      locale === "en"
        ? "Contact TomStore: phone, WhatsApp, Instagram, email and store address in Bishkek."
        : locale === "ky"
        ? "TomStore менен байланыш: телефон, WhatsApp, Instagram, email жана дүкөндүн дареги."
        : "Контакты TomStore: телефон, WhatsApp, Instagram, email и адрес магазина в Бишкеке.",
    mainEntity: {
      "@type": "Organization",
      name: "TomStore",
      telephone: "+996508724365",
      email: "support@tomstore.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Калык Акиев 66, ТЦ Весна, 3-этаж, С47",
        addressLocality: "Бишкек",
        addressCountry: "KG",
      },
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function ContactsPageClient({ locale }: { locale: string }) {

  const isEn = locale === "en";
  const isKy = locale === "ky";

  const homeLabel = isEn ? "Home" : isKy ? "Башкы бет" : "Главная";
  const contactsLabel = isEn ? "Contacts" : isKy ? "Байланыш" : "Контакты";

  const heroTitle = isEn
    ? "Get in Touch"
    : isKy
    ? "Биз менен байланышыңыз"
    : "Свяжитесь с нами";

  const heroSubtitle = isEn
    ? "We're here to help. Reach us by phone, WhatsApp, Instagram or email — we'll respond as quickly as possible."
    : isKy
    ? "Биз сизге жардам берүүгө даярбыз. Телефон, WhatsApp, Instagram же email аркылуу байланышыңыз."
    : "Мы всегда готовы помочь. Свяжитесь с нами по телефону, WhatsApp, Instagram или email — ответим как можно быстрее.";

  const hoursTitle = isEn
    ? "Working Hours"
    : isKy
    ? "Иш убактысы"
    : "Часы работы";

  const mapTitle = isEn ? "Find Us on the Map" : isKy ? "Картада табыңыз" : "Мы на карте";

  const faqTitle = isEn ? "Frequently Asked Questions" : isKy ? "Көп берилүүчү суроолор" : "Часто задаваемые вопросы";

  const contacts = isEn
    ? [
        {
          icon: "📞",
          color: "linear-gradient(135deg, #2563eb, #1d4ed8)",
          label: "Phone",
          value: "0508 724 365",
          href: "tel:+996508724365",
        },
        {
          icon: "💬",
          color: "linear-gradient(135deg, #25d366, #128c7e)",
          label: "WhatsApp",
          value: "Write to us",
          href: "https://api.whatsapp.com/send?phone=996508724365",
          target: "_blank",
        },
        {
          icon: "📸",
          color: "linear-gradient(135deg, #e1306c, #833ab4)",
          label: "Instagram",
          value: "@tomstore.kg",
          href: "https://www.instagram.com/tomstore.kg",
          target: "_blank",
        },
        {
          icon: "✉️",
          color: "linear-gradient(135deg, #f59e0b, #d97706)",
          label: "Email",
          value: "support@tomstore.com",
          href: "mailto:support@tomstore.com",
        },
      ]
    : isKy
    ? [
        {
          icon: "📞",
          color: "linear-gradient(135deg, #2563eb, #1d4ed8)",
          label: "Телефон",
          value: "0508 724 365",
          href: "tel:+996508724365",
        },
        {
          icon: "💬",
          color: "linear-gradient(135deg, #25d366, #128c7e)",
          label: "WhatsApp",
          value: "Жазыңыз",
          href: "https://api.whatsapp.com/send?phone=996508724365",
          target: "_blank",
        },
        {
          icon: "📸",
          color: "linear-gradient(135deg, #e1306c, #833ab4)",
          label: "Instagram",
          value: "@tomstore.kg",
          href: "https://www.instagram.com/tomstore.kg",
          target: "_blank",
        },
        {
          icon: "✉️",
          color: "linear-gradient(135deg, #f59e0b, #d97706)",
          label: "Email",
          value: "support@tomstore.com",
          href: "mailto:support@tomstore.com",
        },
      ]
    : [
        {
          icon: "📞",
          color: "linear-gradient(135deg, #2563eb, #1d4ed8)",
          label: "Телефон",
          value: "0508 724 365",
          href: "tel:+996508724365",
        },
        {
          icon: "💬",
          color: "linear-gradient(135deg, #25d366, #128c7e)",
          label: "WhatsApp",
          value: "Написать нам",
          href: "https://api.whatsapp.com/send?phone=996508724365",
          target: "_blank",
        },
        {
          icon: "📸",
          color: "linear-gradient(135deg, #e1306c, #833ab4)",
          label: "Instagram",
          value: "@tomstore.kg",
          href: "https://www.instagram.com/tomstore.kg",
          target: "_blank",
        },
        {
          icon: "✉️",
          color: "linear-gradient(135deg, #f59e0b, #d97706)",
          label: "Email",
          value: "support@tomstore.com",
          href: "mailto:support@tomstore.com",
        },
      ];

  const hours = isEn
    ? [
        { day: "Monday – Saturday", time: "09:00 – 19:00" },
        { day: "Sunday", time: "10:00 – 17:00" },
      ]
    : isKy
    ? [
        { day: "Дүйшөмбү – Ишемби", time: "09:00 – 19:00" },
        { day: "Жекшемби", time: "10:00 – 17:00" },
      ]
    : [
        { day: "Понедельник – Суббота", time: "09:00 – 19:00" },
        { day: "Воскресенье", time: "10:00 – 17:00" },
      ];

  const faqs = isEn
    ? [
        {
          q: "What is the fastest way to get a response?",
          a: "The quickest way to reach us is via WhatsApp or phone. We typically reply within a few minutes during working hours.",
        },
        {
          q: "Can I visit the store to get advice?",
          a: "Yes! Our consultants are happy to help you in person at Kalyk Akiev 66, Vesna Mall, 3rd floor, C47, Bishkek.",
        },
        {
          q: "Do you offer corporate or bulk purchasing support?",
          a: "Absolutely. Contact us via email at support@tomstore.com or call us and we'll prepare a special offer for your business.",
        },
      ]
    : isKy
    ? [
        {
          q: "Эң тез жооп алуунун жолу кандай?",
          a: "Эң тез байланышуу — WhatsApp же телефон аркылуу. Жумуш убактысында бир нече мүнөттүн ичинде жооп беребиз.",
        },
        {
          q: "Дүкөнгө барып кеңеш ала аламбы?",
          a: "Ооба! Биздин кеңешчилер Калык Акиев 66, Весна СБ, 3-кабат, С47, Бишкекте сизге жардам берүүгө даяр.",
        },
        {
          q: "Корпоративдик же чоң жуп сатып алуу боюнча жардам бересизби?",
          a: "Албетте. support@tomstore.com дарегине жазыңыз же телефон аркылуу чалыңыз — бизнесиңиз үчүн атайын сунуш даярдайбыз.",
        },
      ]
    : [
        {
          q: "Как быстрее всего получить ответ?",
          a: "Самый быстрый способ связаться с нами — WhatsApp или телефон. В рабочее время отвечаем в течение нескольких минут.",
        },
        {
          q: "Можно ли приехать в магазин и получить консультацию?",
          a: "Конечно! Наши консультанты с радостью помогут вам лично: Калык Акиев 66, ТЦ Весна, 3-этаж, С47, Бишкек.",
        },
        {
          q: "Есть ли поддержка корпоративных и оптовых заказов?",
          a: "Да. Напишите нам на support@tomstore.com или позвоните — подготовим специальное предложение для вашего бизнеса.",
        },
      ];

  return (
    <AppLayout>
      <Box pt="20px" pb="60px">
        <ContactSchema locale={locale} />

        <Breadcrumbs
          items={[{ label: homeLabel, href: "/" }, { label: contactsLabel }]}
          locale={locale}
        />

        {/* Hero */}
        <HeroSection>
          <HeroTitle>{heroTitle}</HeroTitle>
          <HeroSubtitle>{heroSubtitle}</HeroSubtitle>
        </HeroSection>

        {/* Contact Cards */}
        <Box mb="2.5rem">
          <Grid container spacing={4}>
            {contacts.map((c) => (
              <Grid item lg={3} sm={6} xs={12} key={c.label}>
                <ContactCard
                  href={c.href}
                  target={(c as any).target}
                  rel={(c as any).target ? "noopener noreferrer" : undefined}
                >
                  <CardIcon $color={c.color}>{c.icon}</CardIcon>
                  <CardLabel>{c.label}</CardLabel>
                  <CardValue>{c.value}</CardValue>
                </ContactCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Working Hours */}
        <Box mb="2.5rem">
          <SectionTitle>{hoursTitle}</SectionTitle>
          <HoursTable>
            <thead>
              <tr>
                <th>{isEn ? "Day" : isKy ? "Күн" : "День"}</th>
                <th>{isEn ? "Hours" : isKy ? "Убакыт" : "Время"}</th>
              </tr>
            </thead>
            <tbody>
              {hours.map((h) => (
                <tr key={h.day}>
                  <td>{h.day}</td>
                  <td>{h.time}</td>
                </tr>
              ))}
              <tr>
                <td>
                  <strong>
                    {isEn ? "Address" : isKy ? "Дарек" : "Адрес"}
                  </strong>
                </td>
                <td>
                  {isEn
                    ? "Kalyk Akiev 66, Vesna Mall, 3rd floor, C47, Bishkek"
                    : isKy
                    ? "Калык Акиев 66, Весна СБ, 3-кабат, С47, Бишкек"
                    : "Калык Акиев 66, ТЦ Весна, 3-этаж, С47, Бишкек"}
                </td>
              </tr>
            </tbody>
          </HoursTable>
        </Box>

        {/* Map */}
        <Box mb="2.5rem">
          <SectionTitle>{mapTitle}</SectionTitle>
          <MapWrapper>
            <LazyMap title={mapTitle} />
          </MapWrapper>
        </Box>

        {/* FAQ */}
        <Box mb="2.5rem">
          <SectionTitle>{faqTitle}</SectionTitle>
          <Grid container spacing={4}>
            {faqs.map((faq) => (
              <Grid item xs={12} key={faq.q}>
                <FaqItem>
                  <h3>{faq.q}</h3>
                  <p>{faq.a}</p>
                </FaqItem>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </AppLayout>
  );
}
