import { create } from "zustand";

const STORAGE_KEY = "tomstore-color-scheme";

interface ThemeStore {
  isDark: boolean;
  toggle: () => void;
  init: () => void;
}

function applyTheme(isDark: boolean) {
  document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  isDark: false,

  init: () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored !== null ? stored === "dark" : prefersDark;
    applyTheme(isDark);
    set({ isDark });
  },

  toggle: () => {
    const next = !get().isDark;
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    set({ isDark: next });
  },
}));
