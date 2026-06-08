import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import bundleAnalyzer from "@next/bundle-analyzer";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@tabler/icons-react", "antd", "lucide-react"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Sizes for product cards (thumbnail range) and medium views
    imageSizes: [64, 128, 256, 320, 480],
    // Sizes for hero/full-width images
    deviceSizes: [640, 828, 1080, 1280, 1920],
    // Cache optimized images for 30 days
    minimumCacheTTL: 2592000,
    remotePatterns: [
      { protocol: "http", hostname: "127.0.0.1", port: "3000", pathname: "/uploads/**" },
      { protocol: "http", hostname: "localhost", port: "3000", pathname: "/uploads/**" },
      { protocol: "https", hostname: "**", pathname: "/uploads/**" },
      // Cloudflare R2 public URLs (any subdomain)
      { protocol: "https", hostname: "*.r2.dev", pathname: "/**" },
      // Tomstore CDN/custom media domains
      { protocol: "https", hostname: "cdn.tomstore.kg", pathname: "/**" },
      { protocol: "https", hostname: "*.tomstore.kg", pathname: "/**" },
      // Video preview thumbnails only
      { protocol: "https", hostname: "img.youtube.com", pathname: "/**" },
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/**" },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.output = {
        ...config.output,
        environment: {
          arrowFunction: true,
          const: true,
          destructuring: true,
          dynamicImport: true,
          forOf: true,
          module: true,
          optionalChaining: true,
          templateLiteral: true,
        },
      };
    }
    return config;
  },
  async headers() {
    return [
      {
        source: "/:locale(ru|en|ky)/catalog",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=60, stale-while-revalidate=300",
          },
        ],
      },
      {
        source: "/:locale(ru|en|ky)/catalog/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=60, stale-while-revalidate=300",
          },
        ],
      },
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/api/uploads/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
