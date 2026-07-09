import type { Metadata } from "next";
import AppLayout from "@component/layout/main-layout";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { H1, H2, H3 } from "@component/Typography";
import Breadcrumbs from "@component/seo/Breadcrumbs";
import { Link } from "@i18n/navigation";
import { SITE_URL } from "@lib/siteUrl";
import { ALL_REGIONS, MAJOR_CITIES } from "@data/geo";
import { getNationalCategoryPage } from "@data/nationalSeo";
import { getSafeStorefrontCatalog, mapStorefrontProduct } from "@utils/__api__/storefront";
import styled from "styled-components";

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const page = getNationalCategoryPage("printery-kyrgyzstan")!;
  const url = `${SITE_URL}/${locale}/printery-kyrgyzstan`;
  const title = locale === "en" ? page.titleEn : page.titleRu;
  const description = locale === "en" ? page.descriptionEn : page.descriptionRu;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ru: `${SITE_URL}/ru/printery-kyrgyzstan`,
        en: `${SITE_URL}/en/printery-kyrgyzstan`,
        ky: `${SITE_URL}/ky/printery-kyrgyzstan`,
        "x-default": `${SITE_URL}/ru/printery-kyrgyzstan`,
      },
    },
    openGraph: { title, description, url, type: "website" },
  };
}

// ─── Styled ───────────────────────────────────────────────────────────────────

const NatHero = styled.section`
  background: linear-gradient(135deg, #004d40 0%, #00695c 60%, #00897b 100%);
  border-radius: 20px; padding: 3rem 2.5rem; margin-bottom: 2.5rem; color: #fff;
  h1 { color: #fff; margin-bottom: 0.75rem; }
  p  { color: rgba(255,255,255,0.88); font-size: 15px; line-height: 1.7; max-width: 680px; margin: 0; }
`;
const BadgeRow = styled.div`display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.75rem;`;
const Badge = styled.div`
  background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.25);
  border-radius: 20px; padding: 0.45rem 1.1rem; font-size: 13px; color: #fff; font-weight: 500;
`;
const ProductGrid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 2rem;
  a { display: block; border: 1px solid ${({ theme }) => theme.colors.gray[200]}; border-radius: 12px; padding: 0.75rem; text-decoration: none; color: inherit; transition: box-shadow 0.2s;
    &:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    img { width: 100%; height: 140px; object-fit: contain; border-radius: 8px; margin-bottom: 0.5rem; }
    .title { font-size: 12px; font-weight: 600; margin-bottom: 0.25rem; line-height: 1.4; }
    .price { font-size: 14px; font-weight: 700; color: ${({ theme }) => theme.colors.primary.main}; }
  }
`;
const SeoBox = styled.section`
  background: #f7fafd; border-radius: 14px; padding: 1.75rem 2rem; margin-bottom: 2rem;
  p { font-size: 14px; line-height: 1.8; color: #444; }
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

export default async function PrinteryKyrgyzstanPage({ params }: Props) {
  const { locale } = await params;
  const page = getNationalCategoryPage("printery-kyrgyzstan")!;
  const isEn = locale === "en";
  const isKy = locale === "ky";

  const homeLabel = isEn ? "Home" : isKy ? "Башкы бет" : "Главная";
  const h1 = isEn ? page.h1En : page.h1Ru;
  const seoText = isEn ? page.seoTextEn : page.seoTextRu;
  const faqItems = isEn ? page.faqEn : page.faqRu;

  const catalog = await getSafeStorefrontCatalog({ q: page.apiQuery, pageSize: 12 });
  const products = (catalog?.items ?? []).map(mapStorefrontProduct);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <AppLayout>
      <Box pt="20px" pb="60px">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        <Breadcrumbs
          items={[
            { label: homeLabel, href: "/" },
            { label: isEn ? "Kyrgyzstan" : "Кыргызстан", href: "/kyrgyzstan" },
            { label: isEn ? page.nameEn : page.nameRu },
          ]}
          locale={locale}
        />

        <NatHero>
          <H1 fontSize="27px">{h1}</H1>
          <p>{seoText.slice(0, 220)}…</p>
          <BadgeRow>
            <Badge>🖨️ {isEn ? "Laser & inkjet" : "Лазерные и струйные"}</Badge>
            <Badge>🇰🇬 {isEn ? "Delivery across Kyrgyzstan" : "Доставка по КР"}</Badge>
            <Badge>✅ {isEn ? "Official warranty" : "Гарантия производителя"}</Badge>
            <Badge>💳 {isEn ? "Installment" : "Рассрочка"}</Badge>
            <Badge>🏷️ Epson · Canon · HP · Brother</Badge>
          </BadgeRow>
        </NatHero>

        {/* Products */}
        {products.length > 0 && (
          <Box mb="2.5rem">
            <H2 fontSize="18px" mb="1rem">
              {isEn ? "Printers Available Now" : "Принтеры в наличии"}
            </H2>
            <ProductGrid>
              {products.slice(0, 12).map((p: any) => (
                <Link key={p.id} href={`/${locale}/product/${p.slug}`}>
                  {p.imgUrl && <img src={p.imgUrl} alt={`${p.title} — купить в Кыргызстане`} loading="lazy" />}
                  <div className="title">{p.title}</div>
                  <div className="price">{p.price?.toLocaleString("ru-RU")} {isEn ? "$" : "сом"}</div>
                </Link>
              ))}
            </ProductGrid>
            <Box textAlign="center">
              <Link
                href={`/${locale}${page.catalogPath}`}
                style={{ fontSize: 14, color: "#00897b", fontWeight: 600, textDecoration: "none" }}
              >
                {isEn ? "View all printers →" : "Смотреть все принтеры →"}
              </Link>
            </Box>
          </Box>
        )}

        {/* SEO text */}
        <SeoBox>
          <p>{seoText}</p>
        </SeoBox>

        {/* Cities */}
        <H2 fontSize="18px" mb="1rem">
          {isEn ? "Printers by City" : "Принтеры по городам"}
        </H2>
        <Box mb="2.5rem" display="flex" flexWrap="wrap" style={{ gap: "0.5rem" }}>
          {[
            { nameRu: "Бишкек", nameEn: "Bishkek", href: "/printery/bishkek" },
            { nameRu: "Каракол", nameEn: "Karakol", href: "/printery/karakol" },
            ...MAJOR_CITIES.filter(c => c.slug !== "bishkek" && c.slug !== "karakol").map(c => ({
              nameRu: c.nameRu, nameEn: c.nameEn, href: `/printery/${c.slug}`,
            })),
          ].map((city) => (
            <Link
              key={city.href}
              href={`/${locale}${city.href}`}
              style={{ fontSize: 13, color: "#00695c", textDecoration: "none", background: "#e0f2f1", borderRadius: 20, padding: "5px 14px" }}
            >
              {isEn ? city.nameEn : city.nameRu}
            </Link>
          ))}
        </Box>

        {/* Regions */}
        <H2 fontSize="18px" mb="1rem">
          {isEn ? "Delivery to All Regions" : "Доставка по всем областям"}
        </H2>
        <Grid container spacing={3} mb="2.5rem">
          {ALL_REGIONS.map((region) => {
            const name = isEn ? region.nameEn : region.nameRu;
            return (
              <Grid item lg={3} sm={4} xs={6} key={region.slug}>
                <Link
                  href={`/${locale}/printery/${region.slug}`}
                  style={{
                    display: "block", border: "1px solid #e0e0e0", borderRadius: 12,
                    padding: "0.75rem 1rem", fontSize: 13, color: "#00695c",
                    textDecoration: "none", fontWeight: 600, background: "#fff",
                  }}
                >
                  🖨️ {isEn ? "Printers in" : "Принтеры в"} {name}
                  <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>
                    {isEn ? `Delivery ${region.deliveryDays}` : `Доставка ${region.deliveryDays}`}
                  </div>
                </Link>
              </Grid>
            );
          })}
        </Grid>

        {/* FAQ */}
        <H2 fontSize="18px" mb="1.25rem">
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

        <H3 fontSize="14px" mb="0.75rem" color="text.muted">
          {isEn ? "Related" : "Смотрите также"}
        </H3>
        <Box display="flex" flexWrap="wrap" style={{ gap: "0.5rem" }}>
          {[
            { nameRu: "Ноутбуки в Кыргызстане", nameEn: "Laptops in Kyrgyzstan", href: "/noutbuki-kyrgyzstan" },
            { nameRu: "Игровые ноутбуки", nameEn: "Gaming Laptops", href: "/igrovye-noutbuki-kyrgyzstan" },
            { nameRu: "Весь Кыргызстан", nameEn: "All of Kyrgyzstan", href: "/kyrgyzstan" },
          ].map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href}`}
              style={{ fontSize: 13, color: "#00695c", textDecoration: "none", background: "#e0f2f1", borderRadius: 12, padding: "4px 12px" }}
            >
              {isEn ? link.nameEn : link.nameRu}
            </Link>
          ))}
        </Box>
      </Box>
    </AppLayout>
  );
}
