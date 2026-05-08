import type { MetadataRoute } from "next";
import { getProductSlugs, getBlogList } from "@utils/__api__/storefront";
import navigations from "@data/navigations";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tomstore.kg";
const LOCALES = ["ru", "en", "ky"] as const;

const collectCatalogHrefs = () => {
  const hrefs = new Set<string>();
  for (const nav of navigations) {
    hrefs.add(nav.href);
    for (const cat of nav.menuData?.categories || []) {
      hrefs.add(cat.href);
      for (const sub of cat.subCategories || []) {
        hrefs.add(sub.href);
      }
    }
  }
  return Array.from(hrefs);
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  const staticPages = ["/", "/catalog", "/shops", "/blog"];
  for (const page of staticPages) {
    entries.push({
      url: `${SITE_URL}/ru${page === "/" ? "" : page}`,
      lastModified: now,
      changeFrequency: page === "/" ? "daily" : "weekly",
      priority: page === "/" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((locale) => [locale, `${SITE_URL}/${locale}${page === "/" ? "" : page}`]),
        ),
      },
    });
  }

  // Catalog category pages from navigation
  const catalogHrefs = collectCatalogHrefs();
  for (const href of catalogHrefs) {
    entries.push({
      url: `${SITE_URL}/ru${href}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((locale) => [locale, `${SITE_URL}/${locale}${href}`]),
        ),
      },
    });
  }

  // Blog posts
  try {
    const blogData = await getBlogList();
    for (const post of blogData.items) {
      entries.push({
        url: `${SITE_URL}/ru/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((locale) => [locale, `${SITE_URL}/${locale}/blog/${post.slug}`]),
          ),
        },
      });
    }
  } catch {
    // sitemap works even if blog fetch fails
  }

  // Product pages
  try {
    const slugs = await getProductSlugs();
    for (const { slug } of slugs) {
      entries.push({
        url: `${SITE_URL}/ru/product/${slug}`,
        lastModified: now,
        changeFrequency: "daily",
        priority: 0.9,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((locale) => [locale, `${SITE_URL}/${locale}/product/${slug}`]),
          ),
        },
      });
    }
  } catch {
    // sitemap works even if product fetch fails
  }

  return entries;
}
