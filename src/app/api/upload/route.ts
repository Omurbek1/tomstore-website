import { type NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import path from "path";
import sharp from "sharp";
import {
  r2,
  R2_BUCKET,
  R2_PUBLIC_URL,
  ALLOWED_MIME_TYPES,
  UPLOAD_FOLDERS,
  MAX_FILE_SIZE,
  type AllowedMimeType,
  type UploadFolder,
} from "lib/r2";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface UploadSuccessResponse {
  url: string;
  key: string;
  folder: UploadFolder;
  size: number;
  type: string;
  urls: {
    thumb?: string;
    medium?: string;
    large?: string;
    original?: string;
  };
}

export interface UploadErrorResponse {
  error: string;
}

// ── Variant config ────────────────────────────────────────────────────────────

type Variant = {
  suffix: "thumb-300" | "medium-800" | "large-1400" | "original";
  maxDim: number | null; // null = preserve original dimensions
  quality: number;
  format: "webp" | "avif";
};

const PRODUCT_VARIANTS: Variant[] = [
  { suffix: "thumb-300",  maxDim: 300,  quality: 82, format: "webp" },
  { suffix: "medium-800", maxDim: 800,  quality: 82, format: "webp" },
  { suffix: "large-1400", maxDim: 1400, quality: 90, format: "webp" },
  { suffix: "original",   maxDim: null, quality: 90, format: "webp" },
];

// Banners and categories get AVIF for the large/original sizes (better compression for heroes)
const BANNER_VARIANTS: Variant[] = [
  { suffix: "thumb-300",  maxDim: 300,  quality: 82, format: "webp" },
  { suffix: "medium-800", maxDim: 800,  quality: 82, format: "webp" },
  { suffix: "original",   maxDim: null, quality: 80, format: "avif" },
];

// Avatars: single small WebP
const AVATAR_VARIANTS: Variant[] = [
  { suffix: "thumb-300", maxDim: 200, quality: 85, format: "webp" },
];

function getVariants(folder: UploadFolder): Variant[] {
  if (folder === "banners" || folder === "categories") return BANNER_VARIANTS;
  if (folder === "avatars") return AVATAR_VARIANTS;
  return PRODUCT_VARIANTS;
}

// ── CORS ─────────────────────────────────────────────────────────────────────

const ALLOWED_ORIGINS = new Set(
  [
    process.env.NEXT_PUBLIC_CRM_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
    "http://localhost:5173",
    "http://localhost:3001",
  ].filter(Boolean) as string[],
);

function corsHeaders(origin: string | null): Record<string, string> {
  const allowed =
    origin && ALLOWED_ORIGINS.has(origin) ? origin : [...ALLOWED_ORIGINS][0] ?? "*";
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(request.headers.get("origin")),
  });
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function sanitizeFilename(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

async function processAndUpload(
  sharpInput: sharp.Sharp,
  variant: Variant,
  folder: UploadFolder,
  uuid: string,
  slug: string,
  bucket: string,
  publicUrl: string,
): Promise<{ suffix: string; url: string; key: string }> {
  let pipeline = sharpInput.clone();

  if (variant.maxDim) {
    pipeline = pipeline.resize(variant.maxDim, variant.maxDim, {
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  let buffer: Buffer;
  let contentType: string;

  if (variant.format === "avif") {
    buffer = await pipeline.avif({ quality: variant.quality }).toBuffer();
    contentType = "image/avif";
  } else {
    buffer = await pipeline.webp({ quality: variant.quality }).toBuffer();
    contentType = "image/webp";
  }

  const key = `${folder}/${variant.suffix}/${uuid}-${slug}.${variant.format}`;

  await r2.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType as AllowedMimeType,
      ContentLength: buffer.length,
      CacheControl: "public, max-age=31536000, immutable",
      ContentDisposition: "inline",
    }),
  );

  return { suffix: variant.suffix, url: `${publicUrl}/${key}`, key };
}

// ── POST /api/upload ──────────────────────────────────────────────────────────

export async function POST(
  request: NextRequest,
): Promise<NextResponse<UploadSuccessResponse | UploadErrorResponse>> {
  const origin = request.headers.get("origin");
  const headers = corsHeaders(origin);

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid multipart/form-data" }, { status: 400, headers });
  }

  const file = formData.get("file") as File | null;
  const rawFolder = (formData.get("folder") as string | null) ?? "products";

  if (!file || file.size === 0) {
    return NextResponse.json({ error: "No file provided" }, { status: 400, headers });
  }

  if (!(ALLOWED_MIME_TYPES as readonly string[]).includes(file.type)) {
    return NextResponse.json(
      { error: `Invalid file type: ${file.type}. Allowed: ${ALLOWED_MIME_TYPES.join(", ")}` },
      { status: 415, headers },
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Max: 10 MB` },
      { status: 413, headers },
    );
  }

  if (!(UPLOAD_FOLDERS as readonly string[]).includes(rawFolder)) {
    return NextResponse.json(
      { error: `Invalid folder. Allowed: ${UPLOAD_FOLDERS.join(", ")}` },
      { status: 400, headers },
    );
  }

  const folder = rawFolder as UploadFolder;

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uuid = randomUUID();
    const base = path.basename(file.name, path.extname(file.name));
    const slug = sanitizeFilename(base) || "image";

    const sharpInput = sharp(buffer);
    const variants = getVariants(folder);
    const bucket = R2_BUCKET();
    const publicUrl = R2_PUBLIC_URL();

    // Process and upload all variants in parallel
    const results = await Promise.all(
      variants.map((variant) =>
        processAndUpload(sharpInput, variant, folder, uuid, slug, bucket, publicUrl),
      ),
    );

    const urlMap: UploadSuccessResponse["urls"] = {};
    for (const result of results) {
      if (result.suffix === "thumb-300") urlMap.thumb = result.url;
      else if (result.suffix === "medium-800") urlMap.medium = result.url;
      else if (result.suffix === "large-1400") urlMap.large = result.url;
      else if (result.suffix === "original") urlMap.original = result.url;
    }

    // url = thumb (catalog default); fall back to original for folders without thumb
    const url = urlMap.thumb ?? urlMap.original ?? results[0].url;
    const primaryKey = results[0].key;

    return NextResponse.json<UploadSuccessResponse>(
      { url, key: primaryKey, folder, size: file.size, type: file.type, urls: urlMap },
      { headers },
    );
  } catch (err) {
    console.error("[R2 Upload] Failed:", err);
    return NextResponse.json({ error: "Upload to storage failed" }, { status: 500, headers });
  }
}
