"use client";

import styled from "styled-components";
import AppLayout from "@component/layout/layout-3";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import Breadcrumbs from "@component/seo/Breadcrumbs";
import { useVacancies } from "@hook/useVacancies";
import type { StorefrontVacanciesResponse, StorefrontVacancy } from "@utils/__api__/storefront";

// ── Styled ────────────────────────────────────────────────────────────────────

const HeroSection = styled.section`
  background: linear-gradient(135deg, #0f3460 0%, #16213e 100%);
  border-radius: 16px;
  padding: 3rem 2rem;
  color: #fff;
  margin-bottom: 2.5rem;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.75rem;
  line-height: 1.3;
`;

const HeroDesc = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 580px;
  margin: 0 auto;
  line-height: 1.7;
`;

const VacancyCard = styled.article`
  background: #fff;
  border-radius: 16px;
  padding: 1.75rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  border-left: 4px solid ${({ theme }) => theme.colors.primary.main};
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  height: 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12);
  }
`;

const VacancyTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span<{ $accent?: boolean }>`
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  background: ${({ $accent, theme }) =>
    $accent ? theme.colors.primary.light : "#f3f4f6"};
  color: ${({ $accent, theme }) =>
    $accent ? theme.colors.primary.main : theme.colors.text.secondary};
`;

const VacancyExcerpt = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: 1.6;
  flex: 1;
`;

const ApplyButton = styled.a`
  display: inline-block;
  background: ${({ theme }) => theme.colors.primary.main};
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  padding: 0.6rem 1.5rem;
  border-radius: 10px;
  text-decoration: none;
  text-align: center;
  transition: opacity 0.15s ease;
  align-self: flex-start;

  &:hover {
    opacity: 0.88;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: #f7f9fc;
  border-radius: 16px;
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 0.5rem;
`;

const EmptyText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: 1.6;
`;

const SectionTitle = styled.h2`
  font-size: 1.35rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 1.25rem;
  padding-bottom: 0.6rem;
  border-bottom: 2px solid #e8e8e8;
`;

// ── Vacancy Card ──────────────────────────────────────────────────────────────

function VacancyItem({ vacancy, locale }: { vacancy: StorefrontVacancy; locale: string }) {
  const isEn = locale === "en";
  const isKy = locale === "ky";

  const applyLabel = isEn ? "Apply" : isKy ? "Арыз берүү" : "Откликнуться";

  const requirementsList = Array.isArray(vacancy.requirements)
    ? vacancy.requirements
    : typeof vacancy.requirements === "string" && vacancy.requirements
    ? [vacancy.requirements]
    : [];

  return (
    <VacancyCard>
      <VacancyTitle>{vacancy.title}</VacancyTitle>

      <TagRow>
        {vacancy.department && <Tag>{vacancy.department}</Tag>}
        {vacancy.location && <Tag>{vacancy.location}</Tag>}
        {vacancy.employmentType && <Tag $accent>{vacancy.employmentType}</Tag>}
        {vacancy.salary && <Tag $accent>{vacancy.salary}</Tag>}
      </TagRow>

      {(vacancy.excerpt || vacancy.description) && (
        <VacancyExcerpt>{vacancy.excerpt || vacancy.description}</VacancyExcerpt>
      )}

      {requirementsList.length > 0 && (
        <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: 13, color: "#7d879c", lineHeight: 1.7 }}>
          {requirementsList.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
      )}

      {vacancy.applyUrl && (
        <ApplyButton href={vacancy.applyUrl} target="_blank" rel="noopener noreferrer">
          {applyLabel}
        </ApplyButton>
      )}
    </VacancyCard>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

interface Props {
  locale: string;
  data: StorefrontVacanciesResponse;
}

export default function VacanciesPageClient({ locale, data: initialData }: Props) {
  const { data } = useVacancies(initialData);

  const isEn = locale === "en";
  const isKy = locale === "ky";

  const homeLabel = isEn ? "Home" : isKy ? "Башкы бет" : "Главная";
  const pageLabel = isEn ? "Vacancies" : isKy ? "Вакансиялар" : "Вакансии";

  const heroTitle = isEn
    ? "Join the TomStore Team"
    : isKy
    ? "TomStore командасына кошулуңуз"
    : "Присоединяйтесь к команде TomStore";

  const heroDesc = isEn
    ? "We are growing and looking for talented, motivated people to help us deliver the best electronics shopping experience in Kyrgyzstan."
    : isKy
    ? "Биз өсүп жатабыз жана Кыргызстанда эң мыкты электроника соодасын жасоого жардам бере турган таланттуу, мотивациялуу адамдарды издейбиз."
    : "Мы растём и ищем талантливых, мотивированных людей, которые помогут нам создать лучший опыт покупки электроники в Кыргызстане.";

  const openPositionsLabel = isEn
    ? "Open Positions"
    : isKy
    ? "Ачык вакансиялар"
    : "Открытые вакансии";

  const emptyTitle = isEn
    ? "No open positions right now"
    : isKy
    ? "Азыр ачык вакансиялар жок"
    : "Сейчас нет открытых вакансий";

  const emptyText = isEn
    ? "We don't have any open positions at the moment, but we're always looking for great people. Send your CV to our WhatsApp."
    : isKy
    ? "Азыр ачык вакансиялар жок, бирок биз дайыма жакшы адамдарды издейбиз. CV-ңызды WhatsAppка жөнөтүңүз."
    : "Сейчас нет открытых позиций, но мы всегда в поиске хороших людей. Отправьте своё резюме нам в WhatsApp.";

  const items = data?.items ?? [];

  return (
    <AppLayout>
      <Box pt="20px" pb="60px">
        <Breadcrumbs
          items={[{ label: homeLabel, href: "/" }, { label: pageLabel }]}
          locale={locale}
        />

        <HeroSection>
          <HeroTitle>{heroTitle}</HeroTitle>
          <HeroDesc>{heroDesc}</HeroDesc>
        </HeroSection>

        <SectionTitle>{openPositionsLabel}</SectionTitle>

        {items.length === 0 ? (
          <EmptyState>
            <EmptyIcon>🔍</EmptyIcon>
            <EmptyTitle>{emptyTitle}</EmptyTitle>
            <EmptyText>{emptyText}</EmptyText>
          </EmptyState>
        ) : (
          <Grid container spacing={4}>
            {items.map((vacancy) => (
              <Grid item lg={6} md={6} xs={12} key={vacancy.id}>
                <VacancyItem vacancy={vacancy} locale={locale} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </AppLayout>
  );
}
