import type { MetadataRoute } from "next";
import { getProductSlugs, getBlogList } from "@utils/__api__/storefront";
import navigations from "@data/navigations";
import cities from "@data/cities";
import { ALL_REGIONS, GEO_CATEGORIES, MAJOR_CITIES } from "@data/geo";

import { SITE_URL } from "@lib/siteUrl";
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
  const staticPages = ["/", "/catalog", "/shops", "/blog", "/dostavka", "/contacts", "/about"];
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

  // Hyperlocal geo pages: region / district / geo×category
  for (const region of ALL_REGIONS) {
    // Oblast hub
    entries.push({
      url: `${SITE_URL}/ru/${region.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}/${region.slug}`])),
      },
    });

    for (const district of region.districts) {
      // District hub
      entries.push({
        url: `${SITE_URL}/ru/${region.slug}/${district.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.72,
        alternates: {
          languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}/${region.slug}/${district.slug}`])),
        },
      });

      // Geo × Category pages — both URL patterns
      for (const cat of GEO_CATEGORIES) {
        // Old style: /chuy/kant/noutbuki
        entries.push({
          url: `${SITE_URL}/ru/${region.slug}/${district.slug}/${cat.slug}`,
          lastModified: now, changeFrequency: "weekly", priority: 0.78,
          alternates: { languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}/${region.slug}/${district.slug}/${cat.slug}`])) },
        });
        // New style: /noutbuki/chuy/kant
        entries.push({
          url: `${SITE_URL}/ru/${cat.slug}/${region.slug}/${district.slug}`,
          lastModified: now, changeFrequency: "weekly", priority: 0.80,
          alternates: { languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}/${cat.slug}/${region.slug}/${district.slug}`])) },
        });
      }
    }
  }

  // Category/city pages: /noutbuki/bishkek
  for (const cat of GEO_CATEGORIES) {
    for (const city of MAJOR_CITIES) {
      entries.push({
        url: `${SITE_URL}/ru/${cat.slug}/${city.slug}`,
        lastModified: now, changeFrequency: "weekly", priority: 0.82,
        alternates: { languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}/${cat.slug}/${city.slug}`])) },
      });
    }
  }

  // City delivery pages
  for (const city of cities) {
    entries.push({
      url: `${SITE_URL}/ru/dostavka/${city.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((locale) => [locale, `${SITE_URL}/${locale}/dostavka/${city.slug}`]),
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
