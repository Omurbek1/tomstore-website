const raw = process.env.NEXT_PUBLIC_SITE_URL || "";
// Never let a Vercel preview/deployment URL become the canonical origin.
export const SITE_URL =
  !raw || raw.includes(".vercel.app") ? "https://tomstore.kg" : raw.replace(/\/+$/, "");
