"use client";

import Link from "next/link";
import Image from "next/image";
import AppLayout from "@component/layout/layout-3";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { H1, H3, H4, Paragraph } from "@component/Typography";
import Card from "@component/Card";
import Breadcrumbs from "@component/seo/Breadcrumbs";
import styled, { keyframes } from "styled-components";
import type { StorefrontBlogListResponse } from "@utils/__api__/storefront";

// ── Animations ───────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

// ── Post card ────────────────────────────────────────────────────────────────

const PostCard = styled(Link)`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 28px rgba(0,0,0,0.13);
  }

  .cover {
    width: 100%;
    height: 190px;
    object-fit: cover;
    display: block;
    background: ${({ theme }) => theme.colors.gray[100]};
  }

  .cover-placeholder {
    width: 100%;
    height: 190px;
    background: linear-gradient(135deg, #0f3460 0%, #16213e 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
  }

  .body {
    padding: 1.25rem 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
  }

  .category-badge {
    display: inline-block;
    background: ${({ theme }) => theme.colors.primary.light};
    color: ${({ theme }) => theme.colors.primary.main};
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    border-radius: 6px;
    padding: 2px 8px;
    width: fit-content;
  }

  .title {
    font-size: 15px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.primary};
    line-height: 1.45;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color 0.15s;
  }

  &:hover .title { color: ${({ theme }) => theme.colors.primary.main}; }

  .excerpt {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.text.muted};
    line-height: 1.6;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.5rem;
    padding-top: 0.75rem;
    border-top: 1px solid ${({ theme }) => theme.colors.gray[100]};
  }

  .date {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.text.muted};
  }

  .arrow {
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

// ── Sidebar ──────────────────────────────────────────────────────────────────

const SidebarCard = styled(Card)`
  padding: 1.25rem;
  margin-bottom: 1.5rem;
`;

const SidebarTitle = styled(H4)`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.text.muted};
`;

const CategoryLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.45rem 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};

  &:last-child { border-bottom: none; }
  &:hover { color: ${({ theme }) => theme.colors.primary.main}; }

  .count {
    font-size: 11px;
    background: ${({ theme }) => theme.colors.gray[100]};
    border-radius: 10px;
    padding: 1px 8px;
    color: ${({ theme }) => theme.colors.text.muted};
  }
`;

const TagCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const TagLink = styled(Link)`
  font-size: 12px;
  padding: 4px 11px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.gray[100]};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  transition: background 150ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const ActiveFilter = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  background: ${({ theme }) => theme.colors.primary.light};
  border-radius: 20px;
  padding: 5px 14px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.primary.main};

  a {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    font-weight: 700;
    margin-left: 4px;
  }
`;

// ── Coming soon ───────────────────────────────────────────────────────────────

const ComingHero = styled.section`
  position: relative;
  background: linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%);
  border-radius: 20px;
  padding: 4rem 2rem 3.5rem;
  text-align: center;
  overflow: hidden;
  margin: 1rem 0 2.5rem;
  animation: ${fadeUp} 0.5s ease both;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 60% 0%, rgba(99,102,241,0.25) 0%, transparent 60%);
    pointer-events: none;
  }
`;

const ComingBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 20px;
  padding: 5px 14px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,0.8);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 1.25rem;

  &::before {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 6px #22c55e;
  }
`;

const ComingTitle = styled.h2`
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  font-weight: 800;
  color: #fff;
  margin: 0 0 1rem;
  line-height: 1.25;
`;

const ComingDesc = styled.p`
  font-size: 15px;
  color: rgba(255,255,255,0.68);
  max-width: 540px;
  margin: 0 auto 2rem;
  line-height: 1.75;
`;

const TopicsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;
  margin-bottom: 2.25rem;
`;

const TopicPill = styled.span<{ $i: number }>`
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 20px;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255,255,255,0.85);
  animation: ${fadeUp} 0.4s ease ${({ $i }) => $i * 0.06}s both;
  cursor: default;
  transition: background 0.15s;

  &:hover {
    background: rgba(255,255,255,0.15);
    color: #fff;
  }
`;

const CatalogBtn = styled(Link)`
  display: inline-block;
  background: #fff;
  color: #0f3460;
  font-weight: 700;
  font-size: 15px;
  padding: 0.9rem 2.5rem;
  border-radius: 30px;
  text-decoration: none;
  box-shadow: 0 4px 20px rgba(0,0,0,0.22);
  transition: all 0.2s ease;

  &:hover {
    background: #f0f4ff;
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(0,0,0,0.28);
  }
`;

const PreviewLabel = styled.p`
  margin-top: 1.5rem;
  font-size: 12px;
  color: rgba(255,255,255,0.35);
  letter-spacing: 0.03em;
`;

// ── Preview cards (fake posts for visual) ────────────────────────────────────

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 2rem;
  opacity: 0.45;
  pointer-events: none;
  filter: blur(1px);

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 480px) {
    display: none;
  }
`;

const PreviewCardShell = styled.div`
  background: rgba(255,255,255,0.07);
  border-radius: 12px;
  overflow: hidden;
`;

const PreviewImg = styled.div`
  height: 90px;
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.06) 25%,
    rgba(255,255,255,0.12) 50%,
    rgba(255,255,255,0.06) 75%
  );
  background-size: 200% auto;
  animation: ${shimmer} 2s linear infinite;
`;

const PreviewLines = styled.div`
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const PreviewLine = styled.div<{ $w?: string }>`
  height: 8px;
  border-radius: 4px;
  width: ${({ $w }) => $w || "100%"};
  background: rgba(255,255,255,0.1);
`;

// ── Component ────────────────────────────────────────────────────────────────

type Props = {
  locale: string;
  data: StorefrontBlogListResponse;
  q?: string;
  category?: string;
  tag?: string;
};

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === "en" ? "en-US" : "ru-RU", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogPageClient({ locale, data, q, category, tag }: Props) {
  const isEn = locale === "en";
  const isKy = locale === "ky";

  const homeLabel = isEn ? "Home" : isKy ? "Башкы бет" : "Главная";
  const blogLabel = isEn ? "Blog" : "Блог";
  const pageTitle = isEn ? "TomStore Blog" : isKy ? "TomStore Блогу" : "Блог TomStore";
  const pageDesc = isEn
    ? "Tips, reviews, and buying guides for electronics."
    : isKy
    ? "Электроника тандоо боюнча кеңештер жана колдонмолор."
    : "Советы, обзоры и руководства по выбору электроники.";

  // ── Coming soon ──────────────────────────────────────────────────────────
  if (!data.enabled || data.items.length === 0) {
    const badge = isEn ? "Coming soon" : isKy ? "Жакында" : "Скоро";
    const comingTitle = isEn
      ? "Expert blog — coming soon"
      : isKy
      ? "Эксперттик блог — жакында"
      : "Экспертный блог — скоро здесь";
    const comingDesc = isEn
      ? "We're preparing in-depth articles on choosing the right laptop, printer, PC, and accessories. Subscribe or check back soon!"
      : isKy
      ? "Туура ноутбук, принтер, ПК жана аксессуарларды тандоо боюнча терең макалаларды даярдап жатабыз. Жакында!"
      : "Готовим подробные статьи о выборе ноутбука, принтера, ПК и аксессуаров. Следите за обновлениями!";
    const topics = isEn
      ? ["Laptops", "Printers", "PCs & Monitors", "Accessories", "Comparisons", "Buying Guides", "Gaming", "Office Setup"]
      : isKy
      ? ["Ноутбуктар", "Принтерлер", "ПК жана Мониторлор", "Аксессуарлар", "Салыштыруулар", "Колдонмолор"]
      : ["Ноутбуки", "Принтеры", "ПК и мониторы", "Аксессуары", "Сравнения", "Гайды по выбору", "Для игр", "Офисный ПК"];
    const ctaLabel = isEn ? "Browse Catalog" : isKy ? "Каталогго өтүү" : "Перейти в каталог";
    const previewLabel = isEn
      ? "Articles will appear here soon"
      : isKy
      ? "Макалалар жакында чыгат"
      : "Скоро здесь появятся статьи";

    return (
      <AppLayout>
        <Box pt="20px" pb="60px">
          <Breadcrumbs
            items={[{ label: homeLabel, href: "/" }, { label: blogLabel }]}
            locale={locale}
          />

          <H1 mb="0.25rem">{pageTitle}</H1>
          <Paragraph color="text.muted" mb="2rem">{pageDesc}</Paragraph>

          <ComingHero>
            <ComingBadge>{badge}</ComingBadge>
            <ComingTitle>{comingTitle}</ComingTitle>
            <ComingDesc>{comingDesc}</ComingDesc>
            <TopicsRow>
              {topics.map((t, i) => <TopicPill key={t} $i={i}>{t}</TopicPill>)}
            </TopicsRow>
            <CatalogBtn href={`/${locale}/catalog`}>{ctaLabel}</CatalogBtn>
            <PreviewLabel>{previewLabel}</PreviewLabel>
            <PreviewGrid>
              {[0,1,2].map((n) => (
                <PreviewCardShell key={n}>
                  <PreviewImg />
                  <PreviewLines>
                    <PreviewLine $w="55%" />
                    <PreviewLine $w="90%" />
                    <PreviewLine $w="70%" />
                  </PreviewLines>
                </PreviewCardShell>
              ))}
            </PreviewGrid>
          </ComingHero>
        </Box>
      </AppLayout>
    );
  }

  // ── Live blog ────────────────────────────────────────────────────────────
  const emptyLabel = isEn ? "No posts found." : "Статьи не найдены.";
  const categoriesLabel = isEn ? "Categories" : "Категории";
  const tagsLabel = isEn ? "Tags" : "Теги";
  const readLabel = isEn ? "Read →" : "Читать →";
  const activeFilter = category || tag || q;
  const clearLabel = isEn ? "Clear" : "Сбросить";

  return (
    <AppLayout>
      <Box pt="20px" pb="40px">
        <Breadcrumbs
          items={[{ label: homeLabel, href: "/" }, { label: blogLabel }]}
          locale={locale}
        />

        <H1 mb="0.25rem">{pageTitle}</H1>
        <Paragraph color="text.muted" mb="1.5rem">{pageDesc}</Paragraph>

        {activeFilter && (
          <ActiveFilter>
            {category || tag || q}
            <Link href={`/${locale}/blog`}>{clearLabel} ×</Link>
          </ActiveFilter>
        )}

        <Grid container spacing={6}>
          <Grid item lg={9} xs={12}>
            {data.items.length === 0 ? (
              <Paragraph color="text.muted">{emptyLabel}</Paragraph>
            ) : (
              <Grid container spacing={5}>
                {data.items.map((post) => (
                  <Grid item lg={4} sm={6} xs={12} key={post.slug}>
                    <PostCard href={`/${locale}/blog/${post.slug}`}>
                      {post.coverImageUrl
                        ? (
                          <Image
                            className="cover"
                            src={post.coverImageUrl}
                            alt={post.title}
                            width={800}
                            height={500}
                            quality={80}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            loading="lazy"
                          />
                        )
                        : (
                          <div className="cover-placeholder">
                            {post.category === "Ноутбуки" || post.category === "Laptops" ? "💻"
                              : post.category === "Принтеры" || post.category === "Printers" ? "🖨️"
                              : "📝"}
                          </div>
                        )
                      }
                      <div className="body">
                        {post.category && <span className="category-badge">{post.category}</span>}
                        <div className="title">{post.title}</div>
                        {post.excerpt && <p className="excerpt">{post.excerpt}</p>}
                        <div className="footer">
                          <span className="date">{formatDate(post.publishedAt, locale)}</span>
                          <span className="arrow">{readLabel}</span>
                        </div>
                      </div>
                    </PostCard>
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>

          <Grid item lg={3} xs={12}>
            {data.categories.length > 0 && (
              <SidebarCard borderRadius={12}>
                <SidebarTitle>{categoriesLabel}</SidebarTitle>
                {data.categories.map((cat) => (
                  <CategoryLink
                    key={cat.slug}
                    href={`/${locale}/blog?category=${encodeURIComponent(cat.slug)}`}
                  >
                    {cat.name}
                    <span className="count">{cat.totalPosts}</span>
                  </CategoryLink>
                ))}
              </SidebarCard>
            )}
            {data.tags.length > 0 && (
              <SidebarCard borderRadius={12}>
                <SidebarTitle>{tagsLabel}</SidebarTitle>
                <TagCloud>
                  {data.tags.map((t) => (
                    <TagLink key={t.slug} href={`/${locale}/blog?tag=${encodeURIComponent(t.slug)}`}>
                      {t.name}
                    </TagLink>
                  ))}
                </TagCloud>
              </SidebarCard>
            )}
          </Grid>
        </Grid>
      </Box>
    </AppLayout>
  );
}
