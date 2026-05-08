"use client";

import Link from "next/link";
import AppLayout from "@component/layout/layout-3";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { H1, H3, H4, Paragraph } from "@component/Typography";
import Card from "@component/Card";
import Breadcrumbs from "@component/seo/Breadcrumbs";
import styled from "styled-components";
import type { StorefrontBlogListResponse } from "@utils/__api__/storefront";

// ── Styled components ────────────────────────────────────────────────────────

const PostCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: box-shadow 200ms ease;

  &:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.1); }

  .cover {
    width: 100%;
    height: 180px;
    object-fit: cover;
    display: block;
    background: ${({ theme }) => theme.colors.gray[100]};
  }

  .body {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
  }

  .meta {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text.muted};
  }

  .excerpt {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: 1.6;
    flex: 1;
  }

  .read-more {
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
`;

const SidebarCard = styled(Card)`
  padding: 1.25rem;
  margin-bottom: 1.5rem;
`;

const SidebarTitle = styled(H4)`
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const CategoryLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};

  &:last-child { border-bottom: none; }
  &:hover { color: ${({ theme }) => theme.colors.primary.main}; }

  span {
    font-size: 11px;
    background: ${({ theme }) => theme.colors.gray[100]};
    border-radius: 10px;
    padding: 1px 7px;
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
  padding: 3px 10px;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};

  a {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
`;

const ComingSoonSection = styled.section`
  background: linear-gradient(135deg, #0f3460 0%, #16213e 100%);
  border-radius: 16px;
  padding: 4rem 2rem;
  text-align: center;
  color: #fff;
  margin: 2rem 0;
`;

const ComingSoonTitle = styled.h2`
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  margin: 0 0 1rem;
  color: #fff;
`;

const ComingSoonDesc = styled.p`
  font-size: 15px;
  color: rgba(255,255,255,0.75);
  max-width: 520px;
  margin: 0 auto 2rem;
  line-height: 1.7;
`;

const TopicsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;
  margin-bottom: 2rem;
`;

const TopicTag = styled.span`
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255,255,255,0.9);
`;

const CatalogButton = styled(Link)`
  display: inline-block;
  background: #fff;
  color: #0f3460;
  font-weight: 700;
  font-size: 15px;
  padding: 0.9rem 2.5rem;
  border-radius: 30px;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(0,0,0,0.2);

  &:hover {
    background: #f0f4ff;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
  }
`;

// ── Component ────────────────────────────────────────────────────────────────

type Props = {
  locale: string;
  data: StorefrontBlogListResponse;
  q?: string;
  category?: string;
  tag?: string;
};

export default function BlogPageClient({ locale, data, q, category, tag }: Props) {
  const isEn = locale === "en";
  const isKy = locale === "ky";

  const homeLabel = isEn ? "Home" : isKy ? "Башкы бет" : "Главная";
  const blogLabel = isEn ? "Blog" : isKy ? "Блог" : "Блог";
  const pageTitle = isEn ? "TomStore Blog" : isKy ? "TomStore Блогу" : "Блог TomStore";
  const pageDesc = isEn
    ? "Tips, reviews, and buying guides for electronics."
    : isKy
    ? "Электроника тандоо боюнча кеңештер жана колдонмолор."
    : "Советы, обзоры и руководства по выбору электроники.";

  if (!data.enabled || data.items.length === 0) {
    const topics = isEn
      ? ["Laptops", "Printers", "PCs & Monitors", "Accessories", "Comparisons", "Buying Guides"]
      : isKy
      ? ["Ноутбуктар", "Принтерлер", "ПК жана Мониторлор", "Аксессуарлар", "Салыштыруулар", "Колдонмолор"]
      : ["Ноутбуки", "Принтеры", "ПК и Мониторы", "Аксессуары", "Сравнения", "Гайды по выбору"];

    const comingTitle = isEn ? "Blog coming soon" : isKy ? "Жакында блог ачылат" : "Скоро здесь будет блог";
    const comingDesc = isEn
      ? "We're preparing expert articles on choosing electronics — laptops, printers, PCs and accessories. Stay tuned!"
      : isKy
      ? "Биз электроника тандоо боюнча эксперттик макалаларды даярдап жатабыз. Жакында жарыяланат!"
      : "Мы готовим экспертные статьи по выбору электроники — ноутбуков, принтеров, ПК и аксессуаров. Следите за обновлениями!";
    const toTopicsLabel = isEn ? "Planned topics:" : isKy ? "Пландалган темалар:" : "Планируемые темы:";
    const ctaLabel = isEn ? "Browse Catalog" : isKy ? "Каталогго өтүү" : "Перейти в каталог";

    return (
      <AppLayout>
        <Box pt="20px" pb="60px">
          <Breadcrumbs
            items={[{ label: homeLabel, href: "/" }, { label: blogLabel }]}
            locale={locale}
          />

          <H1 mb="0.5rem">{pageTitle}</H1>
          <Paragraph color="text.muted" mb="2rem">{pageDesc}</Paragraph>

          <ComingSoonSection>
            <ComingSoonTitle>{comingTitle}</ComingSoonTitle>
            <ComingSoonDesc>{comingDesc}</ComingSoonDesc>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: "0.75rem" }}>{toTopicsLabel}</p>
            <TopicsGrid>
              {topics.map((t) => <TopicTag key={t}>{t}</TopicTag>)}
            </TopicsGrid>
            <CatalogButton href={`/${locale}/catalog`}>{ctaLabel}</CatalogButton>
          </ComingSoonSection>
        </Box>
      </AppLayout>
    );
  }

  const readMoreLabel = isEn ? "Read more →" : "Читать далее →";
  const emptyLabel = isEn ? "No posts found." : "Статьи не найдены.";
  const categoriesLabel = isEn ? "Categories" : "Категории";
  const tagsLabel = isEn ? "Tags" : "Теги";
  const activeFilterLabel = isEn ? "Filter:" : "Фильтр:";
  const clearLabel = isEn ? "Clear" : "Сбросить";
  const activeFilter = category || tag || q;

  return (
    <AppLayout>
      <Box pt="20px" pb="40px">
        <Breadcrumbs
          items={[{ label: homeLabel, href: "/" }, { label: blogLabel }]}
          locale={locale}
        />

        <H1 mb="0.5rem">{pageTitle}</H1>
        <Paragraph color="text.muted" mb="2rem">{pageDesc}</Paragraph>

        {activeFilter && (
          <ActiveFilter>
            {activeFilterLabel} <strong>{category || tag || q}</strong>
            <Link href={`/${locale}/blog`}>{clearLabel} ×</Link>
          </ActiveFilter>
        )}

        <Grid container spacing={6}>
          <Grid item lg={9} xs={12}>
            {data.items.length === 0 ? (
              <Paragraph color="text.muted">{emptyLabel}</Paragraph>
            ) : (
              <Grid container spacing={6}>
                {data.items.map((post) => (
                  <Grid item lg={4} sm={6} xs={12} key={post.slug}>
                    <PostCard borderRadius={12}>
                      {post.coverImageUrl && (
                        <img className="cover" src={post.coverImageUrl} alt={post.title} />
                      )}
                      <div className="body">
                        <div className="meta">
                          {post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString(
                                isEn ? "en-US" : "ru-RU",
                                { year: "numeric", month: "long", day: "numeric" },
                              )
                            : ""}
                          {post.category && ` · ${post.category}`}
                        </div>
                        <H3 fontSize="15px" fontWeight="600">{post.title}</H3>
                        {post.excerpt && <p className="excerpt">{post.excerpt}</p>}
                        <Link href={`/${locale}/blog/${post.slug}`} className="read-more">
                          {readMoreLabel}
                        </Link>
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
                    <span>{cat.totalPosts}</span>
                  </CategoryLink>
                ))}
              </SidebarCard>
            )}
            {data.tags.length > 0 && (
              <SidebarCard borderRadius={12}>
                <SidebarTitle>{tagsLabel}</SidebarTitle>
                <TagCloud>
                  {data.tags.map((tag) => (
                    <TagLink
                      key={tag.slug}
                      href={`/${locale}/blog?tag=${encodeURIComponent(tag.slug)}`}
                    >
                      {tag.name}
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
