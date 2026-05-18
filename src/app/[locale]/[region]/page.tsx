import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AppLayout from "@component/layout/main-layout";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { H1, H2, H3, Paragraph } from "@component/Typography";
import Breadcrumbs from "@component/seo/Breadcrumbs";
import { ALL_REGIONS, GEO_CATEGORIES, getRegion } from "@data/geo";
import { DistrictCard, CatLink } from "./RegionStyles";

import { SITE_URL } from "@lib/siteUrl";
import { buildFallbackMetadata } from "@lib/seoMetadata";

type Props = { params: Promise<{ locale: string; region: string }> };

export function generateStaticParams() {
  return ALL_REGIONS.map((r) => ({ region: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, region: regionSlug } = await params;
  const region = getRegion(regionSlug);
  if (!region) {
    return buildFallbackMetadata({
      locale,
      path: `/${regionSlug}`,
      title: "TomStore — доставка электроники по Кыргызстану",
      description:
        "TomStore доставляет ноутбуки, принтеры, компьютеры и мониторы по всем регионам Кыргызстана. Гарантия и рассрочка.",
    });
  }

  const regionName = locale === "ky" ? region.nameKy : locale === "en" ? region.nameEn : region.nameRu;
  const url = `${SITE_URL}/${locale}/${regionSlug}`;

  const title =
    locale === "en"
      ? `Buy Electronics in ${region.nameEn} — TomStore`
      : locale === "ky"
      ? `${region.nameKy} — электроника | TomStore`
      : `Электроника в ${region.nameRu} — купить с доставкой | TomStore`;

  const districtNames = region.districts.slice(0, 4).map((d) =>
    locale === "en" ? d.nameEn : d.nameRu,
  ).join(", ");

  const description =
    locale === "en"
      ? `TomStore delivers laptops, printers and computers to all cities of ${region.nameEn}: ${districtNames} and more. Delivery ${region.deliveryDays}.`
      : locale === "ky"
      ? `TomStore ${region.nameKy}нын бардык шаарларына электроника жеткирет.`
      : `TomStore доставляет ноутбуки, принтеры и компьютеры во все города ${region.nameRu}: ${districtNames} и другие. Доставка ${region.deliveryDays}.`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ru: `${SITE_URL}/ru/${regionSlug}`,
        en: `${SITE_URL}/en/${regionSlug}`,
        ky: `${SITE_URL}/ky/${regionSlug}`,
      },
    },
    openGraph: { title, description, url, type: "website" },
  };
}

// ─── Styled components ───────────────────────────────────────────────────────

const RegionHero = styled.section`
  background: linear-gradient(135deg, #0d47a1 0%, #1976d2 100%);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  margin-bottom: 2.5rem;
  color: #fff;
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

export default async function RegionPage({ params }: Props) {
  const { locale, region: regionSlug } = await params;
  const region = getRegion(regionSlug);
  if (!region) notFound();

  const isEn = locale === "en";
  const isKy = locale === "ky";
  const regionName = isEn ? region.nameEn : isKy ? region.nameKy : region.nameRu;

  const homeLabel     = isEn ? "Home"     : isKy ? "Башкы бет"  : "Главная";
  const regLabel      = regionName;
  const districtsLabel = isEn ? "Districts & Cities" : isKy ? "Аймактар жана шаарлар" : "Районы и города";
  const catsLabel     = isEn ? "Categories"          : isKy ? "Категориялар"           : "Категории";

  const h1 = isEn
    ? `Electronics in ${region.nameEn} — Delivery Across the Region`
    : isKy
    ? `${region.nameKy} — электроника жеткирүү`
    : `Электроника в ${region.nameRu} — доставка по всему региону`;

  const lead = isEn
    ? `TomStore delivers laptops, printers, computers and accessories to every city and district of ${region.nameEn}. Average delivery time: ${region.deliveryDays}. Warranty, installment, online payment.`
    : isKy
    ? `TomStore ${region.nameKy}нын бардык шаарларына жана райондоруна ноутбук, принтер, компьютер жана аксессуарларды жеткирет. Жеткирүү ${region.deliveryDays}. Кепилдик, бөлүп төлөө.`
    : `TomStore доставляет ноутбуки, принтеры, компьютеры и аксессуары в каждый город и район ${region.nameRu}. Средний срок доставки: ${region.deliveryDays}. Гарантия, рассрочка, онлайн-оплата.`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: h1,
    description: lead,
    url: `${SITE_URL}/${locale}/${regionSlug}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: homeLabel, item: `${SITE_URL}/${locale}` },
        { "@type": "ListItem", position: 2, name: regLabel },
      ],
    },
  };

  return (
    <AppLayout>
      <Box pt="20px" pb="60px">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

        <Breadcrumbs
          items={[{ label: homeLabel, href: "/" }, { label: regLabel }]}
          locale={locale}
        />

        <RegionHero>
          <H1 fontSize="26px">{h1}</H1>
          <p>{lead}</p>
          <BadgeRow>
            <Badge>✅ {isEn ? "Warranty on all goods" : isKy ? "Кепилдик" : "Гарантия на всё"}</Badge>
            <Badge>🚚 {isEn ? `Delivery ${region.deliveryDays}` : isKy ? `Жеткирүү ${region.deliveryDays}` : `Доставка ${region.deliveryDays}`}</Badge>
            <Badge>💳 {isEn ? "Installment" : isKy ? "Бөлүп төлөө" : "Рассрочка"}</Badge>
          </BadgeRow>
        </RegionHero>

        {/* Categories */}
        <H2 fontSize="18px" mb="1rem">{catsLabel}</H2>
        <Grid container spacing={3} mb="2.5rem">
          {GEO_CATEGORIES.map((cat) => (
            <Grid item lg={2} sm={4} xs={6} key={cat.slug}>
              <CatLink href={`/${locale}/catalog${cat.catalogPath.replace("/catalog", "")}`}>
                <span className="icon">{cat.icon}</span>
                {isEn ? cat.nameEn : isKy ? cat.nameKy : cat.nameRu}
              </CatLink>
            </Grid>
          ))}
        </Grid>

        {/* Districts */}
        <H2 fontSize="18px" mb="1rem">{districtsLabel}</H2>
        <Grid container spacing={4} mb="2.5rem">
          {region.districts.map((d) => {
            const dName = isEn ? d.nameEn : isKy ? d.nameKy : d.nameRu;
            const settCount = d.settlements.length;
            return (
              <Grid item lg={3} sm={4} xs={6} key={d.slug}>
                <DistrictCard as={Link} href={`/${locale}/${regionSlug}/${d.slug}`} borderRadius={12}>
                  <div className="name">{dName}</div>
                  <div className="meta">
                    {d.distanceFromCapital}
                    {settCount > 0 && ` · ${settCount} ${isEn ? "settlements" : isKy ? "айыл" : settCount === 1 ? "нас. пункт" : "нас. пункта"}`}
                  </div>
                  <div className="days">
                    {isEn ? d.deliveryDays : isKy ? d.deliveryDays : `Доставка ${d.deliveryDays}`}
                  </div>
                </DistrictCard>
              </Grid>
            );
          })}
        </Grid>

        {/* Popular geo×category links for internal linking */}
        <H3 fontSize="16px" mb="1rem">
          {isEn ? "Popular searches in the region" : isKy ? "Популярдуу суроолор" : "Популярные запросы в регионе"}
        </H3>
        <Grid container spacing={3}>
          {region.districts.slice(0, 6).flatMap((d) =>
            GEO_CATEGORIES.slice(0, 3).map((cat) => {
              const dName = isEn ? d.nameEn : d.nameRu;
              const catName = isEn ? cat.nameEn : cat.nameRu;
              return (
                <Grid item lg={2} sm={3} xs={6} key={`${d.slug}-${cat.slug}`}>
                  <Link
                    href={`/${locale}/${regionSlug}/${d.slug}/${cat.slug}`}
                    style={{ fontSize: 13, color: "#1565c0", textDecoration: "none" }}
                  >
                    {catName} {isEn ? "in" : ""} {dName}
                  </Link>
                </Grid>
              );
            }),
          )}
        </Grid>
      </Box>
    </AppLayout>
  );
}
