"use client";

import styled, { keyframes } from "styled-components";
import { Link } from "@i18n/navigation";
import AppLayout from "@component/layout/main-layout";
import Box from "@component/Box";
import Breadcrumbs from "@component/seo/Breadcrumbs";
import { useVacancy } from "@hook/useVacancies";
import type { StorefrontVacancy } from "@utils/__api__/storefront";

const CRM_URL = process.env.NEXT_PUBLIC_CRM_URL || "";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ── Banner ────────────────────────────────────────────────────────────────────

const Banner = styled.div<{ $img?: string | null }>`
  border-radius: 20px;
  overflow: hidden;
  min-height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem 2.25rem;
  margin-bottom: 2rem;
  position: relative;
  background: ${({ $img }) =>
    $img
      ? `url(${$img}) center/cover no-repeat`
      : "linear-gradient(135deg, #0f3460 0%, #1a1a5e 50%, #16213e 100%)"};

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: ${({ $img }) =>
      $img
        ? "linear-gradient(0deg, rgba(8,11,18,0.88) 0%, rgba(8,11,18,0.45) 55%, transparent 100%)"
        : "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, transparent 60%)"};
    border-radius: inherit;
  }
`;

const BannerContent = styled.div`
  position: relative;
  z-index: 1;
`;

const BannerTitle = styled.h1`
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  font-weight: 800;
  color: #fff;
  margin: 0 0 0.75rem;
  line-height: 1.2;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const BannerTag = styled.span<{ $variant?: "salary" | "format" | "branch" }>`
  font-size: 13px;
  font-weight: 600;
  padding: 5px 14px;
  border-radius: 20px;
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: ${({ $variant }) => {
    if ($variant === "salary") return "rgba(34, 197, 94, 0.25)";
    if ($variant === "format") return "rgba(99, 102, 241, 0.3)";
    return "rgba(255, 255, 255, 0.15)";
  }};
  color: #fff;
`;

const HeadcountBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 12px;
  font-weight: 600;
  color: #28dc64;
  background: rgba(40, 220, 100, 0.18);
  border: 1px solid rgba(40, 220, 100, 0.35);
  border-radius: 8px;
  padding: 4px 10px;
  margin-top: 0.75rem;
`;

// ── Layout ────────────────────────────────────────────────────────────────────

const Layout2Col = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 1.5rem;
  align-items: start;
  animation: ${fadeUp} 0.35s ease;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const StickyRight = styled.div`
  position: sticky;
  top: 80px;

  @media (max-width: 860px) {
    position: static;
    order: -1;
  }
`;

// ── Cards ─────────────────────────────────────────────────────────────────────

const Card = styled.div`
  background: ${({ theme }) => theme.colors.body.paper};
  border-radius: 16px;
  padding: 1.75rem;
  border: 1.5px solid ${({ theme }) => theme.colors.gray[300]};
  box-shadow: ${({ theme }) => theme.isDark
    ? "0 2px 12px rgba(0,0,0,0.4)"
    : "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)"};
`;

const SectionTitle = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[300]};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Description = styled.div`
  font-size: 14px;
  line-height: 1.85;
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: pre-line;
`;

const RequirementList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const RequirementItem = styled.li`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;

  &::before {
    content: "";
    display: block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary.main};
    margin-top: 0.45rem;
    flex-shrink: 0;
  }
`;

// ── Info Sidebar ──────────────────────────────────────────────────────────────

const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[300]};

  &:last-of-type { border-bottom: none; }
`;

const InfoRowIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.primary.light};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
`;

const InfoTexts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const InfoLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: ${({ theme }) => theme.colors.text.hint};
`;

const InfoValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

// ── Apply CTA ─────────────────────────────────────────────────────────────────

const ApplyCTA = styled.div`
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1.5px solid ${({ theme }) => theme.colors.gray[300]};
`;

const ApplyButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.primary.main};
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  padding: 0.95rem 1.5rem;
  border-radius: 12px;
  text-decoration: none;
  text-align: center;
  transition: opacity 0.15s ease, transform 0.15s ease;
  cursor: pointer;

  &:hover { opacity: 0.9; transform: translateY(-1px); }
  &:active { transform: translateY(0); }
`;

const NoFormNote = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  padding: 1rem;
  background: ${({ theme }) => theme.isDark ? "rgba(250,200,40,0.1)" : "#fefce8"};
  border: 1px solid ${({ theme }) => theme.isDark ? "rgba(250,200,40,0.25)" : "#fde68a"};
  border-radius: 10px;
  font-size: 13px;
  color: ${({ theme }) => theme.isDark ? "#f0c040" : "#92400e"};
  line-height: 1.5;
`;

// ── Back Link ─────────────────────────────────────────────────────────────────

const BackLink = styled(Link)`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.hint};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 1.25rem;
  transition: color 0.15s ease;

  &:hover { color: ${({ theme }) => theme.colors.primary.main}; }
`;

// ── Page ──────────────────────────────────────────────────────────────────────

interface Props {
  locale: string;
  vacancy: StorefrontVacancy;
}

export default function VacancyDetailClient({ locale, vacancy: initialVacancy }: Props) {
  const { data: vacancy = initialVacancy } = useVacancy(initialVacancy.id, initialVacancy);

  const isEn = locale === "en";
  const isKy = locale === "ky";

  const t = {
    home:      isEn ? "Home"      : isKy ? "Башкы бет"   : "Главная",
    vacancies: isEn ? "Vacancies" : isKy ? "Вакансиялар" : "Вакансии",
    back:      isEn ? "All vacancies" : isKy ? "Бардык вакансиялар" : "Все вакансии",
    about:     isEn ? "About the position" : isKy ? "Кызмат жөнүндө" : "О должности",
    req:       isEn ? "Requirements" : isKy ? "Талаптар" : "Требования",
    details:   isEn ? "Details"  : isKy ? "Чоо-жайы" : "Детали",
    salary:    isEn ? "Salary"   : isKy ? "Эмгек акы"  : "Зарплата",
    format:    isEn ? "Work format" : isKy ? "Иш форматы" : "Формат работы",
    schedule:  isEn ? "Schedule"   : isKy ? "Иш графиги" : "График",
    address:   isEn ? "Address"    : isKy ? "Дарек"      : "Адрес",
    branch:    isEn ? "Branch"     : isKy ? "Филиал"     : "Филиал",
    role:      isEn ? "Role"       : isKy ? "Роль"       : "Роль",
    apply:     isEn ? "Apply Now"  : isKy ? "Арыз берүү" : "Откликнуться",
    noForm:    isEn
      ? "The application form is not set up yet. Contact us via WhatsApp to apply."
      : isKy
      ? "Арыз формасы азыр жок. WhatsApp аркылуу байланышыңыз."
      : "Форма заявки не настроена. Свяжитесь с нами через WhatsApp для отклика.",
    spots: isEn ? "spots available" : isKy ? "орун бар" : "места доступны",
  };

  const requirements = String(vacancy.requirements ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const applyUrl = vacancy.formSlug && CRM_URL
    ? `${CRM_URL}/hr/form/${vacancy.formSlug}`
    : null;

  const infoRows: Array<{ icon: string; label: string; value: string }> = [
    vacancy.salaryText   ? { icon: "💰", label: t.salary,   value: vacancy.salaryText }   : null,
    vacancy.workFormat   ? { icon: "🏠", label: t.format,   value: vacancy.workFormat }   : null,
    vacancy.workSchedule ? { icon: "🕐", label: t.schedule, value: vacancy.workSchedule } : null,
    vacancy.workAddress  ? { icon: "📍", label: t.address,  value: vacancy.workAddress }  : null,
    vacancy.branchName   ? { icon: "🏪", label: t.branch,   value: vacancy.branchName }   : null,
    vacancy.role         ? { icon: "👤", label: t.role,     value: vacancy.role }         : null,
  ].filter(Boolean) as Array<{ icon: string; label: string; value: string }>;

  return (
    <AppLayout>
      <Box pt="20px" pb="60px">
        <Breadcrumbs
          items={[
            { label: t.home, href: "/" },
            { label: t.vacancies, href: "/vacancies" },
            { label: vacancy.title },
          ]}
          locale={locale}
        />

        <BackLink href="/vacancies">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          {t.back}
        </BackLink>

        <Banner $img={vacancy.bannerImageUrl}>
          <BannerContent>
            <BannerTitle>{vacancy.title}</BannerTitle>
            <TagRow>
              {vacancy.workFormat && <BannerTag $variant="format">{vacancy.workFormat}</BannerTag>}
              {vacancy.salaryText && <BannerTag $variant="salary">{vacancy.salaryText}</BannerTag>}
              {vacancy.branchName && <BannerTag $variant="branch">{vacancy.branchName}</BannerTag>}
              {vacancy.role       && <BannerTag>{vacancy.role}</BannerTag>}
            </TagRow>
            {vacancy.headcount && vacancy.headcount > 0 && (
              <HeadcountBadge>✓ {vacancy.headcount} {t.spots}</HeadcountBadge>
            )}
          </BannerContent>
        </Banner>

        <Layout2Col>
          <LeftColumn>
            {vacancy.description && (
              <Card>
                <SectionTitle>📝 {t.about}</SectionTitle>
                <Description>{vacancy.description}</Description>
              </Card>
            )}
            {requirements.length > 0 && (
              <Card>
                <SectionTitle>✅ {t.req}</SectionTitle>
                <RequirementList>
                  {requirements.map((req, i) => (
                    <RequirementItem key={i}>{req}</RequirementItem>
                  ))}
                </RequirementList>
              </Card>
            )}
          </LeftColumn>

          <StickyRight>
            <Card>
              <SectionTitle>📋 {t.details}</SectionTitle>
              {infoRows.length > 0 && (
                <InfoGrid>
                  {infoRows.map(({ icon, label, value }) => (
                    <InfoRow key={label}>
                      <InfoRowIcon>{icon}</InfoRowIcon>
                      <InfoTexts>
                        <InfoLabel>{label}</InfoLabel>
                        <InfoValue>{value}</InfoValue>
                      </InfoTexts>
                    </InfoRow>
                  ))}
                </InfoGrid>
              )}
              <ApplyCTA>
                {applyUrl ? (
                  <ApplyButton href={applyUrl} target="_blank" rel="noopener noreferrer">
                    {t.apply} →
                  </ApplyButton>
                ) : (
                  <NoFormNote>
                    <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>⚠️</span>
                    <span>{t.noForm}</span>
                  </NoFormNote>
                )}
              </ApplyCTA>
            </Card>
          </StickyRight>
        </Layout2Col>
      </Box>
    </AppLayout>
  );
}
