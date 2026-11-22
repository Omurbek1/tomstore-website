"use client";

import { useSyncExternalStore } from "react";

/**
 * Выбранный посетителем магазин (филиал) хранится в cookie `tomstore_branch`
 * на 1 год. Серверные компоненты cookie НЕ читают — страницы остаются
 * статическими (ISR) и рендерятся с ценами филиала по умолчанию; цены
 * выбранного филиала подменяются на клиенте.
 */
export const BRANCH_COOKIE = "tomstore_branch";
const ONE_YEAR_SECONDS = 365 * 24 * 60 * 60;
const UUID_LIKE = /^[0-9a-zA-Z-]{1,64}$/;

const listeners = new Set<() => void>();

export function readBranchCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((part) => part.startsWith(`${BRANCH_COOKIE}=`));
  if (!match) return null;
  let value = match.slice(BRANCH_COOKIE.length + 1);
  try {
    value = decodeURIComponent(value);
  } catch {
    return null;
  }
  return UUID_LIKE.test(value) ? value : null;
}

export function writeBranchCookie(branchId: string | null) {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; secure" : "";
  document.cookie = branchId
    ? `${BRANCH_COOKIE}=${encodeURIComponent(branchId)}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax${secure}`
    : `${BRANCH_COOKIE}=; path=/; max-age=0; samesite=lax${secure}`;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** null на сервере и при гидрации (совпадает с SSR), затем — значение cookie. */
export function useBranchCookie(): string | null {
  return useSyncExternalStore(subscribe, readBranchCookie, () => null);
}
