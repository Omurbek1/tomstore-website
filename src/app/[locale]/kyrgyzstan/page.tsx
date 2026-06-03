import type { Metadata } from "next";
import AppLayout from "@component/layout/main-layout";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { H1, H2, H3 } from "@component/Typography";
import Breadcrumbs from "@component/seo/Breadcrumbs";
import { Link } from "@i18n/navigation";
import { SITE_URL } from "@lib/siteUrl";
import { ALL_REGIONS, GEO_CATEGORIES, MAJOR_CITIES } from "@data/geo";
import styled from "styled-components";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const url = `${SITE_URL}/${locale}/kyrgyzstan`;

  const title =
    locale === "en"
      ? "Buy Electronics in Kyrgyzstan — Laptops, Printers, PCs | TomStore"
      : locale === "ky"
      ? "Кыргызстанда электроника сатып алуу — TomStore"
      : "Купить электронику в Кыргызстане — ноутбуки, принтеры, ПК | TomStore";

  const description =
    locale === "en"
      ? "TomStore.kg — nationwide electronics store in Kyrgyzstan. Laptops, printers, PCs, monitors. Delivery to all 7 regions: Bishkek, Osh, Jalal-Abad, Karakol, Naryn, Talas, Batken. Warranty, installment."
      : locale === "ky"
      ? "TomStore.kg — Кыргызстандын улуттук электроника дүкөнү. Ноутбук, принтер, ПК жеткирүү бардык 7 облуска."
      : "TomStore.kg — интернет-магазин электроники по всему Кыргызстану. Ноутбуки, принтеры, ПК, мониторы. Доставка во все 7 областей: Бишкек, Ош, Джалал-Абад, Каракол, Нарын, Талас, Баткен. Гарантия, рассрочка.";

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ru: `${SITE_URL}/ru/kyrgyzstan`,
        en: `${SITE_URL}/en/kyrgyzstan`,
        ky: `${SITE_URL}/ky/kyrgyzstan`,
        "x-default": `${SITE_URL}/ru/kyrgyzstan`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: `${SITE_URL}/assets/images/logo.svg`, width: 800, height: 600, alt: "TomStore Кыргызстан" }],
    },
  };
}

// ─── Styled components ────────────────────────────────────────────────────────

const NationalHero = styled.section`
  background: linear-gradient(135deg, #0a1628 0%, #0d2137 40%, #0e3a5a 80%, #1565c0 100%);
  border-radius: 20px;
  padding: 3rem 2.5rem;
  margin-bottom: 2.5rem;
  color: #fff;
  h1 { color: #fff; margin-bottom: 0.75rem; font-size: 28px; }
  p  { color: rgba(255,255,255,0.85); font-size: 15px; line-height: 1.7; max-width: 680px; margin: 0; }
`;

const BadgeRow = styled.div`
  display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.75rem;
`;
const Badge = styled.div`
  background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.25);
  border-radius: 20px; padding: 0.45rem 1.1rem; font-size: 13px; color: #fff; font-weight: 500;
`;

const RegionCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: 14px;
  padding: 1.1rem 1rem;
  background: #fff;
  transition: box-shadow 0.2s, transform 0.2s;
  text-decoration: none;
  display: block;
  color: inherit;
  &:hover {
    box-shadow: 0 4px 16px rgba(21,101,192,0.12);
    transform: translateY(-2px);
    border-color: #90caf9;
  }
  .name { font-size: 14px; font-weight: 700; color: #1565c0; margin-bottom: 0.25rem; }
  .meta { font-size: 12px; color: #888; }
`;

const CategoryPill = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: 50px;
  padding: 0.6rem 1.25rem;
  font-size: 14px;
  font-weight: 600;
  background: #fff;
  text-decoration: none;
  color: inherit;
  transition: background 0.2s;
  &:hover { background: #e3f2fd; border-color: #90caf9; }
  .icon { font-size: 18px; }
`;

const DeliveryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  tr:nth-child(even) td { background: #f8fafc; }
  th { background: #1565c0; color: #fff; padding: 0.6rem 0.75rem; text-align: left; }
  td { padding: 0.55rem 0.75rem; border-bottom: 1px solid #e8edf2; }
  td:last-child { color: #1565c0; font-weight: 600; }
`;

const SeoBox = styled.section`
  background: #f7fafd;
  border-radius: 14px;
  padding: 1.75rem 2rem;
  margin-bottom: 2rem;
  p { font-size: 14px; line-height: 1.8; color: #444; margin-bottom: 0.75rem; &:last-child { margin: 0; } }
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

// ─── Delivery data ────────────────────────────────────────────────────────────

const DELIVERY_REGIONS = [
  { nameRu: "Бишкек (столица)", nameEn: "Bishkek (capital)", days: "1 день", daysEn: "1 day" },
  { nameRu: "Чуйская область", nameEn: "Chuy Region", days: "1–2 дня", daysEn: "1–2 days" },
  { nameRu: "Ошская область / Ош", nameEn: "Osh Region / Osh city", days: "2–3 дня", daysEn: "2–3 days" },
  { nameRu: "Джалал-Абадская область", nameEn: "Jalal-Abad Region", days: "2–3 дня", daysEn: "2–3 days" },
  { nameRu: "Иссык-Кульская область / Каракол", nameEn: "Issyk-Kul Region / Karakol", days: "2–3 дня", daysEn: "2–3 days" },
  { nameRu: "Нарынская область", nameEn: "Naryn Region", days: "3–4 дня", daysEn: "3–4 days" },
  { nameRu: "Таласская область", nameEn: "Talas Region", days: "3–4 дня", daysEn: "3–4 days" },
  { nameRu: "Баткенская область", nameEn: "Batken Region", days: "3–4 дня", daysEn: "3–4 days" },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQ_RU = [
  {
    q: "TomStore доставляет по всему Кыргызстану?",
    a: "Да! TomStore доставляет электронику во все 7 областей Кыргызстана и более 100 городов и сёл. Бишкек — 1 день, регионы — 2–4 дня. Позвоните: +996-508-724-365.",
  },
  {
    q: "Где купить ноутбук в Кыргызстане по лучшей цене?",
    a: "TomStore.kg — один из лучших магазинов ноутбуков в Кыргызстане. Более 200 моделей: HP, ASUS, Acer, Lenovo, Dell, MSI. Цены от 18 000 сом. Магазин: Бишкек, ТЦ Весна, 3-й этаж, С47. Доставка по всей стране.",
  },
  {
    q: "Есть ли рассрочка на электронику по всему Кыргызстану?",
    a: "Да! Рассрочка от 3 до 12 месяцев — с банком и без банка. Оформление онлайн на TomStore.kg или по телефону +996-508-724-365.",
  },
  {
    q: "Сколько стоит доставка по Кыргызстану?",
    a: "Стоимость доставки зависит от региона. Уточняйте при оформлении заказа. В Бишкеке и Чуйской области — часто бесплатно при заказе от определённой суммы.",
  },
  {
    q: "Как сделать заказ с доставкой в регион?",
    a: "Выберите товар на TomStore.kg, добавьте в корзину, укажите адрес доставки. Менеджер свяжется с вами для подтверждения. Оплата при получении или онлайн.",
  },
  {
    q: "Есть ли гарантия на товары TomStore?",
    a: "Да, все товары реализуются с официальной гарантией производителя: ноутбуки — 1–2 года, принтеры — 1 год, аксессуары — 6–12 месяцев. Гарантийное обслуживание в авторизованных сервис-центрах по Кыргызстану.",
  },
];

const FAQ_EN = [
  {
    q: "Does TomStore deliver nationwide in Kyrgyzstan?",
    a: "Yes! TomStore delivers electronics to all 7 regions of Kyrgyzstan and over 100 cities and villages. Bishkek: 1 day, regions: 2–4 days. Call: +996-508-724-365.",
  },
  {
    q: "Where to buy a laptop in Kyrgyzstan at the best price?",
    a: "TomStore.kg is one of the best laptop stores in Kyrgyzstan. Over 200 models: HP, ASUS, Acer, Lenovo, Dell, MSI. Prices from 18,000 KGS. Store: Bishkek, Vesna Mall, 3rd floor, C47. Nationwide delivery.",
  },
  {
    q: "Is installment available across Kyrgyzstan?",
    a: "Yes! Installment from 3 to 12 months — with bank or without bank. Order online at TomStore.kg or call +996-508-724-365.",
  },
  {
    q: "How to order electronics for delivery to a region?",
    a: "Choose a product at TomStore.kg, add to cart, enter your delivery address. Our manager will contact you to confirm. Pay on delivery or online.",
  },
];

export default async function KyrgyzstanPage({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === "en";
  const isKy = locale === "ky";

  const homeLabel = isEn ? "Home" : isKy ? "Башкы бет" : "Главная";

  const h1 = isEn
    ? "Buy Electronics in Kyrgyzstan — TomStore Nationwide"
    : isKy
    ? "Кыргызстанда электроника сатып алуу — TomStore"
    : "Купить электронику в Кыргызстане — TomStore, доставка по всей стране";

  const lead = isEn
    ? "TomStore.kg is Kyrgyzstan's trusted online electronics store. We deliver laptops, printers, computers, monitors and accessories to all 7 regions. Official warranty, interest-free installment, cash on delivery."
    : isKy
    ? "TomStore.kg — Кыргызстандын ишенимдүү электроника интернет-дүкөнү. Бардык 7 облуска ноутбук, принтер, компьютер жеткиребиз. Кепилдик, бөлүп төлөө."
    : "TomStore.kg — надёжный интернет-магазин электроники Кыргызстана. Доставляем ноутбуки, принтеры, компьютеры, мониторы и аксессуары во все 7 областей. Официальная гарантия, рассрочка 3–12 мес. с банком и без банка, оплата при получении.";

  const faqItems = isEn ? FAQ_EN : FAQ_RU;

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
    url: `${SITE_URL}/${locale}/kyrgyzstan`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: homeLabel, item: `${SITE_URL}/${locale}` },
        { "@type": "ListItem", position: 2, name: isEn ? "Kyrgyzstan" : "Кыргызстан" },
      ],
    },
  };

  return (
    <AppLayout>
      {/* OrganizationJsonLd теперь рендерится глобально в корневом app/layout.tsx */}
      <Box pt="20px" pb="60px">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        <Breadcrumbs
          items={[
            { label: homeLabel, href: "/" },
            { label: isEn ? "Kyrgyzstan" : isKy ? "Кыргызстан" : "Кыргызстан" },
          ]}
          locale={locale}
        />

        <NationalHero>
          <H1>{h1}</H1>
          <p>{lead}</p>
          <BadgeRow>
            <Badge>🇰🇬 {isEn ? "Nationwide delivery" : "Доставка по всему КР"}</Badge>
            <Badge>✅ {isEn ? "Official warranty" : "Официальная гарантия"}</Badge>
            <Badge>💳 {isEn ? "Installment 3–12 months" : "Рассрочка 3–12 мес."}</Badge>
            <Badge>📦 {isEn ? "Cash on delivery" : "Оплата при получении"}</Badge>
            <Badge>📍 {isEn ? "Bishkek, Vesna Mall, 3rd floor, C47" : "Бишкек, ТЦ Весна, 3-й этаж, С47"}</Badge>
          </BadgeRow>
        </NationalHero>

        {/* Categories */}
        <H2 fontSize="20px" mb="1.25rem">
          {isEn ? "Product Categories" : isKy ? "Категориялар" : "Категории товаров"}
        </H2>
        <Grid container spacing={3} mb="2.5rem">
          {GEO_CATEGORIES.map((cat) => {
            const name = isEn ? cat.nameEn : isKy ? cat.nameKy : cat.nameRu;
            return (
              <Grid item lg={2} sm={4} xs={6} key={cat.slug}>
                <CategoryPill
                  as={Link}
                  href={`/${locale}/catalog${cat.catalogPath.replace("/catalog", "")}`}
                >
                  <span className="icon">{cat.icon}</span>
                  {name}
                </CategoryPill>
              </Grid>
            );
          })}
        </Grid>

        {/* National category hubs */}
        <H2 fontSize="20px" mb="1rem">
          {isEn ? "Buy by Category — All of Kyrgyzstan" : "Купить по категории — весь Кыргызстан"}
        </H2>
        <Box mb="2.5rem" display="flex" flexWrap="wrap" style={{ gap: "0.6rem" }}>
          {[
            { slug: "noutbuki-kyrgyzstan", nameRu: "Ноутбуки в Кыргызстане", nameEn: "Laptops in Kyrgyzstan" },
            { slug: "printery-kyrgyzstan", nameRu: "Принтеры в Кыргызстане", nameEn: "Printers in Kyrgyzstan" },
            { slug: "igrovye-noutbuki-kyrgyzstan", nameRu: "Игровые ноутбуки в Кыргызстане", nameEn: "Gaming Laptops in Kyrgyzstan" },
          ].map((item) => (
            <Link
              key={item.slug}
              href={`/${locale}/${item.slug}`}
              style={{
                fontSize: 14, fontWeight: 600, color: "#fff",
                background: "linear-gradient(135deg, #1565c0, #0d47a1)",
                borderRadius: 50, padding: "8px 18px", textDecoration: "none",
              }}
            >
              {isEn ? item.nameEn : item.nameRu}
            </Link>
          ))}
        </Box>

        {/* Regions */}
        <H2 fontSize="20px" mb="1.25rem">
          {isEn ? "Delivery by Regions of Kyrgyzstan" : isKy ? "Кыргызстандын облустары боюнча жеткирүү" : "Доставка по регионам Кыргызстана"}
        </H2>
        <Grid container spacing={3} mb="2.5rem">
          {ALL_REGIONS.map((region) => {
            const name = isEn ? region.nameEn : isKy ? region.nameKy : region.nameRu;
            return (
              <Grid item lg={3} sm={4} xs={6} key={region.slug}>
                <RegionCard as={Link} href={`/${locale}/${region.slug}`}>
                  <div className="name">{name}</div>
                  <div className="meta">
                    {isEn
                      ? `Delivery ${region.deliveryDays} · ${region.districts.length} districts`
                      : `Доставка ${region.deliveryDays} · ${region.districts.length} районов`}
                  </div>
                </RegionCard>
              </Grid>
            );
          })}
        </Grid>

        {/* Major cities */}
        <H2 fontSize="20px" mb="1rem">
          {isEn ? "Delivery to Major Cities" : isKy ? "Ири шаарларга жеткирүү" : "Доставка в крупные города"}
        </H2>
        <Box mb="2.5rem" display="flex" flexWrap="wrap" style={{ gap: "0.5rem" }}>
          {[
            { nameRu: "Бишкек", nameEn: "Bishkek", href: "/bishkek" },
            { nameRu: "Каракол", nameEn: "Karakol", href: "/karakol" },
            ...MAJOR_CITIES.filter(c => c.slug !== "bishkek" && c.slug !== "karakol").map(c => ({
              nameRu: c.nameRu,
              nameEn: c.nameEn,
              href: `/${c.slug}`,
            })),
          ].map((city) => (
            <Link
              key={city.href}
              href={`/${locale}${city.href}`}
              style={{
                fontSize: 13, color: "#1565c0", textDecoration: "none",
                background: "#e3f2fd", borderRadius: 20, padding: "5px 14px", fontWeight: 500,
              }}
            >
              {isEn ? city.nameEn : city.nameRu}
            </Link>
          ))}
        </Box>

        {/* Delivery table */}
        <H2 fontSize="20px" mb="1rem">
          {isEn ? "Delivery Times by Region" : "Сроки доставки по регионам"}
        </H2>
        <Box mb="2.5rem" style={{ overflowX: "auto" }}>
          <DeliveryTable>
            <thead>
              <tr>
                <th>{isEn ? "Region" : "Регион"}</th>
                <th>{isEn ? "Delivery time" : "Срок доставки"}</th>
              </tr>
            </thead>
            <tbody>
              {DELIVERY_REGIONS.map((row) => (
                <tr key={row.nameRu}>
                  <td>{isEn ? row.nameEn : row.nameRu}</td>
                  <td>{isEn ? row.daysEn : row.days}</td>
                </tr>
              ))}
            </tbody>
          </DeliveryTable>
        </Box>

        {/* SEO text */}
        <SeoBox>
          {isEn ? (
            <>
              <p>TomStore.kg is one of Kyrgyzstan's leading online electronics retailers. Our product range includes over 1,000 items: laptops from HP, ASUS, Acer, Lenovo, Dell; printers and MFPs from Epson, Canon, HP; desktop computers, monitors, accessories and network equipment.</p>
              <p>We serve all 7 regions of Kyrgyzstan. Our store is based in Bishkek (Kalyk Akiev 66, Vesna Mall, 3rd floor, C47), but we deliver countrywide: Chuy, Issyk-Kul, Osh, Jalal-Abad, Naryn, Talas and Batken regions. All goods come with an official manufacturer warranty. Installment 3–12 months — with bank or without bank, apply online at TomStore.kg. We are open every day, no days off. Regional branches coming soon! Details: +996-508-724-365.</p>
              <p>Our goal is to be the most accessible and trusted electronics store for every Kyrgyzstan resident — whether you're in the capital or in a remote village. Order online or call us at +996-508-724-365.</p>
            </>
          ) : isKy ? (
            <>
              <p>TomStore.kg — Кыргызстандагы жетекчи онлайн электроника дүкөндөрүнүн бири. Ноутбуктар: HP, ASUS, Acer, Lenovo, Dell; принтерлер: Epson, Canon, HP; монитор, аксессуарлар жана тармак жабдуулары.</p>
              <p>Биз Кыргызстандын бардык 7 облусуна жеткиребиз. Бөлүп төлөө 3–12 айга, онлайн да болот. Күн сайын иштейбиз, дем алышсыз. Жакында региондорда филиалдар ачылат! Байланыш: +996-508-724-365.</p>
            </>
          ) : (
            <>
              <p>TomStore.kg — один из ведущих интернет-магазинов электроники в Кыргызстане. Ассортимент превышает 1 000 наименований: ноутбуки HP, ASUS, Acer, Lenovo, Dell; принтеры и МФУ Epson, Canon, HP; настольные компьютеры, мониторы, аксессуары и сетевое оборудование.</p>
              <p>Мы обслуживаем все 7 областей Кыргызстана. Магазин расположен в Бишкеке (ул. Калык Акиева 66, ТЦ Весна, 3-й этаж, С47), доставка по всей стране: Чуйская, Иссык-Кульская, Ошская, Джалал-Абадская, Нарынская, Таласская и Баткенская области. Все товары с официальной гарантией производителя. Рассрочка от 3 до 12 месяцев — с банком и без банка, оформляйте онлайн на TomStore.kg. Работаем ежедневно, без выходных. Скоро открываем филиалы в регионах! Подробнее: +996-508-724-365.</p>
              <p>Наша цель — стать самым доступным и надёжным магазином электроники для каждого жителя Кыргызстана. Заказывайте онлайн или звоните: +996-508-724-365.</p>
            </>
          )}
        </SeoBox>

        {/* FAQ */}
        <H2 fontSize="20px" mb="1.25rem">
          {isEn ? "Frequently Asked Questions" : "Частые вопросы"}
        </H2>
        <Box mb="2.5rem">
          {faqItems.map((item, i) => (
            <FaqItem key={i}>
              <summary>{item.q}</summary>
              <div className="answer">{item.a}</div>
            </FaqItem>
          ))}
        </Box>

        {/* Internal links */}
        <H3 fontSize="15px" mb="0.75rem" color="text.muted">
          {isEn ? "Popular searches" : "Популярные запросы"}
        </H3>
        <Box display="flex" flexWrap="wrap" style={{ gap: "0.5rem" }}>
          {(isEn
            ? ["Laptops Bishkek", "Printers Bishkek", "Laptops Osh", "Gaming laptops KG", "Laptops Karakol", "Printers Osh"]
            : ["Ноутбуки Бишкек", "Принтеры Бишкек", "Ноутбуки Ош", "Игровые ноутбуки", "Ноутбуки Каракол", "Принтеры Ош"]
          ).map((label, i) => {
            const hrefs = isEn
              ? ["/noutbuki/bishkek", "/printery/bishkek", "/noutbuki/osh", "/igrovye-noutbuki-kyrgyzstan", "/noutbuki/karakol", "/printery/osh"]
              : ["/noutbuki/bishkek", "/printery/bishkek", "/noutbuki/osh", "/igrovye-noutbuki-kyrgyzstan", "/noutbuki/karakol", "/printery/osh"];
            return (
              <Link
                key={i}
                href={`/${locale}${hrefs[i]}`}
                style={{ fontSize: 13, color: "#1565c0", textDecoration: "none", background: "#e8f0fe", borderRadius: 12, padding: "4px 12px" }}
              >
                {label}
              </Link>
            );
          })}
        </Box>
      </Box>
    </AppLayout>
  );
}
