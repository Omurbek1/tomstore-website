"use client";

import { useState, useCallback } from "react";
import type { UploadFolder } from "lib/r2";
import type {
  UploadSuccessResponse,
  UploadErrorResponse,
} from "app/api/upload/route";

export interface UploadState {
  url: string | null;
  key: string | null;
  isUploading: boolean;
  error: string | null;
  progress: number;
}

const initialState: UploadState = {
  url: null,
  key: null,
  isUploading: false,
  error: null,
  progress: 0,
};

export function useImageUpload(folder: UploadFolder = "products") {
  const [state, setState] = useState<UploadState>(initialState);

  const upload = useCallback(
    async (file: File): Promise<UploadSuccessResponse | null> => {
      setState({ ...initialState, isUploading: true, progress: 10 });

      const form = new FormData();
      form.append("file", file);
      form.append("folder", folder);

      try {
        setState((s) => ({ ...s, progress: 40 }));

        const res = await fetch("/api/upload", {
          method: "POST",
          body: form,
        });

        setState((s) => ({ ...s, progress: 80 }));

        const data = (await res.json()) as
          | UploadSuccessResponse
          | UploadErrorResponse;

        if (!res.ok || "error" in data) {
          const message =
            "error" in data ? data.error : `Upload failed (${res.status})`;
          setState({ ...initialState, error: message });
          return null;
        }

        setState({
          url: data.url,
          key: data.key,
          isUploading: false,
          error: null,
          progress: 100,
        });

        return data;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Network error during upload";
        setState({ ...initialState, error: message });
        return null;
      }
    },
    [folder],
  );

  const reset = useCallback(() => setState(initialState), []);

  return { ...state, upload, reset };
}
