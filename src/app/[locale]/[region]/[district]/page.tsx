import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppLayout from "@component/layout/layout-3";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { H1, H2, H3, Paragraph } from "@component/Typography";
import Card from "@component/Card";
import Breadcrumbs from "@component/seo/Breadcrumbs";
import { ALL_REGIONS, GEO_CATEGORIES, MAJOR_CITIES, getRegion, getDistrict, getGeoCategory, getMajorCity, isCategorySlug } from "@data/geo";
import styled from "styled-components";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tomstore.kg";

type Props = { params: Promise<{ locale: string; region: string; district: string }> };

export function generateStaticParams() {
  const combos: { region: string; district: string }[] = [];
  // Pattern 1: /[region]/[district]  →  /chuy/kant
  for (const region of ALL_REGIONS) {
    for (const d of region.districts) {
      combos.push({ region: region.slug, district: d.slug });
    }
  }
  // Pattern 2: /[category]/[city]  →  /noutbuki/bishkek
  for (const cat of GEO_CATEGORIES) {
    for (const city of MAJOR_CITIES) {
      combos.push({ region: cat.slug, district: city.slug });
    }
  }
  return combos;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, region: rSlug, district: dSlug } = await params;
  const url = `${SITE_URL}/${locale}/${rSlug}/${dSlug}`;

  // Pattern 2: /[category]/[city]
  if (isCategorySlug(rSlug)) {
    const cat  = getGeoCategory(rSlug)!;
    const city = getMajorCity(dSlug);
    if (!city) return {};
    const catName = locale === "en" ? cat.nameEn : locale === "ky" ? cat.nameKy : cat.nameRu;
    const title =
      locale === "en" ? `Buy ${cat.nameEn} in ${city.nameEn} — TomStore`
      : locale === "ky" ? `${city.nameKy}га ${cat.nameKy} — TomStore`
      : `Купить ${cat.nameRu.toLowerCase()} ${city.inRu} — доставка ${city.deliveryDays} | TomStore`;
    const description =
      locale === "en" ? `Order ${cat.nameEn.toLowerCase()} online with delivery to ${city.nameEn} (${city.regionRu}). Delivery ${city.deliveryDays}. Warranty, installment.`
      : locale === "ky" ? `TomStore ${city.nameKy}га ${cat.nameKy.toLowerCase()} жеткирет. Кепилдик, бөлүп төлөө.`
      : `Заказать ${cat.nameRu.toLowerCase()} ${city.inRu} онлайн. Доставка ${city.deliveryDays}. ${city.regionRu}. Гарантия, рассрочка, большой выбор.`;
    return { title, description, alternates: { canonical: url, languages: { ru: `${SITE_URL}/ru/${rSlug}/${dSlug}`, en: `${SITE_URL}/en/${rSlug}/${dSlug}`, ky: `${SITE_URL}/ky/${rSlug}/${dSlug}` } }, openGraph: { title, description, url, type: "website" } };
  }

  // Pattern 1: /[region]/[district]
  const district = getDistrict(rSlug, dSlug);
  const region   = getRegion(rSlug);
  if (!district || !region) return {};

  const regionName = locale === "ky" ? region.nameKy : locale === "en" ? region.nameEn : region.nameRu;

  const title =
    locale === "en"
      ? `Buy Electronics in ${district.nameEn} (${region.nameEn}) — TomStore`
      : locale === "ky"
      ? `${district.nameKy}га электроника — TomStore`
      : `Электроника ${district.inRu} — купить с доставкой | TomStore`;

  const description =
    locale === "en"
      ? `TomStore delivers laptops, printers and computers to ${district.nameEn}, ${region.nameEn}. Delivery in ${district.deliveryDays}. ${district.distanceFromCapital}.`
      : locale === "ky"
      ? `TomStore ${district.nameKy}га ноутбук, принтер, компьютер жеткирет. Жеткирүү ${district.deliveryDays}.`
      : `TomStore доставляет ноутбуки, принтеры и компьютеры ${district.inRu} (${regionName}). Доставка ${district.deliveryDays}. ${district.distanceFromCapital}.`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ru: `${SITE_URL}/ru/${rSlug}/${dSlug}`,
        en: `${SITE_URL}/en/${rSlug}/${dSlug}`,
        ky: `${SITE_URL}/ky/${rSlug}/${dSlug}`,
      },
    },
    openGraph: { title, description, url, type: "website" },
  };
}

// ─── Styled ──────────────────────────────────────────────────────────────────

const DistrictHero = styled.section`
  background: linear-gradient(135deg, #1565c0 0%, #0277bd 100%);
  border-radius: 16px; padding: 2.5rem 2rem; margin-bottom: 2.5rem; color: #fff;
  h1 { color: #fff; margin-bottom: 0.5rem; }
  p  { color: rgba(255,255,255,0.85); font-size: 15px; line-height: 1.6; margin: 0; }
`;
const BadgeRow = styled.div`
  display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.5rem;
`;
const Badge = styled.div`
  background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3);
  border-radius: 20px; padding: 0.4rem 1rem; font-size: 13px; color: #fff;
`;

const CategoryCard = styled(Card)`
  padding: 1.5rem 1.25rem; text-align: center; text-decoration: none; display: block;
  transition: box-shadow 150ms ease, transform 150ms ease;
  &:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.1); transform: translateY(-2px); }
  .icon  { font-size: 2.2rem; margin-bottom: 0.5rem; }
  .name  { font-size: 14px; font-weight: 600; color: ${({ theme }) => theme.colors.text.primary}; }
  .hint  { font-size: 12px; color: ${({ theme }) => theme.colors.text.muted}; margin-top: 4px; }
`;

const SettlementLink = styled(Link)`
  display: block; padding: 0.6rem 1rem; border-radius: 8px; text-decoration: none;
  font-size: 14px; font-weight: 500; color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => theme.colors.gray[100]};
  transition: background 150ms ease;
  &:hover { background: ${({ theme }) => theme.colors.primary.light}; color: ${({ theme }) => theme.colors.primary.main}; }
`;

const FaqItem = styled.details`
  border: 1px solid ${({ theme }) => theme.colors.gray[200]}; border-radius: 10px;
  margin-bottom: 0.75rem; overflow: hidden;
  summary {
    padding: 1rem 1.25rem; font-size: 15px; font-weight: 600; cursor: pointer;
    color: ${({ theme }) => theme.colors.text.primary}; list-style: none;
    display: flex; justify-content: space-between; align-items: center;
    &::-webkit-details-marker { display: none; }
    &::after { content: "+"; font-size: 18px; color: ${({ theme }) => theme.colors.primary.main}; }
  }
  &[open] summary::after { content: "−"; }
  .answer { padding: 0 1.25rem 1rem; font-size: 14px; line-height: 1.7; color: ${({ theme }) => theme.colors.text.secondary}; }
`;

export default async function DistrictPage({ params }: Props) {
  const { locale, region: rSlug, district: dSlug } = await params;

  // ── Pattern 2: /[category]/[city]  e.g. /noutbuki/bishkek ─────────────────
  if (isCategorySlug(rSlug)) {
    const cat  = getGeoCategory(rSlug)!;
    const city = getMajorCity(dSlug);
    if (!city) notFound();

    const isEn = locale === "en";
    const isKy = locale === "ky";
    const catName  = isEn ? cat.nameEn  : isKy ? cat.nameKy  : cat.nameRu;
    const cityName = isEn ? city.nameEn : isKy ? city.nameKy : city.nameRu;
    const inCity   = isEn ? `in ${city.nameEn}` : isKy ? `${city.nameKy}га` : city.inRu;
    const homeLabel = isEn ? "Home" : isKy ? "Башкы бет" : "Главная";

    const h1 = isEn
      ? `Buy ${cat.nameEn} in ${city.nameEn} — TomStore, Delivery ${city.deliveryDays}`
      : isKy
      ? `${city.nameKy}га ${cat.nameKy} — TomStore жеткирет`
      : `Купить ${cat.nameRu.toLowerCase()} ${city.inRu} — доставка ${city.deliveryDays}`;

    const lead = isEn
      ? `TomStore delivers ${cat.nameEn.toLowerCase()} to ${city.nameEn} (${city.regionRu}) in ${city.deliveryDays}. Official warranty, installment plans, secure online payment.`
      : isKy
      ? `TomStore ${city.nameKy}га (${city.regionRu}) ${city.deliveryDays} ичинде ${cat.nameKy.toLowerCase()} жеткирет. Кепилдик, бөлүп төлөө.`
      : `TomStore доставляет ${cat.nameRu.toLowerCase()} ${city.inRu} (${city.regionRu}) за ${city.deliveryDays}. Официальная гарантия, рассрочка без переплат.`;

    const faqItems = isEn ? [
      { q: `Does TomStore deliver ${cat.nameEn.toLowerCase()} to ${city.nameEn}?`, a: `Yes! We deliver to ${city.nameEn} in ${city.deliveryDays}. All items come with an official warranty.` },
      { q: `How to order a ${cat.accusRu} for delivery to ${city.nameEn}?`, a: `Choose from our catalog, add to cart, and enter your address in ${city.nameEn}. Delivery in ${city.deliveryDays}.` },
      { q: `Is installment available in ${city.nameEn}?`, a: `Yes, installment is available throughout Kyrgyzstan including ${city.nameEn}. Call: +996-508-724-365.` },
    ] : [
      { q: `TomStore доставляет ${cat.nameRu.toLowerCase()} ${city.inRu}?`, a: `Да! Доставляем ${city.inRu} за ${city.deliveryDays}. Гарантия на все товары.` },
      { q: `Как заказать ${cat.accusRu} с доставкой ${city.inRu}?`, a: `Добавьте товар в корзину на сайте TomStore и укажите адрес ${city.inRu}. Курьер доставит за ${city.deliveryDays}.` },
      { q: `Какие ${cat.nameRu.toLowerCase()} самые популярные ${city.inRu}?`, a: `Жители ${cityName} чаще выбирают ноутбуки для работы и учёбы, МФУ для дома и принтеры. Бренды: HP, Asus, Acer, Lenovo.` },
      { q: `Есть ли рассрочка для жителей ${cityName}?`, a: `Да, рассрочка доступна по всему Кыргызстану, включая ${cityName}. Оформление: +996-508-724-365.` },
    ];

    const faqSchema = {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: faqItems.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    };

    return (
      <AppLayout>
        <Box pt="20px" pb="60px">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
          <Breadcrumbs items={[{ label: homeLabel, href: "/" }, { label: catName, href: `/${rSlug}` }, { label: cityName }]} locale={locale} />
          <DistrictHero>
            <H1 fontSize="26px">{h1}</H1>
            <p>{lead}</p>
            <BadgeRow>
              <Badge>{cat.icon} {catName}</Badge>
              <Badge>🚚 {isEn ? `Delivery ${city.deliveryDays}` : `Доставка ${city.deliveryDays}`}</Badge>
              <Badge>✅ {isEn ? "Warranty" : "Гарантия"}</Badge>
              <Badge>💳 {isEn ? "Installment" : "Рассрочка"}</Badge>
            </BadgeRow>
          </DistrictHero>

          {/* Other categories in this city */}
          <H2 fontSize="18px" mb="1.25rem">
            {isEn ? `More electronics in ${cityName}` : `Другая электроника ${city.inRu}`}
          </H2>
          <Grid container spacing={3} mb="2.5rem">
            {GEO_CATEGORIES.map((c) => (
              <Grid item lg={2} sm={4} xs={6} key={c.slug}>
                <CategoryCard as={Link} href={`/${locale}/${c.slug}/${dSlug}`} borderRadius={12}>
                  <div className="icon">{c.icon}</div>
                  <div className="name">{isEn ? c.nameEn : c.nameRu}</div>
                  <div className="hint">{city.deliveryDays}</div>
                </CategoryCard>
              </Grid>
            ))}
          </Grid>

          {/* Same category in other cities */}
          <H2 fontSize="18px" mb="1rem">
            {isEn ? `${cat.nameEn} in other cities` : `${cat.nameRu} в других городах`}
          </H2>
          <Box mb="2.5rem" display="flex" flexWrap="wrap" style={{ gap: "0.5rem" }}>
            {MAJOR_CITIES.filter((c) => c.slug !== dSlug).map((c) => (
              <Link key={c.slug} href={`/${locale}/${rSlug}/${c.slug}`}
                style={{ fontSize: 13, color: "#1565c0", textDecoration: "none", background: "#e8f0fe", borderRadius: 12, padding: "4px 12px" }}>
                {isEn ? c.nameEn : c.nameRu}
              </Link>
            ))}
          </Box>

          <H2 fontSize="18px" mb="1.25rem">
            {isEn ? "Frequently Asked Questions" : "Частые вопросы"}
          </H2>
          {faqItems.map((item, i) => (
            <FaqItem key={i}>
              <summary>{item.q}</summary>
              <div className="answer">{item.a}</div>
            </FaqItem>
          ))}
        </Box>
      </AppLayout>
    );
  }

  // ── Pattern 1: /[region]/[district]  e.g. /chuy/kant ──────────────────────
  const district = getDistrict(rSlug, dSlug);
  const region   = getRegion(rSlug);
  if (!district || !region) notFound();

  const isEn = locale === "en";
  const isKy = locale === "ky";
  const dName     = isEn ? district.nameEn : isKy ? district.nameKy : district.nameRu;
  const rName     = isEn ? region.nameEn   : isKy ? region.nameKy   : region.nameRu;
  const inCity    = isEn ? `in ${district.nameEn}` : isKy ? `${district.nameKy}га` : district.inRu;

  const homeLabel  = isEn ? "Home"     : isKy ? "Башкы бет"  : "Главная";
  const rLabel     = isEn ? region.nameEn : isKy ? region.nameKy : region.nameRu;

  const h1 = isEn
    ? `Electronics in ${district.nameEn} — Delivery to Your Door`
    : isKy
    ? `${district.nameKy}га электроника — TomStore жеткирет`
    : `Электроника ${district.inRu} — TomStore доставляет`;

  const lead = isEn
    ? `TomStore delivers laptops, printers, monitors and accessories to ${district.nameEn} (${rName}) in ${district.deliveryDays}. ${district.distanceFromCapital}. Official warranty, installment plans available.`
    : isKy
    ? `TomStore ${district.nameKy}га (${rName}) ${district.deliveryDays} ичинде ноутбук, принтер, монитор жана аксессуарларды жеткирет. Кепилдик, бөлүп төлөө.`
    : `TomStore доставляет ноутбуки, принтеры, мониторы и аксессуары ${district.inRu} (${rName}) за ${district.deliveryDays}. ${district.distanceFromCapital}. Официальная гарантия, рассрочка.`;

  const faqItems = isEn ? [
    {
      q: `Does TomStore deliver to ${district.nameEn}?`,
      a: `Yes! We deliver to ${district.nameEn} and all nearby settlements. Delivery time: ${district.deliveryDays} from order date.`,
    },
    {
      q: `How to order a laptop for delivery to ${district.nameEn}?`,
      a: `Choose a laptop in the TomStore catalog, add to cart, and enter your address in ${district.nameEn}. Our courier will deliver in ${district.deliveryDays}.`,
    },
    {
      q: `Is installment available for orders in ${district.nameEn}?`,
      a: `Yes, installment plans are available for all residents of ${district.nameEn}. We offer interest-free installments. Contact us: +996-508-724-365.`,
    },
  ] : isKy ? [
    {
      q: `TomStore ${district.nameKy}га жеткиреби?`,
      a: `Ооба! ${district.nameKy}га жана жакын айылдарга жеткиребиз. Жеткирүү мөөнөтү: ${district.deliveryDays}.`,
    },
    {
      q: `${district.nameKy}дан кантип буюртма берсе болот?`,
      a: `TomStore каталогунан буюмду тандап, себетке кошуп, ${district.nameKy}дагы дарегиңизди жазыңыз. Курьер ${district.deliveryDays} ичинде жеткирет.`,
    },
  ] : [
    {
      q: `TomStore доставляет ${district.inRu}?`,
      a: `Да! Мы доставляем ${district.inRu} и во все населённые пункты поблизости. Срок доставки: ${district.deliveryDays} с момента оформления заказа.`,
    },
    {
      q: `Как заказать ноутбук с доставкой ${district.inRu}?`,
      a: `Выберите ноутбук в каталоге TomStore, добавьте в корзину и укажите адрес ${district.inRu}. Курьер доставит за ${district.deliveryDays}.`,
    },
    {
      q: `Есть ли рассрочка для жителей ${dName}?`,
      a: `Да, рассрочка доступна для жителей ${dName} и всего ${rName}. Оформление без переплат. Подробности: +996-508-724-365.`,
    },
    {
      q: `Какие категории товаров доставляются ${district.inRu}?`,
      a: `Мы доставляем ${district.inRu} ноутбуки, принтеры, МФУ, компьютеры, мониторы, аксессуары и сетевое оборудование. Весь ассортимент из каталога TomStore.`,
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: h1,
    description: lead,
    url: `${SITE_URL}/${locale}/${rSlug}/${dSlug}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: homeLabel, item: `${SITE_URL}/${locale}` },
        { "@type": "ListItem", position: 2, name: rLabel, item: `${SITE_URL}/${locale}/${rSlug}` },
        { "@type": "ListItem", position: 3, name: dName },
      ],
    },
  };

  return (
    <AppLayout>
      <Box pt="20px" pb="60px">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        <Breadcrumbs
          items={[
            { label: homeLabel, href: "/" },
            { label: rLabel, href: `/${rSlug}` },
            { label: dName },
          ]}
          locale={locale}
        />

        <DistrictHero>
          <H1 fontSize="26px">{h1}</H1>
          <p>{lead}</p>
          <BadgeRow>
            <Badge>🚚 {isEn ? `Delivery ${district.deliveryDays}` : `Доставка ${district.deliveryDays}`}</Badge>
            <Badge>✅ {isEn ? "Official warranty" : "Гарантия"}</Badge>
            <Badge>💳 {isEn ? "Installment" : "Рассрочка"}</Badge>
            <Badge>📍 {district.distanceFromCapital}</Badge>
          </BadgeRow>
        </DistrictHero>

        {/* Categories for this district */}
        <H2 fontSize="18px" mb="1.25rem">
          {isEn ? `Categories available in ${dName}` : isKy ? `${dName}дагы категориялар` : `Категории с доставкой ${district.inRu}`}
        </H2>
        <Grid container spacing={4} mb="2.5rem">
          {GEO_CATEGORIES.map((cat) => {
            const catName = isEn ? cat.nameEn : isKy ? cat.nameKy : cat.nameRu;
            return (
              <Grid item lg={2} sm={4} xs={6} key={cat.slug}>
                <CategoryCard
                  as={Link}
                  href={`/${locale}/${rSlug}/${dSlug}/${cat.slug}`}
                  borderRadius={12}
                >
                  <div className="icon">{cat.icon}</div>
                  <div className="name">{catName}</div>
                  <div className="hint">
                    {isEn ? district.deliveryDays : `${district.deliveryDays}`}
                  </div>
                </CategoryCard>
              </Grid>
            );
          })}
        </Grid>

        {/* Settlements */}
        {district.settlements.length > 0 && (
          <Box mb="2.5rem">
            <H2 fontSize="18px" mb="1rem">
              {isEn ? "Nearby settlements" : isKy ? "Жакын айылдар" : "Ближайшие населённые пункты"}
            </H2>
            <Grid container spacing={3}>
              {district.settlements.map((s) => (
                <Grid item lg={3} sm={4} xs={6} key={s.slug}>
                  <SettlementLink href={`/${locale}/${rSlug}/${dSlug}#${s.slug}`}>
                    📍 {isEn ? s.nameEn : s.nameRu}
                    <span style={{ float: "right", fontSize: 11, color: "#999" }}>{s.deliveryDays}</span>
                  </SettlementLink>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* FAQ */}
        <H2 fontSize="18px" mb="1.25rem">
          {isEn ? `FAQ — delivery to ${dName}` : isKy ? `Суроолор — ${dName}га жеткирүү` : `Вопросы — доставка ${district.inRu}`}
        </H2>
        <Box mb="2.5rem">
          {faqItems.map((item, i) => (
            <FaqItem key={i}>
              <summary>{item.q}</summary>
              <div className="answer">{item.a}</div>
            </FaqItem>
          ))}
        </Box>

        {/* Internal links to other districts */}
        <H3 fontSize="15px" mb="0.75rem" color="text.muted">
          {isEn ? "Other cities in the region" : "Другие города в регионе"}
        </H3>
        <Box display="flex" flexWrap="wrap" style={{ gap: "0.5rem" }}>
          {region.districts
            .filter((d) => d.slug !== dSlug)
            .map((d) => (
              <Link
                key={d.slug}
                href={`/${locale}/${rSlug}/${d.slug}`}
                style={{ fontSize: 13, color: "#1565c0", textDecoration: "none",
                  background: "#e8f0fe", borderRadius: 12, padding: "3px 10px" }}
              >
                {isEn ? d.nameEn : d.nameRu}
              </Link>
            ))}
        </Box>
      </Box>
    </AppLayout>
  );
}
