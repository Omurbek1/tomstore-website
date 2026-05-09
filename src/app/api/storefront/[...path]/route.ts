import { type NextRequest, NextResponse } from "next/server";

export const revalidate = 60;

const CACHE_CONTROL = "public, max-age=60, stale-while-revalidate=300";

const getBackendUrl = () => {
  const url = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:3000";
  return url.replace(/\/+$/, "");
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
      next: { revalidate: 60 },
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
