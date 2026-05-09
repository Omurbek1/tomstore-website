"use client";

// DarkModeProvider is kept as a no-op wrapper for backward compatibility.
// State is now managed by Zustand (src/store/themeStore.ts).
import type { PropsWithChildren } from "react";
import { useThemeStore } from "../store/themeStore";

export function DarkModeProvider({ children }: PropsWithChildren) {
  return <>{children}</>;
}

export function useDarkMode() {
  const isDark = useThemeStore((s) => s.isDark);
  const toggle = useThemeStore((s) => s.toggle);
  return { isDark, toggle };
}
