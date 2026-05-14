"use client";

import Link from "next/link";
import Image from "next/image";
import AppLayout from "@component/layout/main-layout";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { H1, H4, Paragraph } from "@component/Typography";
import Card from "@component/Card";
import Breadcrumbs from "@component/seo/Breadcrumbs";
import styled from "styled-components";
import type {
  StorefrontBlogPostDetails,
  StorefrontBlogPostSummary,
} from "@utils/__api__/storefront";

// ── Styled components ────────────────────────────────────────────────────────

const ArticleWrapper = styled.article`
  h2 {
    font-size: 20px;
    font-weight: 700;
    margin: 2rem 0 0.75rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }
  h3 {
    font-size: 16px;
    font-weight: 600;
    margin: 1.5rem 0 0.5rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }
  p, li {
    font-size: 15px;
    line-height: 1.75;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
  ul, ol {
    padding-left: 1.5rem;
    margin: 0.5rem 0 1rem;
  }
  strong { color: ${({ theme }) => theme.colors.text.primary}; }
  img {
    max-width: 100%;
    border-radius: 8px;
    margin: 1rem 0;
  }
  a {
    color: ${({ theme }) => theme.colors.primary.main};
    &:hover { text-decoration: underline; }
  }
`;

const CoverImage = styled(Image)`
  width: 100%;
  height: auto;
  max-height: 420px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 2rem;
  display: block;
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

const RecentPostItem = styled(Link)`
  display: flex;
  gap: 0.75rem;
  padding: 0.6rem 0;
  text-decoration: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  align-items: flex-start;

  &:last-child { border-bottom: none; }
  &:hover .title { color: ${({ theme }) => theme.colors.primary.main}; }

  img {
    width: 60px;
    height: 45px;
    object-fit: cover;
    border-radius: 6px;
    flex-shrink: 0;
    background: ${({ theme }) => theme.colors.gray[100]};
  }

  .recent-placeholder {
    width: 60px;
    height: 45px;
    border-radius: 6px;
    flex-shrink: 0;
    background: ${({ theme }) => theme.colors.gray[100]};
  }

  .text { flex: 1; }

  .title {
    font-size: 13px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.primary};
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color 150ms ease;
  }

  .date {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.text.muted};
    margin-top: 3px;
  }
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

// ── Helpers ──────────────────────────────────────────────────────────────────

function renderContent(content: string) {
  if (/<[a-z][\s\S]*>/i.test(content)) return content;
  const html = content
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[hulo])(.+)$/gm, "$1");
  return `<p>${html}</p>`;
}

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === "en" ? "en-US" : "ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ── Component ────────────────────────────────────────────────────────────────

type Props = { post: StorefrontBlogPostDetails; locale: string };

export default function BlogPostPageClient({ post, locale }: Props) {
  const isEn = locale === "en";
  const isKy = locale === "ky";

  const homeLabel = isEn ? "Home" : isKy ? "Башкы бет" : "Главная";
  const blogLabel = isEn ? "Blog" : "Блог";
  const recentLabel = isEn ? "Recent Posts" : isKy ? "Акыркы макалалар" : "Последние статьи";
  const categoriesLabel = isEn ? "Categories" : isKy ? "Категориялар" : "Категории";

  return (
    <AppLayout>
      <Box pt="20px" pb="60px">
        <Breadcrumbs
          items={[
            { label: homeLabel, href: "/" },
            { label: blogLabel, href: "/blog" },
            { label: post.title },
          ]}
          locale={locale}
        />

        <Grid container spacing={6}>
          <Grid item lg={9} xs={12}>
            <ArticleWrapper>
              <H1 mb="0.5rem" fontSize="26px">{post.title}</H1>
              <Paragraph color="text.muted" mb="2rem" fontSize="13px">
                {formatDate(post.publishedAt, locale)}
                {post.category && ` · ${post.category}`}
                {post.authorName && ` · ${post.authorName}`}
              </Paragraph>

              {post.coverImageUrl && (
                <CoverImage
                  src={post.coverImageUrl}
                  alt={post.title}
                  width={1200}
                  height={630}
                  quality={80}
                  sizes="(max-width: 768px) 100vw, 75vw"
                  priority
                  fetchPriority="high"
                />
              )}

              <div dangerouslySetInnerHTML={{ __html: renderContent(post.content) }} />
            </ArticleWrapper>
          </Grid>

          <Grid item lg={3} xs={12}>
            {post.recentPosts.length > 0 && (
              <SidebarCard borderRadius={12}>
                <SidebarTitle>{recentLabel}</SidebarTitle>
                {post.recentPosts.map((recent: StorefrontBlogPostSummary) => (
                  <RecentPostItem key={recent.slug} href={`/${locale}/blog/${recent.slug}`}>
                    {recent.coverImageUrl ? (
                      <Image
                        src={recent.coverImageUrl}
                        alt={recent.title}
                        width={120}
                        height={90}
                        quality={75}
                        sizes="60px"
                        loading="lazy"
                        unoptimized
                      />
                    ) : (
                      <span className="recent-placeholder" aria-hidden="true" />
                    )}
                    <div className="text">
                      <div className="title">{recent.title}</div>
                      <div className="date">{formatDate(recent.publishedAt, locale)}</div>
                    </div>
                  </RecentPostItem>
                ))}
              </SidebarCard>
            )}

            {post.categories.length > 0 && (
              <SidebarCard borderRadius={12}>
                <SidebarTitle>{categoriesLabel}</SidebarTitle>
                {post.categories.map((cat) => (
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
          </Grid>
        </Grid>
      </Box>
    </AppLayout>
  );
}
