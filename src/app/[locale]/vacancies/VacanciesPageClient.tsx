"use client";

import { useMemo, useState } from "react";
import styled from "styled-components";
import { useRouter } from "@i18n/navigation";
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
  margin-bottom: 2rem;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.75rem;
`;

const HeroDesc = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.7;
`;

const ToolbarRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const SortSelect = styled.select`
  font-size: 14px;
  font-weight: 500;
  padding: 0.45rem 2rem 0.45rem 0.85rem;
  border: 1px solid ${({ theme }) => theme.colors.text.disabled};
  border-radius: 10px;
  background: #fff;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237d879c' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.65rem center;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const VacancyCard = styled.article`
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
  border-left: 4px solid ${({ theme }) => theme.colors.primary.main};
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  height: 100%;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12);
  }
`;

const VacancyTitle = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
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
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
`;

const DetailsLink = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-top: auto;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: #f7f9fc;
  border-radius: 16px;
`;

// ── Card ──────────────────────────────────────────────────────────────────────

function VacancyCard_({ vacancy, locale, onClick }: {
  vacancy: StorefrontVacancy;
  locale: string;
  onClick: () => void;
}) {
  const isEn = locale === "en";
  const isKy = locale === "ky";
  const detailsLabel = isEn ? "View details →" : isKy ? "Чоо-жай →" : "Подробнее →";

  return (
    <VacancyCard onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}>
      <VacancyTitle>{vacancy.title}</VacancyTitle>

      <TagRow>
        {vacancy.role && <Tag>{vacancy.role}</Tag>}
        {vacancy.branchName && <Tag>{vacancy.branchName}</Tag>}
        {vacancy.workFormat && <Tag $accent>{vacancy.workFormat}</Tag>}
        {vacancy.salaryText && <Tag $accent>{vacancy.salaryText}</Tag>}
      </TagRow>

      {vacancy.description && (
        <VacancyExcerpt>{vacancy.description}</VacancyExcerpt>
      )}

      <DetailsLink>{detailsLabel}</DetailsLink>
    </VacancyCard>
  );
}

// ── Sort helpers ──────────────────────────────────────────────────────────────

type SortKey = "newest" | "oldest" | "az" | "salary";

function sortVacancies(items: StorefrontVacancy[], key: SortKey) {
  return [...items].sort((a, b) => {
    if (key === "newest") {
      return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime();
    }
    if (key === "oldest") {
      return new Date(a.createdAt ?? 0).getTime() - new Date(b.createdAt ?? 0).getTime();
    }
    if (key === "az") {
      return a.title.localeCompare(b.title, "ru");
    }
    if (key === "salary") {
      const sal = (v: StorefrontVacancy) => {
        const m = String(v.salaryText ?? "").match(/\d[\d\s]*/);
        return m ? parseInt(m[0].replace(/\s/g, ""), 10) : 0;
      };
      return sal(b) - sal(a);
    }
    return 0;
  });
}

// ── Page ──────────────────────────────────────────────────────────────────────

interface Props {
  locale: string;
  data: StorefrontVacanciesResponse;
}

export default function VacanciesPageClient({ locale, data: initialData }: Props) {
  const { data } = useVacancies(initialData);
  const router = useRouter();
  const [sortKey, setSortKey] = useState<SortKey>("newest");

  const isEn = locale === "en";
  const isKy = locale === "ky";

  const t = {
    home: isEn ? "Home" : isKy ? "Башкы бет" : "Главная",
    page: isEn ? "Vacancies" : isKy ? "Вакансиялар" : "Вакансии",
    heroTitle: isEn ? "Join the TomStore Team" : isKy ? "TomStore командасына кошулуңуз" : "Присоединяйтесь к команде TomStore",
    heroDesc: isEn
      ? "We're growing and looking for talented people to help deliver the best electronics shopping experience in Kyrgyzstan."
      : isKy
      ? "Биз өсүп жатабыз жана Кыргызстанда эң мыкты электроника соодасын жасоого жардам бере турган таланттуу адамдарды издейбиз."
      : "Мы растём и ищем талантливых людей, которые помогут нам создать лучший опыт покупки электроники в Кыргызстане.",
    openPositions: isEn ? "Open Positions" : isKy ? "Ачык вакансиялар" : "Открытые вакансии",
    sortLabel: isEn ? "Sort:" : isKy ? "Сорттоо:" : "Сортировка:",
    sortNewest: isEn ? "Newest first" : isKy ? "Жаңысы биринчи" : "Сначала новые",
    sortOldest: isEn ? "Oldest first" : isKy ? "Эскиси биринчи" : "Сначала старые",
    sortAz: isEn ? "A → Z" : isKy ? "А → Я" : "А → Я",
    sortSalary: isEn ? "By salary" : isKy ? "Эмгек акы боюнча" : "По зарплате",
    emptyTitle: isEn ? "No open positions right now" : isKy ? "Азыр ачык вакансиялар жок" : "Сейчас нет открытых вакансий",
    emptyText: isEn
      ? "No open positions at the moment, but we're always looking for great people. Send your CV via WhatsApp."
      : isKy
      ? "Азыр ачык вакансиялар жок, бирок биз дайыма жакшы адамдарды издейбиз."
      : "Сейчас нет открытых позиций, но мы всегда в поиске. Отправьте резюме нам в WhatsApp.",
  };

  const items = useMemo(
    () => sortVacancies(data?.items ?? [], sortKey),
    [data?.items, sortKey],
  );

  return (
    <AppLayout>
      <Box pt="20px" pb="60px">
        <Breadcrumbs
          items={[{ label: t.home, href: "/" }, { label: t.page }]}
          locale={locale}
        />

        <HeroSection>
          <HeroTitle>{t.heroTitle}</HeroTitle>
          <HeroDesc>{t.heroDesc}</HeroDesc>
        </HeroSection>

        <ToolbarRow>
          <SectionTitle>
            {t.openPositions}
            {items.length > 0 && (
              <span style={{ fontWeight: 400, fontSize: "0.85em", marginLeft: "0.5rem", color: "#7d879c" }}>
                ({items.length})
              </span>
            )}
          </SectionTitle>

          {items.length > 1 && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: 13, color: "#7d879c" }}>{t.sortLabel}</span>
              <SortSelect value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)}>
                <option value="newest">{t.sortNewest}</option>
                <option value="oldest">{t.sortOldest}</option>
                <option value="az">{t.sortAz}</option>
                <option value="salary">{t.sortSalary}</option>
              </SortSelect>
            </div>
          )}
        </ToolbarRow>

        {items.length === 0 ? (
          <EmptyState>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "0 0 0.5rem" }}>{t.emptyTitle}</h2>
            <p style={{ fontSize: 14, color: "#7d879c", margin: 0 }}>{t.emptyText}</p>
          </EmptyState>
        ) : (
          <Grid container spacing={4}>
            {items.map((vacancy) => (
              <Grid item lg={6} md={6} xs={12} key={vacancy.id}>
                <VacancyCard_
                  vacancy={vacancy}
                  locale={locale}
                  onClick={() => router.push(`/vacancies/${vacancy.id}` as any)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </AppLayout>
  );
}
