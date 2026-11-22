import { type NextRequest, NextResponse } from "next/server";

export const revalidate = 60;

const CACHE_CONTROL = "public, max-age=60, stale-while-revalidate=300";
const NO_STORE = { "Cache-Control": "no-store" };

// POST пропускаем только для заявок с сайта; всё остальное — read-only.
const POST_ALLOWED_PATHS = new Set(["requests"]);
const MAX_POST_BODY_BYTES = 16 * 1024;

const getBackendUrl = () => {
  const url = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:3000";
  return url.replace(/\/+$/, "");
};

// Секрет доверенного прокси (только серверный env). Бэкенд считает лимит
// витрины по x-storefront-client-ip, а без него доверенный прокси не режет.
const getProxySecret = () =>
  String(process.env.STOREFRONT_PROXY_SECRET || process.env.REVALIDATE_SECRET || "").trim();

const getClientIp = (request: NextRequest) => {
  const raw =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "";
  const ip = raw.trim();
  return /^[0-9a-fA-F:.]{2,45}$/.test(ip) ? ip : "";
};

// Подсказки поиска — по запросу посетителя, кэшем почти не покрываются:
// для них передаём IP посетителя (лимит per-visitor). Остальные GET идут в
// общий 60-с кэш fetch — заголовки входят в ключ кэша, IP разбил бы кэш на
// посетителей, поэтому их шлём только с пометкой прокси (как SSR/ISR).
const isPerVisitorGet = (path: string[]) => path[0] === "search";

const buildProxyHeaders = (request: NextRequest, withClientIp: boolean) => {
  const headers: Record<string, string> = {};
  const secret = getProxySecret();
  if (secret) headers["x-storefront-proxy"] = secret;
  const ip = withClientIp ? getClientIp(request) : "";
  if (ip) headers["x-storefront-client-ip"] = ip;
  return headers;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const backendPath = `/storefront/${path.join("/")}`;
  const search = request.nextUrl.search;
  const url = `${getBackendUrl()}${backendPath}${search}`;

  try {
    const response = await fetch(url, {
      headers: buildProxyHeaders(request, isPerVisitorGet(path)),
      // Тот же тег, что у серверных запросов витрины: /api/revalidate сбрасывает
      // и кэш прокси (цены филиалов на клиенте не застревают на 60 с).
      next: { revalidate: 60, tags: ["storefront"] },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Backend request failed", status: response.status },
        { status: response.status, headers: { "Cache-Control": "no-cache" } },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": CACHE_CONTROL,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to reach backend" },
      { status: 502, headers: { "Cache-Control": "no-cache" } },
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const joined = path.join("/");
  if (!POST_ALLOWED_PATHS.has(joined)) {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405, headers: NO_STORE });
  }

  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > MAX_POST_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413, headers: NO_STORE });
  }

  const body = await request.text();
  if (Buffer.byteLength(body, "utf8") > MAX_POST_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413, headers: NO_STORE });
  }

  try {
    JSON.parse(body || "{}");
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400, headers: NO_STORE });
  }

  try {
    const response = await fetch(`${getBackendUrl()}/storefront/${joined}`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...buildProxyHeaders(request, true),
        "User-Agent": request.headers.get("user-agent") || "tomstore-website",
      },
      body: body || "{}",
    });

    const text = await response.text();
    return new NextResponse(text || "{}", {
      status: response.status,
      headers: {
        ...NO_STORE,
        "Content-Type": response.headers.get("content-type") || "application/json",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to reach backend" }, { status: 502, headers: NO_STORE });
  }
}
