import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@tabler/icons-react", "antd", "lucide-react"],
  },
  images: {
    unoptimized: true,
  },
  compiler: {
    styledComponents: true,
  },
};

export default withNextIntl(nextConfig);
