import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppLayout from "@component/layout/layout-3";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { H1, H3, H4, Paragraph } from "@component/Typography";
import Card from "@component/Card";
import Breadcrumbs from "@component/seo/Breadcrumbs";
import { getBlogList, buildStorefrontImageUrl } from "@utils/__api__/storefront";
import styled from "styled-components";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tomstore.kg";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; category?: string; tag?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "en" ? "Blog — TomStore" : "Блог — TomStore";
  const description =
    locale === "en"
      ? "Tips on choosing electronics: laptops, printers, computers. Expert reviews and buying guides from TomStore Bishkek."
      : "Советы по выбору электроники: ноутбуки, принтеры, компьютеры. Экспертные обзоры и руководства по покупке от TomStore Бишкек.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog`,
      languages: {
        ru: `${SITE_URL}/ru/blog`,
        en: `${SITE_URL}/en/blog`,
        ky: `${SITE_URL}/ky/blog`,
      },
    },
    openGraph: { title, description, url: `${SITE_URL}/${locale}/blog`, type: "website" },
  };
}

const PostCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: box-shadow 200ms ease;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

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

export default async function BlogPage({ params, searchParams }: Props) {
  const [{ locale }, sp] = await Promise.all([params, searchParams]);

  const data = await getBlogList({ q: sp.q, category: sp.category, tag: sp.tag });

  if (!data.enabled) notFound();

  const homeLabel = locale === "en" ? "Home" : locale === "ky" ? "Башкы бет" : "Главная";
  const blogLabel = locale === "en" ? "Blog" : "Блог";
  const readMoreLabel = locale === "en" ? "Read more →" : "Читать далее →";
  const pageTitle = locale === "en" ? "TomStore Blog" : "Блог TomStore";
  const pageDesc =
    locale === "en"
      ? "Tips, reviews, and buying guides for electronics."
      : "Советы, обзоры и руководства по выбору электроники.";
  const emptyLabel = locale === "en" ? "No posts found." : "Статьи не найдены.";
  const categoriesLabel = locale === "en" ? "Categories" : "Категории";
  const tagsLabel = locale === "en" ? "Tags" : "Теги";
  const activeFilterLabel = locale === "en" ? "Filter:" : "Фильтр:";
  const clearLabel = locale === "en" ? "Clear" : "Сбросить";

  const activeFilter = sp.category || sp.tag || sp.q;

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
            {activeFilterLabel}{" "}
            <strong>{sp.category || sp.tag || sp.q}</strong>
            <Link href={`/${locale}/blog`}>{clearLabel} ×</Link>
          </ActiveFilter>
        )}

        <Grid container spacing={6}>
          {/* Posts */}
          <Grid item lg={9} xs={12}>
            {data.items.length === 0 ? (
              <Paragraph color="text.muted">{emptyLabel}</Paragraph>
            ) : (
              <Grid container spacing={6}>
                {data.items.map((post) => (
                  <Grid item lg={4} sm={6} xs={12} key={post.slug}>
                    <PostCard borderRadius={12}>
                      {post.coverImageUrl && (
                        <img
                          className="cover"
                          src={buildStorefrontImageUrl(post.coverImageUrl)}
                          alt={post.title}
                        />
                      )}
                      <div className="body">
                        <div className="meta">
                          {post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString(
                                locale === "en" ? "en-US" : "ru-RU",
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

          {/* Sidebar */}
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
