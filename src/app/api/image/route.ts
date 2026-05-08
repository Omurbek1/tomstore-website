import sharp from "sharp";
import { type NextRequest, NextResponse } from "next/server";

const MAX_WIDTH = 1600;
const MIN_WIDTH = 64;
const DEFAULT_WIDTH = 800;
const DEFAULT_QUALITY = 78;

const clampNumber = (value: string | null, fallback: number, min: number, max: number) => {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, Math.round(number)));
};

const resolveSourceUrl = (request: NextRequest, source: string) => {
  if (/^https?:\/\//.test(source)) return source;
  if (source.startsWith("/api/uploads/")) return `${request.nextUrl.origin}${source}`;
  if (source.startsWith("/uploads/")) return `${request.nextUrl.origin}/api${source}`;
  return null;
};

export async function GET(request: NextRequest) {
  const source = request.nextUrl.searchParams.get("src");
  const url = source ? resolveSourceUrl(request, source) : null;

  if (!url) {
    return new NextResponse(null, { status: 400 });
  }

  const width = clampNumber(request.nextUrl.searchParams.get("w"), DEFAULT_WIDTH, MIN_WIDTH, MAX_WIDTH);
  const quality = clampNumber(request.nextUrl.searchParams.get("q"), DEFAULT_QUALITY, 45, 90);

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!response.ok) return new NextResponse(null, { status: response.status });

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.startsWith("image/")) {
      return new NextResponse(null, { status: 415 });
    }

    const input = Buffer.from(await response.arrayBuffer());
    const output = await sharp(input, { animated: false })
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();

    return new NextResponse(new Uint8Array(output), {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return new NextResponse(null, { status: 502 });
  }
}
