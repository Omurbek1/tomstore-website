"use client";

import { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import { useDarkMode } from "@context/DarkModeContext";
import GlobalStyles from "./GlobalStyles";
import getThemeOptions from "./themeOptions";
import { darkColors } from "./colors";

export default function ThemeProvider({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const { isDark } = useDarkMode();
  const baseTheme = getThemeOptions(pathname);

  const theme = {
    ...baseTheme,
    isDark,
    colors: isDark ? darkColors : baseTheme.colors,
  };

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </StyledThemeProvider>
  );
}
