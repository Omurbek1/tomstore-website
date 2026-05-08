import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppLayout from "@component/layout/layout-3";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { H1, H2, H3, Paragraph } from "@component/Typography";
import Card from "@component/Card";
import Breadcrumbs from "@component/seo/Breadcrumbs";
import cities, { getCityBySlug } from "@data/cities";
import styled from "styled-components";

import { SITE_URL } from "@lib/siteUrl";

type Props = { params: Promise<{ locale: string; city: string }> };

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};

  const cityName = locale === "ky" ? city.nameKy : locale === "en" ? city.nameEn : city.nameRu;
  const inCity = locale === "en" ? `in ${city.nameEn}` : locale === "ky" ? `${city.nameKy}га` : city.inRu;
  const regionName = locale === "en" ? city.regionEn : locale === "ky" ? city.regionKy : city.regionRu;

  const title =
    locale === "en"
      ? `Buy Electronics in ${city.nameEn}, Kyrgyzstan — TomStore`
      : locale === "ky"
      ? `${city.nameKy}га электроника — TomStore`
      : `Купить электронику ${city.inRu} — TomStore | Доставка по Кыргызстану`;

  const description =
    locale === "en"
      ? `TomStore delivers laptops, printers and computers to ${city.nameEn} (${regionName}). ${city.deliveryDays} delivery. Warranty, installment available.`
      : locale === "ky"
      ? `TomStore ${city.nameKy}га ноутбук, принтер, компьютер жеткирет. Кепилдик, бөлүп төлөө.`
      : `TomStore доставляет ноутбуки, принтеры и компьютеры ${city.inRu} (${regionName}). Доставка ${city.deliveryDays}. Гарантия, рассрочка.`;

  const url = `${SITE_URL}/${locale}/dostavka/${citySlug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ru: `${SITE_URL}/ru/dostavka/${citySlug}`,
        en: `${SITE_URL}/en/dostavka/${citySlug}`,
        ky: `${SITE_URL}/ky/dostavka/${citySlug}`,
      },
    },
    openGraph: { title, description, url, type: "website" },
  };
}

// ─── Styled components ───────────────────────────────────────────────────────

const HeroSection = styled.section`
  background: linear-gradient(135deg, #1565c0 0%, #0d47a1 100%);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  margin-bottom: 2.5rem;
  color: #fff;

  h1 { color: #fff; margin-bottom: 0.5rem; }
  p  { color: rgba(255,255,255,0.85); font-size: 15px; line-height: 1.6; margin: 0; }
`;

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

const Badge = styled.div`
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 20px;
  padding: 0.4rem 1rem;
  font-size: 13px;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const CategoryCard = styled(Card)`
  padding: 1.25rem;
  text-align: center;
  text-decoration: none;
  display: block;
  transition: box-shadow 150ms ease, transform 150ms ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    transform: translateY(-2px);
  }

  .icon { font-size: 2rem; margin-bottom: 0.5rem; }

  .label {
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const FaqItem = styled.details`
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: 10px;
  padding: 0;
  margin-bottom: 0.75rem;
  overflow: hidden;

  summary {
    padding: 1rem 1.25rem;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text.primary};
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;

    &::-webkit-details-marker { display: none; }
    &::after { content: "+"; font-size: 18px; color: ${({ theme }) => theme.colors.primary.main}; }
  }

  &[open] summary::after { content: "−"; }

  .answer {
    padding: 0 1.25rem 1rem;
    font-size: 14px;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const DeliveryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  th, td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  }

  th {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.gray[100]};
  }

  td { color: ${({ theme }) => theme.colors.text.secondary}; }
  tr:last-child td { border-bottom: none; }
`;

const CtaSection = styled.section`
  background: ${({ theme }) => theme.colors.primary.light};
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  margin-top: 2.5rem;

  a {
    display: inline-block;
    background: ${({ theme }) => theme.colors.primary.main};
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    padding: 0.75rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    margin-top: 1rem;
    transition: opacity 150ms ease;
    &:hover { opacity: 0.9; }
  }
`;

// ─── Categories ──────────────────────────────────────────────────────────────

const CATEGORIES = [
  { slug: "/catalog/laptops",     icon: "💻", ru: "Ноутбуки",    en: "Laptops",   ky: "Ноутбуктар" },
  { slug: "/catalog/printers",    icon: "🖨️", ru: "Принтеры",   en: "Printers",  ky: "Принтерлер" },
  { slug: "/catalog/computers",   icon: "🖥️", ru: "Компьютеры", en: "Computers", ky: "Компьютерлер" },
  { slug: "/catalog/monitors",    icon: "🖥",  ru: "Мониторы",   en: "Monitors",  ky: "Мониторлор" },
  { slug: "/catalog/accessories", icon: "🖱️", ru: "Аксессуары", en: "Accessories",ky: "Аксессуарлар" },
  { slug: "/catalog/network",     icon: "📡", ru: "Сеть и Wi-Fi",en: "Network",   ky: "Тармак" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CityPage({ params }: Props) {
  const { locale, city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const isEn = locale === "en";
  const isKy = locale === "ky";
  const cityName = isEn ? city.nameEn : isKy ? city.nameKy : city.nameRu;
  const inCity = isEn ? `in ${city.nameEn}` : isKy ? `${city.nameKy}га` : city.inRu;
  const regionName = isEn ? city.regionEn : isKy ? city.regionKy : city.regionRu;

  const homeLabel  = isEn ? "Home"     : isKy ? "Башкы бет" : "Главная";
  const delivLabel = isEn ? "Delivery" : isKy ? "Жеткирүү"  : "Доставка";

  const h1 = isEn
    ? `Buy Electronics in ${cityName} — TomStore`
    : isKy
    ? `${cityName}га электроника — TomStore`
    : `Электроника ${inCity} — купить с доставкой | TomStore`;

  const lead = isEn
    ? `TomStore is Kyrgyzstan's online electronics store. We deliver laptops, printers, computers and accessories to ${cityName} (${regionName}) in ${city.deliveryDays}. Official warranty, installment plans, and secure payment.`
    : isKy
    ? `TomStore — Кыргызстандагы электроника онлайн-дүкөнү. ${cityName}га ноутбук, принтер, компьютер жана аксессуарларды ${city.deliveryDays} ичинде жеткиребиз. Кепилдик, бөлүп төлөө.`
    : `TomStore — интернет-магазин электроники с доставкой по всему Кыргызстану. Отправляем заказы ${inCity} (${regionName}) за ${city.deliveryDays}. Официальная гарантия, рассрочка, онлайн-оплата.`;

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: h1,
    description: lead,
    url: `${SITE_URL}/${locale}/dostavka/${citySlug}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: homeLabel, item: `${SITE_URL}/${locale}` },
        { "@type": "ListItem", position: 2, name: delivLabel, item: `${SITE_URL}/${locale}/dostavka` },
        { "@type": "ListItem", position: 3, name: cityName },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: isEn ? [
      {
        "@type": "Question",
        name: `Does TomStore deliver to ${cityName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes! TomStore delivers to ${cityName} and all regions of Kyrgyzstan. Delivery takes ${city.deliveryDays} from the order date.`,
        },
      },
      {
        "@type": "Question",
        name: `What is the delivery cost to ${cityName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Delivery cost to ${cityName} depends on the order size and weight. Contact us for an exact quote: +996-508-724-365.`,
        },
      },
      {
        "@type": "Question",
        name: `Can I buy a laptop in ${cityName} from TomStore?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. Order on the TomStore website and receive your laptop in ${cityName} in ${city.deliveryDays}. We offer warranty and installment plans.`,
        },
      },
    ] : isKy ? [
      {
        "@type": "Question",
        name: `TomStore ${cityName}га жеткиреби?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Ооба! TomStore ${cityName}га жана Кыргызстандын бардык аймактарына жеткирет. Жеткирүү мөөнөтү ${city.deliveryDays}.`,
        },
      },
      {
        "@type": "Question",
        name: `${cityName}га жеткирүүнүн баасы канча?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Жеткирүүнүн баасы буюмдун салмагына жана өлчөмүнө жараша болот. Тел: +996-508-724-365.`,
        },
      },
    ] : [
      {
        "@type": "Question",
        name: `TomStore доставляет ${inCity}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Да! TomStore доставляет заказы ${inCity} и во все регионы Кыргызстана. Срок доставки — ${city.deliveryDays} с момента оформления заказа.`,
        },
      },
      {
        "@type": "Question",
        name: `Сколько стоит доставка ${inCity}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Стоимость доставки ${inCity} зависит от габаритов и веса заказа. Уточните у менеджера: +996-508-724-365 или в чате на сайте.`,
        },
      },
      {
        "@type": "Question",
        name: `Как купить ноутбук ${inCity} от TomStore?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Оформите заказ на сайте TomStore, выберите доставку. Курьер привезёт ноутбук ${inCity} за ${city.deliveryDays}. Доступны гарантия и рассрочка без переплат.`,
        },
      },
      {
        "@type": "Question",
        name: `Есть ли рассрочка при заказе ${inCity}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Да, рассрочка доступна для покупателей по всему Кыргызстану, включая ${cityName}. Оформление через наш сайт или по телефону.`,
        },
      },
    ],
  };

  return (
    <AppLayout>
      <Box pt="20px" pb="60px">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        <Breadcrumbs
          items={[
            { label: homeLabel, href: "/" },
            { label: delivLabel, href: "/dostavka" },
            { label: cityName },
          ]}
          locale={locale}
        />

        {/* Hero */}
        <HeroSection>
          <H1 fontSize="28px">{h1}</H1>
          <p>{lead}</p>
          <BadgeRow>
            <Badge>✅ {isEn ? "Official warranty" : isKy ? "Кепилдик" : "Официальная гарантия"}</Badge>
            <Badge>🚚 {isEn ? `Delivery ${city.deliveryDays}` : isKy ? `Жеткирүү ${city.deliveryDays}` : `Доставка ${city.deliveryDays}`}</Badge>
            <Badge>💳 {isEn ? "Installment available" : isKy ? "Бөлүп төлөө" : "Рассрочка"}</Badge>
            <Badge>📦 {isEn ? "Secure packaging" : isKy ? "Коопсуз таңгак" : "Надёжная упаковка"}</Badge>
          </BadgeRow>
        </HeroSection>

        {/* Categories */}
        <H2 fontSize="20px" mb="1.25rem">
          {isEn ? `Popular categories in ${cityName}` : isKy ? `${cityName}дагы популярдуу категориялар` : `Популярные категории ${inCity}`}
        </H2>
        <Grid container spacing={4} mb="2.5rem">
          {CATEGORIES.map((cat) => (
            <Grid item lg={2} sm={4} xs={6} key={cat.slug}>
              <CategoryCard as={Link} href={`/${locale}${cat.slug}`} borderRadius={12}>
                <div className="icon">{cat.icon}</div>
                <div className="label">{isEn ? cat.en : isKy ? cat.ky : cat.ru}</div>
              </CategoryCard>
            </Grid>
          ))}
        </Grid>

        {/* Delivery info */}
        <Grid container spacing={6} mb="2.5rem">
          <Grid item lg={7} xs={12}>
            <H2 fontSize="20px" mb="1rem">
              {isEn ? `Delivery to ${cityName}` : isKy ? `${cityName}га жеткирүү` : `Доставка ${inCity}`}
            </H2>
            <Card borderRadius={12} p="0">
              <DeliveryTable>
                <thead>
                  <tr>
                    <th>{isEn ? "Parameter" : isKy ? "Параметр" : "Параметр"}</th>
                    <th>{isEn ? "Details" : isKy ? "Маалымат" : "Детали"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{isEn ? "Delivery time" : isKy ? "Жеткирүү мөөнөтү" : "Срок доставки"}</td>
                    <td>{city.deliveryDays}</td>
                  </tr>
                  <tr>
                    <td>{isEn ? "Region" : isKy ? "Облус" : "Регион"}</td>
                    <td>{regionName}</td>
                  </tr>
                  <tr>
                    <td>{isEn ? "Payment" : isKy ? "Төлөм" : "Оплата"}</td>
                    <td>{isEn ? "Online or cash on delivery" : isKy ? "Онлайн же жеткиргенде" : "Онлайн или при получении"}</td>
                  </tr>
                  <tr>
                    <td>{isEn ? "Courier service" : isKy ? "Курьер кызматы" : "Курьерская служба"}</td>
                    <td>{isEn ? "CDEK, Kyrgyz Post, own courier" : isKy ? "СДЭК, Кыргыз почтасы" : "CDEK, Кыргызпочтасы, собственный курьер"}</td>
                  </tr>
                  <tr>
                    <td>{isEn ? "Minimum order" : isKy ? "Минималдуу буйрутма" : "Минимальный заказ"}</td>
                    <td>{isEn ? "No minimum" : isKy ? "Минимум жок" : "Без ограничений"}</td>
                  </tr>
                </tbody>
              </DeliveryTable>
            </Card>
          </Grid>

          <Grid item lg={5} xs={12}>
            <H2 fontSize="20px" mb="1rem">
              {isEn ? "How to order" : isKy ? "Кантип буюртма берүү" : "Как оформить заказ"}
            </H2>
            <Card borderRadius={12} p="1.5rem">
              {(isEn
                ? [
                    ["1", "Choose a product", "Browse the catalog and add to cart"],
                    ["2", "Place an order", "Enter your address in " + cityName],
                    ["3", "Pay online or on delivery", "Bank card or cash"],
                    ["4", "Receive your order", "In " + city.deliveryDays + " at your door"],
                  ]
                : isKy
                ? [
                    ["1", "Буюмду тандаңыз", "Каталогду карап, себетке кошуңуз"],
                    ["2", "Буюртма бериңиз", cityName + "дагы дарегиңизди киргизиңиз"],
                    ["3", "Төлөм жасаңыз", "Карта же жеткиргенде"],
                    ["4", "Буюмду алыңыз", city.deliveryDays + " ичинде"],
                  ]
                : [
                    ["1", "Выберите товар", "Добавьте в корзину из каталога"],
                    ["2", "Оформите заказ", "Укажите адрес " + inCity],
                    ["3", "Оплатите удобным способом", "Картой или наличными при получении"],
                    ["4", "Получите заказ", "Курьер доставит за " + city.deliveryDays],
                  ]
              ).map(([num, title, desc]) => (
                <div key={num} style={{ display: "flex", gap: "1rem", marginBottom: "1rem", alignItems: "flex-start" }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%", background: "#1565c0",
                    color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 700, flexShrink: 0,
                  }}>{num}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{title}</div>
                    <div style={{ fontSize: 13, color: "#666", marginTop: 2 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </Card>
          </Grid>
        </Grid>

        {/* FAQ */}
        <H2 fontSize="20px" mb="1.25rem">
          {isEn ? `Questions about delivery to ${cityName}` : isKy ? `${cityName}га жеткирүү боюнча суроолор` : `Вопросы о доставке ${inCity}`}
        </H2>
        <Box mb="2.5rem">
          {faqSchema.mainEntity.map((item, i) => (
            <FaqItem key={i}>
              <summary>{item.name}</summary>
              <div className="answer">{item.acceptedAnswer.text}</div>
            </FaqItem>
          ))}
        </Box>

        {/* CTA */}
        <CtaSection>
          <H3 fontSize="18px">
            {isEn
              ? `Ready to order? We deliver to ${cityName}!`
              : isKy
              ? `${cityName}га жеткиребиз!`
              : `Оформите заказ — доставим ${inCity}!`}
          </H3>
          <Paragraph fontSize="14px" color="text.secondary">
            {isEn
              ? "Over 500 products in stock. Warranty on all items."
              : isKy
              ? "500дөн ашык буюм. Бардыгына кепилдик."
              : "Более 500 товаров в наличии. Гарантия на всё."}
          </Paragraph>
          <Link href={`/${locale}/catalog`}>
            {isEn ? "Go to catalog →" : isKy ? "Каталогго өтүү →" : "Перейти в каталог →"}
          </Link>
        </CtaSection>
      </Box>
    </AppLayout>
  );
}
