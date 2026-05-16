import { S3Client } from "@aws-sdk/client-s3";

const required = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
};

export const r2 = new S3Client({
  region: "auto",
  endpoint: required("R2_ENDPOINT"),
  credentials: {
    accessKeyId: required("R2_ACCESS_KEY_ID"),
    secretAccessKey: required("R2_SECRET_ACCESS_KEY"),
  },
});

export const R2_BUCKET = () => required("R2_BUCKET");
export const R2_PUBLIC_URL = () => required("R2_PUBLIC_URL").replace(/\/$/, "");

export type UploadFolder = "products" | "banners" | "categories" | "avatars";

export const UPLOAD_FOLDERS = [
  "products",
  "banners",
  "categories",
  "avatars",
] as const satisfies readonly UploadFolder[];

export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
] as const;

export type AllowedMimeType = (typeof ALLOWED_MIME_TYPES)[number];

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
