import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogSlugs, buildStorefrontImageUrl } from "@utils/__api__/storefront";
import BlogPostPageClient from "./BlogPostPageClient";

import { SITE_URL } from "@lib/siteUrl";

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

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  return <BlogPostPageClient post={post} locale={locale} />;
}
