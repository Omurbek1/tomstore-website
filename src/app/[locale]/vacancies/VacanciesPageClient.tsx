"use client";

import { useMemo, useState, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { useRouter } from "@i18n/navigation";
import AppLayout from "@component/layout/layout-3";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import Breadcrumbs from "@component/seo/Breadcrumbs";
import { useVacancies } from "@hook/useVacancies";
import type { StorefrontVacanciesResponse, StorefrontVacancy } from "@utils/__api__/storefront";

// ── Animations ────────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ── Hero ──────────────────────────────────────────────────────────────────────

const HeroSection = styled.section`
  background: linear-gradient(135deg, #0f3460 0%, #1a1a5e 50%, #16213e 100%);
  border-radius: 20px;
  padding: 3.5rem 2rem 3rem;
  color: #fff;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 70% 0%, rgba(99, 102, 241, 0.25) 0%, transparent 60%);
    pointer-events: none;
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 800;
  color: #fff;
  margin: 0 0 0.75rem;
  line-height: 1.2;
`;

const HeroDesc = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.75);
  max-width: 560px;
  margin: 0 auto 1.5rem;
  line-height: 1.7;
`;

const HeroStats = styled.div`
  display: inline-flex;
  gap: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 50px;
  padding: 0.6rem 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
`;

const HeroStat = styled.div`
  text-align: center;

  strong {
    display: block;
    font-size: 1.35rem;
    font-weight: 800;
    color: #fff;
  }

  span {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.65);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
`;

// ── Search ────────────────────────────────────────────────────────────────────

const SearchWrapper = styled.div`
  position: relative;
  margin-bottom: 1.25rem;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  display: flex;
  align-items: center;
  pointer-events: none;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.85rem 1rem 0.85rem 2.85rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  font-size: 15px;
  color: #1f2937;
  background: #fff;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  box-sizing: border-box;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.main}22;
  }
`;

const ClearSearchBtn = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: #e5e7eb;
  border: none;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6b7280;
  font-size: 13px;
  line-height: 1;
  padding: 0;

  &:hover {
    background: #d1d5db;
  }
`;

// ── Filters ───────────────────────────────────────────────────────────────────

const FiltersRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  align-items: center;
`;

const FilterGroupLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-right: 0.25rem;
`;

const FilterChip = styled.button<{ $active: boolean }>`
  font-size: 13px;
  font-weight: 500;
  padding: 0.35rem 0.9rem;
  border-radius: 20px;
  border: 1.5px solid ${({ $active, theme }) =>
    $active ? theme.colors.primary.main : "#e5e7eb"};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary.main : "#fff"};
  color: ${({ $active }) => ($active ? "#fff" : "#374151")};
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ $active, theme }) =>
      $active ? "#fff" : theme.colors.primary.main};
  }
`;

const ClearFiltersBtn = styled.button`
  font-size: 12px;
  font-weight: 600;
  color: #ef4444;
  background: #fef2f2;
  border: 1.5px solid #fecaca;
  border-radius: 20px;
  padding: 0.3rem 0.8rem;
  cursor: pointer;
  transition: all 0.15s ease;
  margin-left: 0.5rem;

  &:hover {
    background: #fee2e2;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 20px;
  background: #e5e7eb;
  margin: 0 0.25rem;
`;

// ── Toolbar ───────────────────────────────────────────────────────────────────

const ToolbarRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
`;

const ResultInfo = styled.div`
  font-size: 14px;
  color: #6b7280;

  strong {
    color: #1f2937;
    font-weight: 700;
  }
`;

const SortSelect = styled.select`
  font-size: 13px;
  font-weight: 500;
  padding: 0.45rem 2rem 0.45rem 0.85rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  color: #374151;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239ca3af' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.65rem center;
  transition: border-color 0.15s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

// ── Vacancy Card ──────────────────────────────────────────────────────────────

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.25rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const VacancyCard = styled.article`
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06), 0 4px 16px rgba(0, 0, 0, 0.04);
  border: 1.5px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
  animation: ${fadeUp} 0.3s ease both;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    border-color: ${({ theme }) => theme.colors.primary.main}44;
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
`;

const CardIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.primary.main}18;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 1.25rem;
`;

const NewBadge = styled.span`
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  background: #dcfce7;
  color: #16a34a;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const CardTitle = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  line-height: 1.35;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`;

const Tag = styled.span<{ $variant?: "format" | "branch" | "role" | "salary" }>`
  font-size: 11px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 6px;
  background: ${({ $variant, theme }) => {
    if ($variant === "format") return theme.colors.primary.main + "18";
    if ($variant === "salary") return "#f0fdf4";
    if ($variant === "branch") return "#fefce8";
    return "#f3f4f6";
  }};
  color: ${({ $variant, theme }) => {
    if ($variant === "format") return theme.colors.primary.main;
    if ($variant === "salary") return "#16a34a";
    if ($variant === "branch") return "#854d0e";
    return "#6b7280";
  }};
`;

const CardExcerpt = styled.p`
  font-size: 13px;
  color: #6b7280;
  margin: 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px solid #f1f5f9;
`;

const ViewBtn = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary.main};
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
`;

const CardDate = styled.span`
  font-size: 12px;
  color: #9ca3af;
`;

// ── Empty State ───────────────────────────────────────────────────────────────

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: #f8fafc;
  border-radius: 16px;
  border: 1.5px dashed #e2e8f0;
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h2`
  font-size: 1.15rem;
  font-weight: 700;
  color: #374151;
  margin: 0 0 0.5rem;
`;

const EmptyText = styled.p`
  font-size: 14px;
  color: #9ca3af;
  margin: 0 0 1rem;
`;

const ResetLink = styled.button`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary.main};
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
`;

// ── Helpers ───────────────────────────────────────────────────────────────────

type SortKey = "newest" | "oldest" | "az" | "salary";

function sortVacancies(items: StorefrontVacancy[], key: SortKey) {
  return [...items].sort((a, b) => {
    if (key === "newest") return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime();
    if (key === "oldest") return new Date(a.createdAt ?? 0).getTime() - new Date(b.createdAt ?? 0).getTime();
    if (key === "az") return a.title.localeCompare(b.title, "ru");
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

function isNew(createdAt?: string) {
  if (!createdAt) return false;
  return Date.now() - new Date(createdAt).getTime() < 7 * 24 * 60 * 60 * 1000;
}

function formatDate(dateStr?: string, locale?: string) {
  if (!dateStr) return "";
  try {
    return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "ru-RU", {
      day: "numeric",
      month: "short",
    }).format(new Date(dateStr));
  } catch {
    return "";
  }
}

function roleIcon(role?: string | null): string {
  if (!role) return "💼";
  const r = role.toLowerCase();
  if (r.includes("продав") || r.includes("sales") || r.includes("менеджер") || r.includes("manager")) return "🛒";
  if (r.includes("техн") || r.includes("engineer") || r.includes("it") || r.includes("програм")) return "💻";
  if (r.includes("логист") || r.includes("склад") || r.includes("warehouse")) return "📦";
  if (r.includes("бухг") || r.includes("financ") || r.includes("account")) return "📊";
  if (r.includes("hr") || r.includes("кадр") || r.includes("персонал")) return "👥";
  if (r.includes("маркет") || r.includes("market") || r.includes("smm") || r.includes("дизайн")) return "🎨";
  return "💼";
}

// ── Card Component ────────────────────────────────────────────────────────────

function VacancyCardItem({ vacancy, locale, onClick, delay }: {
  vacancy: StorefrontVacancy;
  locale: string;
  onClick: () => void;
  delay: number;
}) {
  const isEn = locale === "en";
  const isKy = locale === "ky";
  const detailLabel = isEn ? "View details →" : isKy ? "Чоо-жайы →" : "Подробнее →";

  return (
    <VacancyCard
      onClick={onClick}
      role="button"
      tabIndex={0}
      style={{ animationDelay: `${delay * 50}ms` }}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      <CardTop>
        <CardIcon>{roleIcon(vacancy.role)}</CardIcon>
        {isNew(vacancy.createdAt) && (
          <NewBadge>{isEn ? "New" : isKy ? "Жаңы" : "Новая"}</NewBadge>
        )}
      </CardTop>

      <CardTitle>{vacancy.title}</CardTitle>

      <TagRow>
        {vacancy.workFormat && <Tag $variant="format">{vacancy.workFormat}</Tag>}
        {vacancy.salaryText && <Tag $variant="salary">{vacancy.salaryText}</Tag>}
        {vacancy.branchName && <Tag $variant="branch">{vacancy.branchName}</Tag>}
        {vacancy.role && <Tag>{vacancy.role}</Tag>}
      </TagRow>

      {vacancy.description && (
        <CardExcerpt>{vacancy.description}</CardExcerpt>
      )}

      <CardFooter>
        <ViewBtn>{detailLabel}</ViewBtn>
        {vacancy.createdAt && (
          <CardDate>{formatDate(vacancy.createdAt, locale)}</CardDate>
        )}
      </CardFooter>
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
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("newest");
  const [activeFormat, setActiveFormat] = useState<string | null>(null);
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [activeBranch, setActiveBranch] = useState<string | null>(null);

  const isEn = locale === "en";
  const isKy = locale === "ky";

  const t = {
    home:          isEn ? "Home"         : isKy ? "Башкы бет"       : "Главная",
    page:          isEn ? "Vacancies"    : isKy ? "Вакансиялар"     : "Вакансии",
    heroTitle:     isEn ? "Join the TomStore Team" : isKy ? "TomStore командасына кошулуңуз" : "Присоединяйтесь к команде TomStore",
    heroDesc:      isEn
      ? "We're growing and looking for talented people to help deliver the best electronics experience in Kyrgyzstan."
      : isKy
      ? "Биз өсүп жатабыз жана Кыргызстанда эң мыкты электроника соодасын жасоого жардам бере турган таланттуу адамдарды издейбиз."
      : "Мы растём и ищем талантливых людей, которые помогут создать лучший опыт покупки электроники в Кыргызстане.",
    openPositions: isEn ? "open positions" : isKy ? "ачык вакансия"  : "открытых вакансий",
    branches:      isEn ? "branches"      : isKy ? "филиал"          : "филиала",
    searchPlaceholder: isEn ? "Search vacancies…" : isKy ? "Вакансияларды издөө…" : "Поиск вакансий…",
    filterFormat:  isEn ? "Format:"  : isKy ? "Формат:"  : "Формат:",
    filterRole:    isEn ? "Role:"    : isKy ? "Роль:"    : "Роль:",
    filterBranch:  isEn ? "Branch:"  : isKy ? "Филиал:"  : "Филиал:",
    clearAll:      isEn ? "Clear filters" : isKy ? "Тазалоо" : "Сбросить",
    sortLabel:     isEn ? "Sort:"    : isKy ? "Сорттоо:" : "Сортировка:",
    sortNewest:    isEn ? "Newest first"  : isKy ? "Жаңысы биринчи" : "Сначала новые",
    sortOldest:    isEn ? "Oldest first"  : isKy ? "Эскиси биринчи" : "Сначала старые",
    sortAz:        isEn ? "A → Z"    : isKy ? "А → Я" : "А → Я",
    sortSalary:    isEn ? "By salary": isKy ? "Эмгек акы боюнча" : "По зарплате",
    found:         isEn ? "Found"    : isKy ? "Табылды" : "Найдено",
    results:       isEn ? "vacancies": isKy ? "вакансия" : "вакансий",
    emptyFiltered: isEn ? "No vacancies match your filters" : isKy ? "Фильтрлерге ылайык вакансия жок" : "Нет вакансий по вашим фильтрам",
    emptyAll:      isEn ? "No open positions right now" : isKy ? "Азыр ачык вакансиялар жок" : "Сейчас нет открытых вакансий",
    emptyFilteredSub: isEn ? "Try changing filters or search query." : isKy ? "Фильтрлерди же издөөнү өзгөртүп көрүңүз." : "Попробуйте изменить фильтры или запрос поиска.",
    emptyAllSub:   isEn ? "We're always looking for great people. Send your CV via WhatsApp." : isKy ? "Биз дайыма жакшы адамдарды издейбиз." : "Мы всегда в поиске. Отправьте резюме нам в WhatsApp.",
    reset:         isEn ? "Reset filters" : isKy ? "Тазалоо" : "Сбросить фильтры",
  };

  const allItems = data?.items ?? [];

  const formats  = useMemo(() => [...new Set(allItems.map(v => v.workFormat).filter(Boolean))] as string[], [allItems]);
  const roles    = useMemo(() => [...new Set(allItems.map(v => v.role).filter(Boolean))] as string[], [allItems]);
  const branches = useMemo(() => [...new Set(allItems.map(v => v.branchName).filter(Boolean))] as string[], [allItems]);
  const uniqueBranches = useMemo(() => [...new Set(allItems.map(v => v.branchName).filter(Boolean))], [allItems]);

  const hasActiveFilters = !!search || !!activeFormat || !!activeRole || !!activeBranch;

  const clearFilters = useCallback(() => {
    setSearch("");
    setActiveFormat(null);
    setActiveRole(null);
    setActiveBranch(null);
  }, []);

  const filtered = useMemo(() => {
    let items = allItems;
    const q = search.trim().toLowerCase();
    if (q) {
      items = items.filter(v =>
        v.title.toLowerCase().includes(q) ||
        (v.description ?? "").toLowerCase().includes(q) ||
        (v.role ?? "").toLowerCase().includes(q) ||
        (v.branchName ?? "").toLowerCase().includes(q)
      );
    }
    if (activeFormat) items = items.filter(v => v.workFormat === activeFormat);
    if (activeRole)   items = items.filter(v => v.role === activeRole);
    if (activeBranch) items = items.filter(v => v.branchName === activeBranch);
    return items;
  }, [allItems, search, activeFormat, activeRole, activeBranch]);

  const sorted = useMemo(() => sortVacancies(filtered, sortKey), [filtered, sortKey]);

  const toggleFilter = useCallback((
    value: string,
    current: string | null,
    setter: (v: string | null) => void
  ) => {
    setter(current === value ? null : value);
  }, []);

  return (
    <AppLayout>
      <Box pt="20px" pb="60px">
        <Breadcrumbs
          items={[{ label: t.home, href: "/" }, { label: t.page }]}
          locale={locale}
        />

        {/* Hero */}
        <HeroSection>
          <HeroTitle>{t.heroTitle}</HeroTitle>
          <HeroDesc>{t.heroDesc}</HeroDesc>
          {allItems.length > 0 && (
            <HeroStats>
              <HeroStat>
                <strong>{allItems.length}</strong>
                <span>{t.openPositions}</span>
              </HeroStat>
              {uniqueBranches.length > 0 && (
                <>
                  <div style={{ width: 1, background: "rgba(255,255,255,0.2)", alignSelf: "stretch" }} />
                  <HeroStat>
                    <strong>{uniqueBranches.length}</strong>
                    <span>{t.branches}</span>
                  </HeroStat>
                </>
              )}
            </HeroStats>
          )}
        </HeroSection>

        {/* Search */}
        <SearchWrapper>
          <SearchIcon>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </SearchIcon>
          <SearchInput
            type="search"
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <ClearSearchBtn onClick={() => setSearch("")} aria-label="Clear search">×</ClearSearchBtn>
          )}
        </SearchWrapper>

        {/* Filters */}
        {(formats.length > 0 || roles.length > 0 || branches.length > 0) && (
          <FiltersRow>
            {formats.length > 0 && (
              <>
                <FilterGroupLabel>{t.filterFormat}</FilterGroupLabel>
                {formats.map((fmt) => (
                  <FilterChip
                    key={fmt}
                    $active={activeFormat === fmt}
                    onClick={() => toggleFilter(fmt, activeFormat, setActiveFormat)}
                  >
                    {fmt}
                  </FilterChip>
                ))}
              </>
            )}

            {roles.length > 0 && (
              <>
                {formats.length > 0 && <Divider />}
                <FilterGroupLabel>{t.filterRole}</FilterGroupLabel>
                {roles.map((role) => (
                  <FilterChip
                    key={role}
                    $active={activeRole === role}
                    onClick={() => toggleFilter(role, activeRole, setActiveRole)}
                  >
                    {role}
                  </FilterChip>
                ))}
              </>
            )}

            {branches.length > 1 && (
              <>
                {(formats.length > 0 || roles.length > 0) && <Divider />}
                <FilterGroupLabel>{t.filterBranch}</FilterGroupLabel>
                {branches.map((branch) => (
                  <FilterChip
                    key={branch}
                    $active={activeBranch === branch}
                    onClick={() => toggleFilter(branch, activeBranch, setActiveBranch)}
                  >
                    {branch}
                  </FilterChip>
                ))}
              </>
            )}

            {hasActiveFilters && (
              <ClearFiltersBtn onClick={clearFilters}>{t.clearAll}</ClearFiltersBtn>
            )}
          </FiltersRow>
        )}

        {/* Toolbar */}
        <ToolbarRow>
          <ResultInfo>
            {hasActiveFilters ? (
              <>
                {t.found}: <strong>{sorted.length}</strong> {t.results}
              </>
            ) : (
              <strong>
                {allItems.length > 0 ? `${allItems.length} ${t.results}` : ""}
              </strong>
            )}
          </ResultInfo>

          {allItems.length > 1 && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: 13, color: "#9ca3af" }}>{t.sortLabel}</span>
              <SortSelect value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)}>
                <option value="newest">{t.sortNewest}</option>
                <option value="oldest">{t.sortOldest}</option>
                <option value="az">{t.sortAz}</option>
                <option value="salary">{t.sortSalary}</option>
              </SortSelect>
            </div>
          )}
        </ToolbarRow>

        {/* Results */}
        {sorted.length === 0 ? (
          <EmptyState>
            <EmptyIcon>{hasActiveFilters ? "🔎" : "📋"}</EmptyIcon>
            <EmptyTitle>{hasActiveFilters ? t.emptyFiltered : t.emptyAll}</EmptyTitle>
            <EmptyText>{hasActiveFilters ? t.emptyFilteredSub : t.emptyAllSub}</EmptyText>
            {hasActiveFilters && (
              <ResetLink onClick={clearFilters}>{t.reset}</ResetLink>
            )}
          </EmptyState>
        ) : (
          <CardGrid>
            {sorted.map((vacancy, i) => (
              <VacancyCardItem
                key={vacancy.id}
                vacancy={vacancy}
                locale={locale}
                delay={i}
                onClick={() => router.push(`/vacancies/${vacancy.id}` as any)}
              />
            ))}
          </CardGrid>
        )}
      </Box>
    </AppLayout>
  );
}
