"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useImageUpload } from "hooks/useImageUpload";
import type { UploadFolder } from "lib/r2";

const ACCEPTED_TYPES = "image/jpeg,image/jpg,image/png,image/webp,image/gif,image/avif";
const MAX_MB = 10;

interface Props {
  folder?: UploadFolder;
  onUploaded?: (url: string, key: string) => void;
  defaultUrl?: string;
  label?: string;
  className?: string;
}

export function ImageUploader({
  folder = "products",
  onUploaded,
  defaultUrl,
  label = "Загрузить изображение",
  className = "",
}: Props) {
  const { url, isUploading, error, progress, upload, reset } =
    useImageUpload(folder);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const displayUrl = url ?? defaultUrl ?? null;

  const handleFile = useCallback(
    async (file: File) => {
      if (file.size > MAX_MB * 1024 * 1024) return;
      const result = await upload(file);
      if (result) onUploaded?.(result.url, result.key);
    },
    [upload, onUploaded],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div
        role="button"
        tabIndex={0}
        aria-label={label}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        className={[
          "relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center gap-2",
          "rounded-xl border-2 border-dashed transition-colors",
          dragOver
            ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
            : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/40 dark:border-slate-600 dark:bg-slate-900/40",
        ].join(" ")}
      >
        {displayUrl ? (
          <Image
            src={displayUrl}
            alt="Preview"
            fill
            className="rounded-xl object-contain p-2"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <>
            <svg
              className="h-10 w-10 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              {label}
            </span>
            <span className="text-xs text-slate-400">
              JPEG, PNG, WebP, AVIF · до {MAX_MB} МБ
            </span>
          </>
        )}

        {isUploading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl bg-white/80 dark:bg-slate-900/80">
            <div className="h-1.5 w-48 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-slate-500">Загрузка…</span>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES}
        className="hidden"
        onChange={handleChange}
      />

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </p>
      )}

      {displayUrl && (
        <div className="flex items-center gap-2">
          <span className="min-w-0 flex-1 truncate rounded-lg bg-slate-100 px-3 py-1.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {displayUrl}
          </span>
          <button
            type="button"
            onClick={reset}
            className="shrink-0 rounded-lg border border-slate-200 px-2 py-1.5 text-xs text-slate-500 hover:border-red-300 hover:text-red-500 dark:border-slate-600"
          >
            Сбросить
          </button>
        </div>
      )}
    </div>
  );
}

// ── Example: product image upload in a form ──────────────────────────────────

export function ProductImageUploadExample() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="mx-auto max-w-md space-y-4 p-6">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        Загрузка фото товара
      </h2>

      <ImageUploader
        folder="products"
        label="Перетащите или нажмите для выбора фото товара"
        onUploaded={(url) => setImageUrl(url)}
      />

      {imageUrl && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-800 dark:bg-emerald-950/30">
          <p className="mb-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
            Изображение загружено в R2:
          </p>
          <a
            href={imageUrl}
            target="_blank"
            rel="noreferrer"
            className="break-all text-xs text-emerald-600 underline dark:text-emerald-400"
          >
            {imageUrl}
          </a>
        </div>
      )}
    </div>
  );
}
