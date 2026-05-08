import { type NextRequest, NextResponse } from "next/server";

const getBackendUrl = () => {
  const url =
    process.env.BACKEND_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "http://127.0.0.1:3000";
  return url.replace(/\/+$/, "");
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const backendPath = `/uploads/${path.map(encodeURIComponent).join("/")}`;
  const url = `${getBackendUrl()}${backendPath}${request.nextUrl.search}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 * 60 },
    });

    if (!response.ok) {
      return new NextResponse(null, { status: response.status });
    }

    const headers = new Headers();
    const contentType = response.headers.get("content-type");
    const cacheControl = response.headers.get("cache-control");

    if (contentType) headers.set("content-type", contentType);
    headers.set(
      "cache-control",
      cacheControl || "public, max-age=3600, stale-while-revalidate=86400",
    );

    return new NextResponse(response.body, {
      status: response.status,
      headers,
    });
  } catch {
    return new NextResponse(null, { status: 502 });
  }
}
