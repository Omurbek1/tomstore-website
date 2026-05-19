import type { Metadata } from "next";
import AppLayout from "@component/layout/main-layout";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { H1, H2, H3 } from "@component/Typography";
import Breadcrumbs from "@component/seo/Breadcrumbs";
import { Link } from "@i18n/navigation";
import { SITE_URL } from "@lib/siteUrl";
import { GEO_CATEGORIES } from "@data/geo";
import { getNationalCityPage } from "@data/nationalSeo";
import styled from "styled-components";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const page = getNationalCityPage("karakol")!;
  const url = `${SITE_URL}/${locale}/karakol`;
  const title = locale === "en" ? page.titleEn : page.titleRu;
  const description = locale === "en" ? page.descriptionEn : page.descriptionRu;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ru: `${SITE_URL}/ru/karakol`,
        en: `${SITE_URL}/en/karakol`,
        ky: `${SITE_URL}/ky/karakol`,
        "x-default": `${SITE_URL}/ru/karakol`,
      },
    },
    openGraph: { title, description, url, type: "website" },
  };
}

// ─── Styled components ────────────────────────────────────────────────────────

const CityHero = styled.section`
  background: linear-gradient(135deg, #0277bd 0%, #01579b 60%, #013f72 100%);
  border-radius: 20px; padding: 3rem 2.5rem; margin-bottom: 2.5rem; color: #fff;
  h1 { color: #fff; margin-bottom: 0.75rem; }
  p  { color: rgba(255,255,255,0.88); font-size: 15px; line-height: 1.7; max-width: 660px; margin: 0; }
`;
const BadgeRow = styled.div`display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.75rem;`;
const Badge = styled.div`
  background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.25);
  border-radius: 20px; padding: 0.45rem 1.1rem; font-size: 13px; color: #fff; font-weight: 500;
`;
const CategoryCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: 14px; padding: 1.25rem 1rem; background: #fff;
  text-decoration: none; display: block; color: inherit; text-align: center;
  transition: box-shadow 0.2s, transform 0.2s;
  &:hover { box-shadow: 0 4px 16px rgba(2,119,189,0.12); transform: translateY(-2px); }
  .icon { font-size: 28px; margin-bottom: 0.5rem; }
  .name { font-size: 13px; font-weight: 600; color: #0277bd; }
`;
const SeoBox = styled.section`
  background: #f7fafd; border-radius: 14px; padding: 1.75rem 2rem; margin-bottom: 2rem;
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

export default async function KarakolPage({ params }: Props) {
  const { locale } = await params;
  const page = getNationalCityPage("karakol")!;
  const isEn = locale === "en";
  const isKy = locale === "ky";

  const homeLabel = isEn ? "Home" : isKy ? "Башкы бет" : "Главная";
  const h1 = isEn ? page.h1En : page.h1Ru;
  const lead = isEn ? page.leadEn : page.leadRu;
  const seoText = isEn ? page.seoTextEn : page.seoTextRu;
  const faqItems = isEn ? page.faqEn : page.faqRu;
  const nearbyLinks = page.nearbyLinks;

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
    url: `${SITE_URL}/${locale}/karakol`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: homeLabel, item: `${SITE_URL}/${locale}` },
        { "@type": "ListItem", position: 2, name: isEn ? "Kyrgyzstan" : "Кыргызстан", item: `${SITE_URL}/${locale}/kyrgyzstan` },
        { "@type": "ListItem", position: 3, name: isEn ? "Karakol" : "Каракол" },
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
            { label: isEn ? "Kyrgyzstan" : "Кыргызстан", href: "/kyrgyzstan" },
            { label: isEn ? "Karakol" : "Каракол" },
          ]}
          locale={locale}
        />

        <CityHero>
          <H1 fontSize="27px">{h1}</H1>
          <p>{lead}</p>
          <BadgeRow>
            <Badge>🏔️ {isEn ? "Issyk-Kul Region" : "Иссык-Кульская область"}</Badge>
            <Badge>👥 {isEn ? "~90,000 residents" : "~90 000 жителей"}</Badge>
            <Badge>🚚 {isEn ? "Delivery: 2–3 days" : "Доставка: 2–3 дня"}</Badge>
            <Badge>✅ {isEn ? "Official warranty" : "Гарантия"}</Badge>
            <Badge>💳 {isEn ? "Installment" : "Рассрочка"}</Badge>
            <Badge>📦 {isEn ? "Cash on delivery" : "Оплата при получении"}</Badge>
          </BadgeRow>
        </CityHero>

        {/* Categories */}
        <H2 fontSize="20px" mb="1.25rem">
          {isEn ? "Electronics Delivery to Karakol" : "Доставка электроники в Каракол"}
        </H2>
        <Grid container spacing={3} mb="2.5rem">
          {GEO_CATEGORIES.map((cat) => {
            const name = isEn ? cat.nameEn : isKy ? cat.nameKy : cat.nameRu;
            return (
              <Grid item lg={2} sm={4} xs={6} key={cat.slug}>
                <CategoryCard as={Link} href={`/${locale}/${cat.slug}/karakol`}>
                  <div className="icon">{cat.icon}</div>
                  <div className="name">{name}</div>
                </CategoryCard>
              </Grid>
            );
          })}
        </Grid>

        {/* SEO text */}
        <SeoBox>
          {seoText.map((para, i) => <p key={i}>{para}</p>)}
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

        {/* Nearby links */}
        <H3 fontSize="15px" mb="0.75rem" color="text.muted">
          {isEn ? "Related pages" : "Связанные страницы"}
        </H3>
        <Box display="flex" flexWrap="wrap" style={{ gap: "0.5rem" }} mb="2rem">
          {nearbyLinks.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href}`}
              style={{ fontSize: 13, color: "#1565c0", textDecoration: "none", background: "#e8f0fe", borderRadius: 12, padding: "4px 12px" }}
            >
              {isEn ? link.nameEn : link.nameRu}
            </Link>
          ))}
          <Link
            href={`/${locale}/kyrgyzstan`}
            style={{ fontSize: 13, color: "#1565c0", textDecoration: "none", background: "#e8f0fe", borderRadius: 12, padding: "4px 12px" }}
          >
            {isEn ? "All of Kyrgyzstan" : "Весь Кыргызстан"}
          </Link>
          <Link
            href={`/${locale}/bishkek`}
            style={{ fontSize: 13, color: "#1565c0", textDecoration: "none", background: "#e8f0fe", borderRadius: 12, padding: "4px 12px" }}
          >
            {isEn ? "Bishkek" : "Бишкек"}
          </Link>
        </Box>
      </Box>
    </AppLayout>
  );
}
