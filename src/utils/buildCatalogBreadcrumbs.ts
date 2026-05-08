import type { BreadcrumbItem } from "@component/seo/Breadcrumbs";
import navigations from "@data/navigations";

type FlatLink = { href: string; titleKey: string };

const flattenNavigations = (): FlatLink[] => {
  const links: FlatLink[] = [];
  for (const nav of navigations) {
    links.push({ href: nav.href, titleKey: nav.titleKey });
    for (const cat of nav.menuData?.categories || []) {
      links.push({ href: cat.href, titleKey: cat.titleKey });
      for (const sub of cat.subCategories || []) {
        links.push({ href: sub.href, titleKey: sub.titleKey });
      }
    }
  }
  return links;
};

const NAV_LINKS = flattenNavigations();

// Resolves a titleKey like "nav.laptops" → localized label via a t() function
export const buildCatalogBreadcrumbs = (
  segments: string[],
  homeLabel: string,
  t: (key: string) => string,
): BreadcrumbItem[] => {
  const items: BreadcrumbItem[] = [{ label: homeLabel, href: "/" }];

  // Build cumulative path to resolve parent + child labels
  let path = "";
  for (const segment of segments) {
    path = `${path}/catalog/${segment}`.replace("//catalog", "/catalog");
    const link = NAV_LINKS.find((l) => l.href === path);
    const label = link ? tryTranslate(t, link.titleKey) : prettifySegment(segment);
    items.push({ label, href: path });
  }

  // Remove href from the last item (current page)
  if (items.length > 0) {
    delete items[items.length - 1].href;
  }

  return items;
};

const tryTranslate = (t: (key: string) => string, key: string): string => {
  try {
    return t(key);
  } catch {
    return prettifySegment(key.split(".").pop() || key);
  }
};

const prettifySegment = (seg: string) =>
  seg.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
