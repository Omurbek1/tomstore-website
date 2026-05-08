import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppLayout from "@component/layout/layout-3";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { H1, H2, H3, Paragraph } from "@component/Typography";
import Card from "@component/Card";
import Breadcrumbs from "@component/seo/Breadcrumbs";
import {
  ALL_REGIONS,
  GEO_CATEGORIES,
  getRegion,
  getDistrict,
  getGeoCategory,
  getAllGeoCombinations,
  isCategorySlug,
} from "@data/geo";
import { getSafeStorefrontCatalog, mapStorefrontProduct } from "@utils/__api__/storefront";
import styled from "styled-components";

import { SITE_URL } from "@lib/siteUrl";

type Props = {
  params: Promise<{ locale: string; region: string; district: string; category: string }>;
};

export function generateStaticParams() {
  return getAllGeoCombinations();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, region: rSlug, district: dSlug, category: catSlug } = await params;
  const url = `${SITE_URL}/${locale}/${rSlug}/${dSlug}/${catSlug}`;

  // New style: /[category]/[region]/[district]  →  /noutbuki/chuy/sokuluk
  if (isCategorySlug(rSlug)) {
    const cat      = getGeoCategory(rSlug)!;
    const district = getDistrict(dSlug, catSlug); // dSlug=region, catSlug=district
    const region   = getRegion(dSlug);
    if (!cat || !district || !region) return {};
    const title = locale === "en"
      ? `Buy ${cat.nameEn} in ${district.nameEn}, ${region.nameEn} — TomStore`
      : locale === "ky" ? `${district.nameKy}га ${cat.nameKy} — TomStore`
      : `Купить ${cat.nameRu.toLowerCase()} ${district.inRu} — TomStore`;
    const description = locale === "en"
      ? `TomStore delivers ${cat.nameEn.toLowerCase()} to ${district.nameEn} (${region.nameEn}). Delivery ${district.deliveryDays}. ${district.distanceFromCapital}.`
      : locale === "ky" ? `TomStore ${district.nameKy}га ${cat.nameKy.toLowerCase()} жеткирет. Жеткирүү ${district.deliveryDays}.`
      : `Купить ${cat.nameRu.toLowerCase()} ${district.inRu} (${region.nameRu}). Доставка ${district.deliveryDays}. ${district.distanceFromCapital}. Гарантия, рассрочка.`;
    return { title, description, alternates: { canonical: url, languages: { ru: `${SITE_URL}/ru/${rSlug}/${dSlug}/${catSlug}`, en: `${SITE_URL}/en/${rSlug}/${dSlug}/${catSlug}`, ky: `${SITE_URL}/ky/${rSlug}/${dSlug}/${catSlug}` } }, openGraph: { title, description, url, type: "website" } };
  }

  // Old style: /[region]/[district]/[category]
  const district = getDistrict(rSlug, dSlug);
  const region   = getRegion(rSlug);
  const cat      = getGeoCategory(catSlug);
  if (!district || !region || !cat) return {};

  const catName   = locale === "en" ? cat.nameEn   : locale === "ky" ? cat.nameKy   : cat.nameRu;
  const dName     = locale === "en" ? district.nameEn : locale === "ky" ? district.nameKy : district.nameRu;
  const inCity    = locale === "en" ? `in ${district.nameEn}` : locale === "ky" ? `${district.nameKy}га` : district.inRu;
  const rName     = locale === "en" ? region.nameEn : locale === "ky" ? region.nameKy : region.nameRu;

  const title =
    locale === "en"
      ? `Buy ${cat.nameEn} in ${district.nameEn} (${region.nameEn}) — TomStore`
      : locale === "ky"
      ? `${district.nameKy}га ${cat.nameKy} — TomStore жеткирет`
      : `Купить ${cat.nameRu.toLowerCase()} ${district.inRu} — TomStore | Доставка ${district.deliveryDays}`;

  const description =
    locale === "en"
      ? `Best ${cat.nameEn.toLowerCase()} with delivery to ${district.nameEn}, ${region.nameEn}. ${district.distanceFromCapital}. Delivery in ${district.deliveryDays}. Warranty, installment, wide selection.`
      : locale === "ky"
      ? `TomStore ${district.nameKy}га ${cat.nameKy.toLowerCase()} жеткирет. Жеткирүү ${district.deliveryDays}. Кепилдик, бөлүп төлөө.`
      : `Купить ${cat.nameRu.toLowerCase()} ${district.inRu} с доставкой ${district.deliveryDays}. ${district.distanceFromCapital}. Гарантия, рассрочка, большой выбор. TomStore — интернет-магазин электроники Кыргызстан.`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ru: `${SITE_URL}/ru/${rSlug}/${dSlug}/${catSlug}`,
        en: `${SITE_URL}/en/${rSlug}/${dSlug}/${catSlug}`,
        ky: `${SITE_URL}/ky/${rSlug}/${dSlug}/${catSlug}`,
      },
    },
    openGraph: { title, description, url, type: "website" },
  };
}

// ─── Styled ───────────────────────────────────────────────────────────────────

const GeoHero = styled.section`
  background: linear-gradient(135deg, #0d47a1 0%, #1565c0 50%, #0277bd 100%);
  border-radius: 16px; padding: 2.5rem 2rem; margin-bottom: 2.5rem; color: #fff;
  h1 { color: #fff; margin-bottom: 0.5rem; }
  p  { color: rgba(255,255,255,0.88); font-size: 15px; line-height: 1.7; margin: 0; }
`;
const BadgeRow = styled.div`
  display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.5rem;
`;
const Badge = styled.div`
  background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3);
  border-radius: 20px; padding: 0.4rem 1rem; font-size: 13px; color: #fff;
`;

const SeoTextBox = styled.section`
  background: ${({ theme }) => theme.colors.gray[100]}; border-radius: 12px;
  padding: 1.75rem; margin-bottom: 2.5rem;
  h2 { font-size: 17px; font-weight: 700; margin-bottom: 0.75rem; color: ${({ theme }) => theme.colors.text.primary}; }
  p  { font-size: 14px; line-height: 1.75; color: ${({ theme }) => theme.colors.text.secondary}; margin-bottom: 0.75rem; }
  p:last-child { margin-bottom: 0; }
`;

const FaqItem = styled.details`
  border: 1px solid ${({ theme }) => theme.colors.gray[200]}; border-radius: 10px;
  margin-bottom: 0.75rem; overflow: hidden;
  summary {
    padding: 1rem 1.25rem; font-size: 14px; font-weight: 600; cursor: pointer;
    color: ${({ theme }) => theme.colors.text.primary}; list-style: none;
    display: flex; justify-content: space-between; align-items: center;
    &::-webkit-details-marker { display: none; }
    &::after { content: "+"; font-size: 18px; color: ${({ theme }) => theme.colors.primary.main}; }
  }
  &[open] summary::after { content: "−"; }
  .answer { padding: 0 1.25rem 1rem; font-size: 13px; line-height: 1.7; color: ${({ theme }) => theme.colors.text.secondary}; }
`;

const ProductCard = styled(Card)`
  overflow: hidden; display: flex; flex-direction: column;
  transition: box-shadow 150ms ease;
  &:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
  img { width: 100%; height: 160px; object-fit: contain; background: #f8f8f8; display: block; padding: 1rem; }
  .body { padding: 1rem; flex: 1; display: flex; flex-direction: column; gap: 0.4rem; }
  .pname { font-size: 13px; font-weight: 600; color: ${({ theme }) => theme.colors.text.primary}; line-height: 1.4;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .price { font-size: 15px; font-weight: 700; color: ${({ theme }) => theme.colors.primary.main}; }
  .cta { font-size: 13px; font-weight: 600; color: #fff; background: ${({ theme }) => theme.colors.primary.main};
    text-align: center; padding: 0.5rem; border-radius: 6px; text-decoration: none; margin-top: auto; display: block;
    &:hover { opacity: 0.9; } }
`;

const RelatedGrid = styled.div`
  display: flex; flex-wrap: wrap; gap: 0.5rem;
  a { font-size: 13px; color: #1565c0; text-decoration: none;
    background: #e8f0fe; border-radius: 12px; padding: 4px 12px;
    &:hover { background: #bbdefb; } }
`;

// ─── Content helpers ──────────────────────────────────────────────────────────

function buildSeoText(locale: string, district: ReturnType<typeof getDistrict>, region: ReturnType<typeof getRegion>, cat: ReturnType<typeof getGeoCategory>): string[] {
  if (!district || !region || !cat) return [];
  const inCity = district.inRu;
  const dName  = locale === "en" ? district.nameEn : district.nameRu;
  const rName  = locale === "en" ? region.nameEn   : region.nameRu;
  const cName  = locale === "en" ? cat.nameEn      : cat.nameRu;
  const cGen   = cat.genRu;  // ноутбуков
  const cAcc   = cat.accusRu; // ноутбук

  if (locale === "en") {
    return [
      `TomStore is Kyrgyzstan's leading online electronics store. We deliver ${cName.toLowerCase()} and all other electronics to ${dName} (${rName}) with a delivery time of just ${district.deliveryDays}. ${district.distanceFromCapital} — we serve this area daily.`,
      `All products come with an official warranty. If you live in ${dName} and are looking for a quality ${cat.accusRu} at a fair price, TomStore is the right choice. We offer installment plans, online payment, and fast courier delivery.`,
    ];
  }
  if (locale === "ky") {
    return [
      `TomStore — Кыргызстандагы электроника интернет-дүкөнү. ${dName}га ${cName.toLowerCase()} жана башка электроникаларды ${district.deliveryDays} ичинде жеткиребиз. Кепилдик, бөлүп төлөө.`,
    ];
  }
  return [
    `TomStore — ведущий интернет-магазин электроники Кыргызстана. Мы доставляем ${cGen} ${inCity} (${rName}) за ${district.deliveryDays}. ${district.distanceFromCapital} — этот район мы обслуживаем регулярно.`,
    `Все товары идут с официальной гарантией производителя. Если вы живёте ${inCity} и ищете качественный ${cAcc} по справедливой цене — TomStore правильный выбор. Рассрочка без переплат, онлайн-оплата, быстрая курьерская доставка.`,
    `Жители ${dName} могут оформить заказ на сайте TomStore в любое время — мы принимаем заявки круглосуточно. После подтверждения заказа курьер выедет ${inCity} в течение ${district.deliveryDays}. Получение возможно на дому или в удобном месте.`,
  ];
}

function buildFaqItems(locale: string, district: ReturnType<typeof getDistrict>, region: ReturnType<typeof getRegion>, cat: ReturnType<typeof getGeoCategory>) {
  if (!district || !region || !cat) return [];
  const inCity = district.inRu;
  const dName  = locale === "en" ? district.nameEn : district.nameRu;
  const cName  = locale === "en" ? cat.nameEn   : cat.nameRu;
  const cGen   = cat.genRu;
  const cAcc   = cat.accusRu;

  if (locale === "en") return [
    {
      q: `Can I buy a ${cat.nameEn.toLowerCase()} in ${district.nameEn} from TomStore?`,
      a: `Yes! Order online and TomStore will deliver to ${district.nameEn} in ${district.deliveryDays}. All products come with an official warranty.`,
    },
    {
      q: `How much does delivery to ${district.nameEn} cost?`,
      a: `Delivery cost depends on order size and weight. Contact us at +996-508-724-365 for an exact quote.`,
    },
    {
      q: `Is installment available in ${district.nameEn}?`,
      a: `Yes, installment is available for all regions of Kyrgyzstan including ${district.nameEn}. Interest-free options available.`,
    },
  ];

  if (locale === "ky") return [
    {
      q: `TomStore ${dName}га ${cName.toLowerCase()} жеткиреби?`,
      a: `Ооба! Онлайн буюртма бер, TomStore ${dName}га ${district.deliveryDays} ичинде жеткирет. Кепилдик, бөлүп төлөө.`,
    },
    {
      q: `${dName}га жеткирүүнүн баасы канча?`,
      a: `Жеткирүүнүн баасы буюмдун салмагына жана өлчөмүнө жараша. Суроолор: +996-508-724-365.`,
    },
  ];

  return [
    {
      q: `Как купить ${cAcc} ${inCity} через TomStore?`,
      a: `Оформите заказ на сайте TomStore, в корзине укажите адрес ${inCity}. Курьер доставит ${cAcc} за ${district.deliveryDays}. Возможна оплата картой или наличными при получении.`,
    },
    {
      q: `Сколько стоит доставка ${cGen} ${inCity}?`,
      a: `Стоимость зависит от габаритов и веса. Уточните у менеджера: +996-508-724-365 или в онлайн-чате на сайте.`,
    },
    {
      q: `Есть ли гарантия на ${cAcc} при доставке ${inCity}?`,
      a: `Да, все ${cName.toLowerCase()} в TomStore продаются с официальной гарантией производителя. Гарантия действует независимо от способа получения — самовывоз или доставка ${inCity}.`,
    },
    {
      q: `Доступна ли рассрочка для жителей ${dName}?`,
      a: `Да, рассрочка доступна по всему Кыргызстану, в том числе ${inCity}. Оформление без переплат и проверки кредитной истории. Подробности: +996-508-724-365.`,
    },
    {
      q: `Какие ${cName.toLowerCase()} самые популярные ${inCity}?`,
      a: `Жители ${dName} чаще всего покупают ноутбуки для работы и учебы, офисные МФУ для дома и принтеры. Популярны бренды Asus, Acer, HP, Lenovo. Все модели в наличии на сайте TomStore.`,
    },
  ];
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function GeoCategoryPage({ params }: Props) {
  const { locale, region: rSlug, district: dSlug, category: catSlug } = await params;

  // Normalise: new-style /noutbuki/chuy/sokuluk → swap to old-style semantics
  const isCatFirst = isCategorySlug(rSlug);
  const effectiveCat      = isCatFirst ? getGeoCategory(rSlug)      : getGeoCategory(catSlug);
  const effectiveRegion   = isCatFirst ? getRegion(dSlug)           : getRegion(rSlug);
  const effectiveDistrict = isCatFirst ? getDistrict(dSlug, catSlug): getDistrict(rSlug, dSlug);
  const district = effectiveDistrict;
  const region   = effectiveRegion;
  const cat      = effectiveCat;
  if (!district || !region || !cat) notFound();

  const isEn = locale === "en";
  const isKy = locale === "ky";
  const dName  = isEn ? district.nameEn : isKy ? district.nameKy : district.nameRu;
  const rName  = isEn ? region.nameEn   : isKy ? region.nameKy   : region.nameRu;
  const catName = isEn ? cat.nameEn     : isKy ? cat.nameKy       : cat.nameRu;
  const inCity  = isEn ? `in ${district.nameEn}` : isKy ? `${district.nameKy}га` : district.inRu;

  const homeLabel = isEn ? "Home" : isKy ? "Башкы бет" : "Главная";
  const rLabel    = isEn ? region.nameEn : isKy ? region.nameKy : region.nameRu;
  const dLabel    = dName;

  const h1 = isEn
    ? `${cat.nameEn} in ${district.nameEn} — Buy Online, Delivery ${district.deliveryDays}`
    : isKy
    ? `${district.nameKy}га ${cat.nameKy} — TomStore жеткирет`
    : `Купить ${cat.nameRu.toLowerCase()} ${district.inRu} — доставка ${district.deliveryDays}`;

  // Fetch real products from catalog
  const catalogData = await getSafeStorefrontCatalog({ category: cat.catalogPath.replace("/catalog/", "") });
  const products = (catalogData?.items ?? []).slice(0, 6).map(mapStorefrontProduct);

  const seoTexts  = buildSeoText(locale, district, region, cat);
  const faqItems  = buildFaqItems(locale, district, region, cat);

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
    description: faqItems.length ? faqItems[0].a : h1,
    url: `${SITE_URL}/${locale}/${rSlug}/${dSlug}/${catSlug}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: homeLabel, item: `${SITE_URL}/${locale}` },
        { "@type": "ListItem", position: 2, name: rLabel,    item: `${SITE_URL}/${locale}/${rSlug}` },
        { "@type": "ListItem", position: 3, name: dLabel,    item: `${SITE_URL}/${locale}/${rSlug}/${dSlug}` },
        { "@type": "ListItem", position: 4, name: catName },
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
            { label: rLabel,  href: `/${rSlug}` },
            { label: dLabel,  href: `/${rSlug}/${dSlug}` },
            { label: catName },
          ]}
          locale={locale}
        />

        {/* Hero */}
        <GeoHero>
          <H1 fontSize="26px">{h1}</H1>
          <p>
            {isEn
              ? `TomStore delivers ${cat.nameEn.toLowerCase()} to ${district.nameEn} (${rName}) in ${district.deliveryDays}. ${district.distanceFromCapital}. Official warranty, installment, wide selection.`
              : isKy
              ? `TomStore ${district.nameKy}га (${rName}) ${district.deliveryDays} ичинде ${cat.nameKy.toLowerCase()} жеткирет. Кепилдик, бөлүп төлөө, чоң тандоо.`
              : `TomStore доставляет ${cat.nameRu.toLowerCase()} ${district.inRu} (${rName}) за ${district.deliveryDays}. ${district.distanceFromCapital}. Гарантия, рассрочка, большой выбор.`}
          </p>
          <BadgeRow>
            <Badge>{cat.icon} {catName}</Badge>
            <Badge>🚚 {isEn ? `Delivery ${district.deliveryDays}` : `Доставка ${district.deliveryDays}`}</Badge>
            <Badge>✅ {isEn ? "Warranty" : "Гарантия"}</Badge>
            <Badge>💳 {isEn ? "Installment" : "Рассрочка"}</Badge>
          </BadgeRow>
        </GeoHero>

        {/* Real products */}
        {products.length > 0 && (
          <Box mb="2.5rem">
            <H2 fontSize="18px" mb="1.25rem">
              {isEn
                ? `${cat.nameEn} available in catalog`
                : isKy
                ? `Каталогдогу ${cat.nameKy.toLowerCase()}`
                : `${cat.nameRu} — доступны для заказа`}
            </H2>
            <Grid container spacing={4}>
              {products.map((product: any) => (
                <Grid item lg={2} sm={4} xs={6} key={product.id}>
                  <ProductCard borderRadius={12}>
                    {product.imgUrl && (
                      <Image
                        src={product.imgUrl}
                        alt={`${product.title} ${inCity}`}
                        width={320}
                        height={320}
                        quality={80}
                        sizes="(max-width: 768px) 50vw, 16vw"
                        loading="lazy"
                      />
                    )}
                    <div className="body">
                      <div className="pname">{product.title}</div>
                      <div className="price">
                        {product.price.toLocaleString()} {locale === "en" ? "$" : "сом"}
                      </div>
                      <Link
                        href={`/${locale}/product/${product.slug}`}
                        className="cta"
                      >
                        {isEn ? "Order" : isKy ? "Буюртма" : "Заказать"}
                      </Link>
                    </div>
                  </ProductCard>
                </Grid>
              ))}
            </Grid>
            <Box mt="1rem" textAlign="center">
              <Link
                href={`/${locale}${cat.catalogPath}`}
                style={{ fontSize: 14, color: "#1565c0", fontWeight: 600, textDecoration: "none" }}
              >
                {isEn ? `View all ${cat.nameEn.toLowerCase()} →` : isKy ? `Бардык ${cat.nameKy.toLowerCase()} →` : `Смотреть все ${cat.nameRu.toLowerCase()} →`}
              </Link>
            </Box>
          </Box>
        )}

        {/* SEO text */}
        <SeoTextBox>
          <h2>
            {isEn
              ? `${cat.nameEn} with delivery to ${dName}`
              : isKy
              ? `${dName}га ${cat.nameKy.toLowerCase()} жеткирүү`
              : `${cat.nameRu} с доставкой ${district.inRu}`}
          </h2>
          {seoTexts.map((text, i) => <p key={i}>{text}</p>)}
        </SeoTextBox>

        {/* FAQ */}
        <H2 fontSize="18px" mb="1.25rem">
          {isEn ? "Frequently Asked Questions" : isKy ? "Суроолор" : "Частые вопросы"}
        </H2>
        <Box mb="2.5rem">
          {faqItems.map((item, i) => (
            <FaqItem key={i}>
              <summary>{item.q}</summary>
              <div className="answer">{item.a}</div>
            </FaqItem>
          ))}
        </Box>

        {/* Internal links: other categories for this district */}
        <Box mb="2rem">
          <H3 fontSize="14px" mb="0.75rem" color="text.muted">
            {isEn ? `Other electronics in ${dName}` : `Другая электроника ${district.inRu}`}
          </H3>
          <RelatedGrid>
            {GEO_CATEGORIES.filter((c) => c.slug !== catSlug).map((c) => (
              <Link key={c.slug} href={`/${locale}/${rSlug}/${dSlug}/${c.slug}`}>
                {c.icon} {isEn ? c.nameEn : c.nameRu}
              </Link>
            ))}
          </RelatedGrid>
        </Box>

        {/* Internal links: same category in other districts */}
        <Box>
          <H3 fontSize="14px" mb="0.75rem" color="text.muted">
            {isEn ? `${cat.nameEn} in other cities` : `${cat.nameRu} в других городах`}
          </H3>
          <RelatedGrid>
            {region.districts
              .filter((d) => d.slug !== dSlug)
              .map((d) => (
                <Link key={d.slug} href={`/${locale}/${rSlug}/${d.slug}/${catSlug}`}>
                  {isEn ? d.nameEn : d.nameRu}
                </Link>
              ))}
          </RelatedGrid>
        </Box>
      </Box>
    </AppLayout>
  );
}
