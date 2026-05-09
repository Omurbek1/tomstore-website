"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

const STORAGE_KEY = "tomstore-color-scheme";

interface DarkModeCtx {
  isDark: boolean;
  toggle: () => void;
}

const DarkModeContext = createContext<DarkModeCtx>({ isDark: false, toggle: () => {} });

export function DarkModeProvider({ children }: PropsWithChildren) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(stored !== null ? stored === "dark" : prefersDark);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
  }, [isDark, mounted]);

  const toggle = useCallback(() => setIsDark((v) => !v), []);

  return (
    <DarkModeContext.Provider value={{ isDark, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}
