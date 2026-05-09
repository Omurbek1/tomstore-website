"use client";

import styled from "styled-components";
import { Link } from "@i18n/navigation";
import AppLayout from "@component/layout/layout-3";
import Box from "@component/Box";
import Breadcrumbs from "@component/seo/Breadcrumbs";
import { useVacancy } from "@hook/useVacancies";
import type { StorefrontVacancy } from "@utils/__api__/storefront";

const CRM_URL = process.env.NEXT_PUBLIC_CRM_URL || "";

// ── Styled ────────────────────────────────────────────────────────────────────

const Banner = styled.div<{ $img?: string | null }>`
  border-radius: 16px;
  overflow: hidden;
  min-height: 200px;
  display: flex;
  align-items: flex-end;
  padding: 2rem;
  margin-bottom: 2rem;
  background: ${({ $img }) =>
    $img
      ? `linear-gradient(0deg, rgba(15,23,42,0.7), rgba(15,23,42,0.35)), url(${$img}) center/cover`
      : "linear-gradient(135deg, #0f3460 0%, #16213e 100%)"};
`;

const BannerTitle = styled.h1`
  font-size: clamp(1.4rem, 4vw, 2rem);
  font-weight: 800;
  color: #fff;
  margin: 0 0 0.5rem;
  line-height: 1.25;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Tag = styled.span<{ $light?: boolean }>`
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
  background: ${({ $light }) => ($light ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.1)")};
  color: #fff;
  backdrop-filter: blur(4px);
`;

const Layout2Col = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 1.5rem;
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 1.75rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
`;

const SectionTitle = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #eee;
`;

const Description = styled.div`
  font-size: 14px;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: pre-line;
`;

const RequirementList = styled.ul`
  margin: 0;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const RequirementItem = styled.li`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.5;
`;

const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const InfoLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.text.disabled};
`;

const InfoValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ApplyButton = styled.a`
  display: block;
  background: ${({ theme }) => theme.colors.primary.main};
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  padding: 0.85rem 1.5rem;
  border-radius: 12px;
  text-decoration: none;
  text-align: center;
  transition: opacity 0.15s ease;
  margin-top: 1.25rem;

  &:hover {
    opacity: 0.88;
  }
`;

const BackLink = styled(Link)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 1.25rem;

  &:hover {
    text-decoration: underline;
  }
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
    home: isEn ? "Home" : isKy ? "Башкы бет" : "Главная",
    vacancies: isEn ? "Vacancies" : isKy ? "Вакансиялар" : "Вакансии",
    back: isEn ? "← All vacancies" : isKy ? "← Бардык вакансиялар" : "← Все вакансии",
    descTitle: isEn ? "About the position" : isKy ? "Кызмат жөнүндө" : "О должности",
    reqTitle: isEn ? "Requirements" : isKy ? "Талаптар" : "Требования",
    salary: isEn ? "Salary" : isKy ? "Эмгек акы" : "Зарплата",
    format: isEn ? "Work format" : isKy ? "Иш форматы" : "Формат работы",
    schedule: isEn ? "Schedule" : isKy ? "Иш графиги" : "График",
    address: isEn ? "Address" : isKy ? "Дарек" : "Адрес",
    branch: isEn ? "Branch" : isKy ? "Филиал" : "Филиал",
    role: isEn ? "Role" : isKy ? "Роль" : "Роль",
    headcount: isEn ? "Open positions" : isKy ? "Ачык орундар" : "Открытых мест",
    apply: isEn ? "Apply Now" : isKy ? "Арыз берүү" : "Откликнуться",
    noForm: isEn
      ? "Application form is not yet set up. Contact us via WhatsApp."
      : isKy
      ? "Арыз формасы азыр жок. WhatsApp аркылуу байланышыңыз."
      : "Форма заявки не настроена. Свяжитесь с нами через WhatsApp.",
  };

  const requirements = String(vacancy.requirements ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const applyUrl = vacancy.formSlug && CRM_URL
    ? `${CRM_URL}/hr/form/${vacancy.formSlug}`
    : null;

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

        <Banner $img={vacancy.bannerImageUrl}>
          <div>
            <BannerTitle>{vacancy.title}</BannerTitle>
            <TagRow>
              {vacancy.role && <Tag>{vacancy.role}</Tag>}
              {vacancy.branchName && <Tag>{vacancy.branchName}</Tag>}
              {vacancy.workFormat && <Tag $light>{vacancy.workFormat}</Tag>}
              {vacancy.salaryText && <Tag $light>{vacancy.salaryText}</Tag>}
            </TagRow>
          </div>
        </Banner>

        <Layout2Col>
          {/* Left: description + requirements */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {vacancy.description && (
              <Card>
                <SectionTitle>{t.descTitle}</SectionTitle>
                <Description>{vacancy.description}</Description>
              </Card>
            )}

            {requirements.length > 0 && (
              <Card>
                <SectionTitle>{t.reqTitle}</SectionTitle>
                <RequirementList>
                  {requirements.map((req, i) => (
                    <RequirementItem key={i}>{req}</RequirementItem>
                  ))}
                </RequirementList>
              </Card>
            )}
          </div>

          {/* Right: info + apply */}
          <Card>
            <SectionTitle style={{ borderBottomColor: "#e8e8e8" }}>
              {isEn ? "Details" : isKy ? "Чоо-жайы" : "Детали"}
            </SectionTitle>

            <InfoGrid>
              {vacancy.salaryText && (
                <InfoRow>
                  <InfoLabel>{t.salary}</InfoLabel>
                  <InfoValue>{vacancy.salaryText}</InfoValue>
                </InfoRow>
              )}
              {vacancy.workFormat && (
                <InfoRow>
                  <InfoLabel>{t.format}</InfoLabel>
                  <InfoValue>{vacancy.workFormat}</InfoValue>
                </InfoRow>
              )}
              {vacancy.workSchedule && (
                <InfoRow>
                  <InfoLabel>{t.schedule}</InfoLabel>
                  <InfoValue>{vacancy.workSchedule}</InfoValue>
                </InfoRow>
              )}
              {vacancy.workAddress && (
                <InfoRow>
                  <InfoLabel>{t.address}</InfoLabel>
                  <InfoValue>{vacancy.workAddress}</InfoValue>
                </InfoRow>
              )}
              {vacancy.branchName && (
                <InfoRow>
                  <InfoLabel>{t.branch}</InfoLabel>
                  <InfoValue>{vacancy.branchName}</InfoValue>
                </InfoRow>
              )}
              {vacancy.role && (
                <InfoRow>
                  <InfoLabel>{t.role}</InfoLabel>
                  <InfoValue>{vacancy.role}</InfoValue>
                </InfoRow>
              )}
              {vacancy.headcount && vacancy.headcount > 1 && (
                <InfoRow>
                  <InfoLabel>{t.headcount}</InfoLabel>
                  <InfoValue>{vacancy.headcount}</InfoValue>
                </InfoRow>
              )}
            </InfoGrid>

            {applyUrl ? (
              <ApplyButton href={applyUrl} target="_blank" rel="noopener noreferrer">
                {t.apply}
              </ApplyButton>
            ) : (
              <p style={{ fontSize: 13, color: "#7d879c", marginTop: "1rem" }}>{t.noForm}</p>
            )}
          </Card>
        </Layout2Col>
      </Box>
    </AppLayout>
  );
}
