const CANONICAL_ORIGIN = "https://tomstore.kg";

const raw = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "");

// Never let a deployment/preview URL leak into canonical tags.
// Only use the env var if it looks like a real custom domain.
export const SITE_URL =
  raw && !raw.includes("vercel.app") && !raw.includes("localhost")
    ? raw
    : CANONICAL_ORIGIN;
