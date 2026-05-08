import type { MetadataRoute } from "next";

import { SITE_URL } from "@lib/siteUrl";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
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
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
