"use client";

import Link from "next/link";
import AppLayout from "@component/layout/layout-3";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import Breadcrumbs from "@component/seo/Breadcrumbs";
import styled from "styled-components";

import { SITE_URL } from "@lib/siteUrl";

// ── Styled Components ────────────────────────────────────────────────────

const HeroSection = styled.section`
  background: linear-gradient(135deg, #0f3460 0%, #16213e 100%);
  border-radius: 16px;
  padding: 3.5rem 2rem;
  color: #fff;
  margin-bottom: 2.5rem;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  font-weight: 700;
  color: #fff;
  margin: 0 0 1rem;
  line-height: 1.3;
`;

const HeroDesc = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 640px;
  margin: 0 auto;
  line-height: 1.7;
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.body.paper};
  border-radius: 14px;
  padding: 2rem 1.5rem;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  border-bottom: 4px solid ${({ theme }) => theme.colors.primary.main};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12);
  }
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary.main};
  line-height: 1;
  margin-bottom: 0.4rem;
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.muted};
  font-weight: 500;
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 1.25rem;
  padding-bottom: 0.6rem;
  border-bottom: 2px solid #e8e8e8;
`;

const AdvantageCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: ${({ theme }) => theme.colors.body.paper};
  border-radius: 14px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  border-left: 4px solid ${({ theme }) => theme.colors.primary.main};

  .icon {
    font-size: 2rem;
    flex-shrink: 0;
  }

  h3 {
    font-size: 15px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0 0 0.4rem;
  }

  p {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.text.muted};
    margin: 0;
    line-height: 1.5;
  }
`;

const WhySection = styled.section`
  background: #f7f9fc;
  border-radius: 16px;
  padding: 2.5rem 2rem;
  margin-bottom: 2.5rem;
`;

const WhyText = styled.p`
  font-size: 15px;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 1rem;

  &:last-child {
    margin: 0;
  }
`;

const CtaSection = styled.section`
  background: linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%);
  border-radius: 16px;
  padding: 3rem 2rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const CtaTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.75rem;
`;

const CtaSubtitle = styled.p`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.75);
  margin: 0 0 1.75rem;
`;

const CtaButton = styled(Link)`
  display: inline-block;
  background: ${({ theme }) => theme.colors.body.paper};
  color: #0f3460;
  font-weight: 700;
  font-size: 15px;
  padding: 0.9rem 2.5rem;
  border-radius: 30px;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);

  &:hover {
    background: #f0f4ff;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  }
`;

// ── Schema ────────────────────────────────────────────────────────────────

function OrgSchema({ locale }: { locale: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "TomStore",
    url: SITE_URL,
    logo: `${SITE_URL}/assets/images/logo.svg`,
    description:
      locale === "en"
        ? "TomStore — your trusted electronics store in Bishkek, Kyrgyzstan. Laptops, printers, PCs, accessories with warranty and installment plans."
        : locale === "ky"
        ? "TomStore — Бишкектеги ишенимдүү электроника дүкөнү. Ноутбуктар, принтерлер, ПК, аксессуарлар кепилдик жана бөлүп төлөө менен."
        : "TomStore — ваш надёжный магазин электроники в Бишкеке. Ноутбуки, принтеры, ПК, аксессуары с гарантией и рассрочкой.",
    telephone: "+996508724365",
    email: "support@tomstore.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Калык Акиев 66, ТЦ Весна, 3-этаж, С47",
      addressLocality: "Бишкек",
      addressCountry: "KG",
    },
    sameAs: [
      "https://www.instagram.com/tomstore.kg",
      "https://api.whatsapp.com/send?phone=996508724365",
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function AboutPageClient({ locale }: { locale: string }) {

  const isEn = locale === "en";
  const isKy = locale === "ky";

  const homeLabel = isEn ? "Home" : isKy ? "Башкы бет" : "Главная";
  const aboutLabel = isEn ? "About" : isKy ? "Биз жөнүндө" : "О магазине";

  const heroTitle = isEn
    ? "TomStore — Your Trusted Electronics Store"
    : isKy
    ? "TomStore — ишенимдүү электроника дүкөнүңүз"
    : "TomStore — ваш надёжный магазин электроники";

  const heroDesc = isEn
    ? "We help residents of Bishkek and all of Kyrgyzstan choose the right laptop, printer, PC or accessory. Official warranty, installment plans, and expert advice — that's TomStore."
    : isKy
    ? "Биз Бишкек жана бүткүл Кыргызстан тургундарына туура ноутбук, принтер, ПК же аксессуар тандоого жардам беребиз. Расмий кепилдик, бөлүп төлөө жана эксперттик кеңеш — бул TomStore."
    : "Мы помогаем жителям Бишкека и всего Кыргызстана выбрать правильный ноутбук, принтер, ПК или аксессуар. Официальная гарантия, рассрочка и экспертная консультация — это TomStore.";

  const stats = isEn
    ? [
        { number: "5 000+", label: "Products in stock" },
        { number: "10 000+", label: "Happy customers" },
        { number: "5 years", label: "On the market" },
        { number: "1 year", label: "Warranty included" },
      ]
    : isKy
    ? [
        { number: "5 000+", label: "Товарлар складда" },
        { number: "10 000+", label: "Бактылуу кардарлар" },
        { number: "5 жыл", label: "Рынокто" },
        { number: "1 жыл", label: "Кепилдик" },
      ]
    : [
        { number: "5 000+", label: "Товаров в наличии" },
        { number: "10 000+", label: "Довольных клиентов" },
        { number: "5 лет", label: "На рынке" },
        { number: "1 год", label: "Гарантия" },
      ];

  const advantages = isEn
    ? [
        {
          icon: "🏆",
          title: "Official Warranty",
          desc: "All products come with an official manufacturer warranty. We're an authorized reseller.",
        },
        {
          icon: "💳",
          title: "Installment Plans",
          desc: "Buy now, pay later — flexible installment options from 3 to 24 months with no hidden fees.",
        },
        {
          icon: "🚚",
          title: "Fast Delivery",
          desc: "Same-day delivery in Bishkek and shipping to all regions of Kyrgyzstan.",
        },
        {
          icon: "🧑‍💻",
          title: "Expert Advice",
          desc: "Our consultants help you choose the right device for your needs and budget.",
        },
      ]
    : isKy
    ? [
        {
          icon: "🏆",
          title: "Расмий кепилдик",
          desc: "Бардык товарлар өндүрүүчүнүн расмий кепилдиги менен берилет. Биз авторизацияланган дилербиз.",
        },
        {
          icon: "💳",
          title: "Бөлүп төлөө",
          desc: "Азыр сатып алыңыз, кийин төлөңүз — 3 дөн 24 айга чейин ийкемдүү бөлүп төлөө планы.",
        },
        {
          icon: "🚚",
          title: "Тез жеткирүү",
          desc: "Бишкекке ошол эле күнү жеткирүү жана Кыргызстандын бардык аймактарына жөнөтүү.",
        },
        {
          icon: "🧑‍💻",
          title: "Эксперттик кеңеш",
          desc: "Биздин кеңешчилер сиздин муктаждыктарыңыз жана бюджетиңиз үчүн туура аппаратты тандоого жардам берет.",
        },
      ]
    : [
        {
          icon: "🏆",
          title: "Официальная гарантия",
          desc: "Все товары поставляются с официальной гарантией производителя. Мы авторизованный дилер.",
        },
        {
          icon: "💳",
          title: "Рассрочка",
          desc: "Купите сейчас, платите потом — гибкие условия рассрочки от 3 до 24 месяцев без скрытых комиссий.",
        },
        {
          icon: "🚚",
          title: "Быстрая доставка",
          desc: "Доставка в день заказа по Бишкеку и отправка во все регионы Кыргызстана.",
        },
        {
          icon: "🧑‍💻",
          title: "Экспертная консультация",
          desc: "Наши консультанты помогут выбрать правильное устройство под ваши нужды и бюджет.",
        },
      ];

  const advantagesTitle = isEn
    ? "Our Advantages"
    : isKy
    ? "Биздин артыкчылыктарыбыз"
    : "Наши преимущества";

  const whyTitle = isEn
    ? "Why TomStore?"
    : isKy
    ? "Эмнеге TomStore?"
    : "Почему TomStore?";

  const whyTexts = isEn
    ? [
        "TomStore was founded with one simple goal: to make buying quality electronics in Kyrgyzstan easy, honest, and accessible. We are based in the heart of Bishkek at Vesna Mall and serve thousands of customers every year.",
        "We stock laptops from HP, Dell, Lenovo, ASUS, Acer and MSI; printers from Epson and Canon; PCs, monitors, and all the accessories you need. Whether you're a student, professional, gamer, or a business — we have the right solution for you.",
        "Our team of experts is always ready to advise you in person, by phone, or via WhatsApp. We believe that a satisfied customer is the best advertisement, and we work hard to earn your trust every day.",
      ]
    : isKy
    ? [
        "TomStore бир жөнөкөй максат менен негизделген: Кыргызстанда сапаттуу электроника сатып алууну жеңил, чынчыл жана жеткиликтүү кылуу. Биз Бишкектин борборунда, Весна СБда жайгашкан жана жыл сайын миңдеген кардарларга кызмат кылабыз.",
        "HP, Dell, Lenovo, ASUS, Acer жана MSIден ноутбуктар; Epson жана Canonдон принтерлер; ПК, мониторлор жана сизге керектүү бардык аксессуарлар складда бар. Студентпи, кесипкөйбү, геймерби же бизнесби — сиз үчүн туура чечим бар.",
        "Биздин эксперттер командасы дайыма жеке, телефон же WhatsApp аркылуу кеңеш берүүгө даяр. Канааттанган кардар — эң жакшы жарнамасы деп ишенебиз жана күн сайын ишенимиңизди актоо үчүн иштейбиз.",
      ]
    : [
        "TomStore основан с одной простой целью: сделать покупку качественной электроники в Кыргызстане лёгкой, честной и доступной. Мы находимся в самом сердце Бишкека — в ТЦ Весна — и ежегодно обслуживаем тысячи клиентов.",
        "В наличии ноутбуки HP, Dell, Lenovo, ASUS, Acer и MSI; принтеры Epson и Canon; ПК, мониторы и все необходимые аксессуары. Студент, профессионал, геймер или бизнес — у нас есть правильное решение для вас.",
        "Наша команда экспертов всегда готова проконсультировать вас лично, по телефону или через WhatsApp. Мы верим, что довольный клиент — лучшая реклама, и каждый день работаем над тем, чтобы оправдать ваше доверие.",
      ];

  const ctaTitle = isEn
    ? "Ready to find your perfect device?"
    : isKy
    ? "Идеалдуу аппаратыңызды табууга даярсызбы?"
    : "Готовы найти идеальное устройство?";

  const ctaSubtitle = isEn
    ? "Browse our full catalog of laptops, printers, PCs and accessories."
    : isKy
    ? "Ноутбуктар, принтерлер, ПК жана аксессуарлардын толук каталогун карап чыгыңыз."
    : "Просмотрите наш полный каталог ноутбуков, принтеров, ПК и аксессуаров.";

  const ctaBtnText = isEn
    ? "Go to Catalog"
    : isKy
    ? "Каталогго өтүү"
    : "Перейти в каталог";

  return (
    <AppLayout>
      <Box pt="20px" pb="60px">
        <OrgSchema locale={locale} />

        <Breadcrumbs
          items={[{ label: homeLabel, href: "/" }, { label: aboutLabel }]}
          locale={locale}
        />

        {/* Hero */}
        <HeroSection>
          <HeroTitle>{heroTitle}</HeroTitle>
          <HeroDesc>{heroDesc}</HeroDesc>
        </HeroSection>

        {/* Stats */}
        <Box mb="2.5rem">
          <Grid container spacing={4}>
            {stats.map((s) => (
              <Grid item lg={3} sm={6} xs={6} key={s.label}>
                <StatCard>
                  <StatNumber>{s.number}</StatNumber>
                  <StatLabel>{s.label}</StatLabel>
                </StatCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Advantages */}
        <Box mb="2.5rem">
          <SectionTitle>{advantagesTitle}</SectionTitle>
          <Grid container spacing={4}>
            {advantages.map((a) => (
              <Grid item lg={6} sm={6} xs={12} key={a.title}>
                <AdvantageCard>
                  <div className="icon">{a.icon}</div>
                  <div>
                    <h3>{a.title}</h3>
                    <p>{a.desc}</p>
                  </div>
                </AdvantageCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Why TomStore */}
        <WhySection>
          <SectionTitle style={{ borderBottom: "2px solid #dde3ed" }}>
            {whyTitle}
          </SectionTitle>
          {whyTexts.map((text, i) => (
            <WhyText key={i}>{text}</WhyText>
          ))}
        </WhySection>

        {/* CTA */}
        <CtaSection>
          <CtaTitle>{ctaTitle}</CtaTitle>
          <CtaSubtitle>{ctaSubtitle}</CtaSubtitle>
          <CtaButton href={`/${locale}/catalog`}>{ctaBtnText}</CtaButton>
        </CtaSection>
      </Box>
    </AppLayout>
  );
}
