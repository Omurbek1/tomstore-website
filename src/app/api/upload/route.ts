import { type NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import path from "path";
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

export interface UploadSuccessResponse {
  url: string;
  key: string;
  folder: UploadFolder;
  size: number;
  type: string;
}

export interface UploadErrorResponse {
  error: string;
}

// ── CORS ─────────────────────────────────────────────────────────────────────

const ALLOWED_ORIGINS = new Set(
  [
    process.env.NEXT_PUBLIC_CRM_URL,           // e.g. http://localhost:5173
    process.env.NEXT_PUBLIC_SITE_URL,          // e.g. https://tomstore.kg
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

function buildKey(folder: UploadFolder, originalName: string): string {
  const ext = path.extname(originalName).toLowerCase() || ".jpg";
  const base = path.basename(originalName, path.extname(originalName));
  const slug = sanitizeFilename(base) || "image";
  return `${folder}/${randomUUID()}-${slug}${ext}`;
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
    const key = buildKey(folder, file.name);

    await r2.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET(),
        Key: key,
        Body: buffer,
        ContentType: file.type as AllowedMimeType,
        ContentLength: buffer.length,
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );

    const url = `${R2_PUBLIC_URL()}/${key}`;

    return NextResponse.json<UploadSuccessResponse>(
      { url, key, folder, size: file.size, type: file.type },
      { headers },
    );
  } catch (err) {
    console.error("[R2 Upload] Failed:", err);
    return NextResponse.json({ error: "Upload to storage failed" }, { status: 500, headers });
  }
}
