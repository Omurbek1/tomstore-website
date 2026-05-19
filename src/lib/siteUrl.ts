const CANONICAL_ORIGIN = "https://www.tomstore.kg";

const raw = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "");
const normalized = raw === "https://tomstore.kg" ? CANONICAL_ORIGIN : raw;

// Never let a deployment/preview URL leak into canonical tags.
// Only use the env var if it looks like a real custom domain.
export const SITE_URL =
  normalized && !normalized.includes("vercel.app") && !normalized.includes("localhost")
    ? normalized
    : CANONICAL_ORIGIN;
