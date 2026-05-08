import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppLayout from "@component/layout/layout-3";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { H1, H4, Paragraph } from "@component/Typography";
import Card from "@component/Card";
import Breadcrumbs from "@component/seo/Breadcrumbs";
import { getBlogPost, getBlogSlugs, buildStorefrontImageUrl } from "@utils/__api__/storefront";
import styled from "styled-components";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tomstore.kg";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};

  const url = `${SITE_URL}/${locale}/blog/${slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: url,
      languages: {
        ru: `${SITE_URL}/ru/blog/${slug}`,
        en: `${SITE_URL}/en/blog/${slug}`,
        ky: `${SITE_URL}/ky/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      ...(post.coverImageUrl
        ? { images: [{ url: buildStorefrontImageUrl(post.coverImageUrl) }] }
        : {}),
    },
  };
}

const ArticleBody = styled.article`
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

  strong {
    color: ${({ theme }) => theme.colors.text.primary};
  }

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

const CoverImage = styled.img`
  width: 100%;
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

// Renders backend content: supports HTML (from rich text editor) and basic markdown fallback
function renderContent(content: string) {
  // If content already contains HTML tags, use as-is
  if (/<[a-z][\s\S]*>/i.test(content)) {
    return content;
  }
  // Otherwise, parse minimal markdown
  const html = content
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[h|u|o|l])(.+)$/gm, "$1");
  return `<p>${html}</p>`;
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const homeLabel = locale === "en" ? "Home" : locale === "ky" ? "Башкы бет" : "Главная";
  const blogLabel = locale === "en" ? "Blog" : "Блог";
  const recentLabel = locale === "en" ? "Recent Posts" : "Последние статьи";
  const categoriesLabel = locale === "en" ? "Categories" : "Категории";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: post.authorName
      ? { "@type": "Person", name: post.authorName }
      : { "@type": "Organization", name: "TomStore" },
    publisher: {
      "@type": "Organization",
      name: "TomStore",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/assets/images/logo.svg` },
    },
    url: `${SITE_URL}/${locale}/blog/${slug}`,
    ...(post.coverImageUrl
      ? { image: buildStorefrontImageUrl(post.coverImageUrl) }
      : {}),
  };

  return (
    <AppLayout>
      <Box pt="20px" pb="60px">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />

        <Breadcrumbs
          items={[
            { label: homeLabel, href: "/" },
            { label: blogLabel, href: "/blog" },
            { label: post.title },
          ]}
          locale={locale}
        />

        <Grid container spacing={6}>
          {/* Article */}
          <Grid item lg={9} xs={12}>
            <ArticleBody>
              <H1 mb="0.5rem" fontSize="26px">{post.title}</H1>
              <Paragraph color="text.muted" mb="2rem" fontSize="13px">
                {new Date(post.publishedAt).toLocaleDateString(
                  locale === "en" ? "en-US" : "ru-RU",
                  { year: "numeric", month: "long", day: "numeric" },
                )}
                {post.category && ` · ${post.category}`}
                {post.authorName && ` · ${post.authorName}`}
              </Paragraph>

              {post.coverImageUrl && (
                <CoverImage
                  src={buildStorefrontImageUrl(post.coverImageUrl)}
                  alt={post.title}
                />
              )}

              <div dangerouslySetInnerHTML={{ __html: renderContent(post.content) }} />
            </ArticleBody>
          </Grid>

          {/* Sidebar */}
          <Grid item lg={3} xs={12}>
            {post.recentPosts.length > 0 && (
              <SidebarCard borderRadius={12}>
                <SidebarTitle>{recentLabel}</SidebarTitle>
                {post.recentPosts.map((recent) => (
                  <RecentPostItem
                    key={recent.slug}
                    href={`/${locale}/blog/${recent.slug}`}
                  >
                    {recent.coverImageUrl ? (
                      <img
                        src={buildStorefrontImageUrl(recent.coverImageUrl)}
                        alt={recent.title}
                      />
                    ) : (
                      <img src="" alt="" style={{ background: "#f0f0f0" }} />
                    )}
                    <div className="text">
                      <div className="title">{recent.title}</div>
                      <div className="date">
                        {new Date(recent.publishedAt).toLocaleDateString(
                          locale === "en" ? "en-US" : "ru-RU",
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </div>
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
