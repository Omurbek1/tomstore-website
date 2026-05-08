export const getOptimizedImageSrc = (
  src: string | undefined | null,
  width: number,
  quality = 78,
) => {
  const value = String(src || "").trim();
  if (!value) return value;
  if (value.startsWith("data:")) return value;
  if (value.startsWith("/assets/")) return value;

  const isRemote = /^https?:\/\//.test(value);
  const isUploadProxy = value.startsWith("/api/uploads/") || value.startsWith("/uploads/");
  if (!isRemote && !isUploadProxy) return value;

  const params = new URLSearchParams({
    src: value,
    w: String(width),
    q: String(quality),
  });

  return `/api/image?${params.toString()}`;
};
