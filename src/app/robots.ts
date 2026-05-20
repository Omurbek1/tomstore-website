import type { MetadataRoute } from "next";

import { SITE_URL } from "@lib/siteUrl";

const PRIVATE_PATHS = [
  "/api/",
  "/cart",
  "/checkout",
  "/payment",
  "/orders",
  "/profile",
  "/address",
  "/payment-methods",
  "/support-tickets",
  "/vendor/",
];

const LOCALES = ["ru", "en", "ky"] as const;
const AI_CRAWLER_USER_AGENTS = [
  "Amazonbot",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "ClaudeBot",
  "CloudflareBrowserRenderingCrawler",
  "Google-Extended",
  "GPTBot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...PRIVATE_PATHS,
    ...LOCALES.flatMap((locale) =>
      PRIVATE_PATHS.map((path) => `/${locale}${path}`),
    ),
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/*.js", "/*.css"],
        disallow,
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/assets/", "/_next/"],
      },
      ...AI_CRAWLER_USER_AGENTS.map((userAgent) => ({
        userAgent,
        disallow: ["/"],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
