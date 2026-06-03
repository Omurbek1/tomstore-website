"use client";

import { type FC, type PropsWithChildren, useState } from "react";
import dynamic from "next/dynamic";
import { App as AntdApp, ConfigProvider, theme as antdTheme } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDarkMode } from "@context/DarkModeContext";
import {
  STOREFRONT_DEFAULT_GC_TIME_MS,
  STOREFRONT_DEFAULT_STALE_TIME_MS,
} from "@utils/__api__/storefront";

const ReactQueryDevtools =
  process.env.NODE_ENV === "development"
    ? dynamic(
        () => import("@tanstack/react-query-devtools").then((m) => ({ default: m.ReactQueryDevtools })),
        { ssr: false },
      )
    : null;

// Глобальный провайдер витрины — только React Query, без AntD.
// AntD вынесен в отдельный <AntdProvider>, который монтируется лишь на
// маршрутах группы (store) (дашборд/чекаут/вендор), чтобы AntD не попадал
// в критический бандл страниц витрины (главная/каталог/товар).
const Provider: FC<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: STOREFRONT_DEFAULT_STALE_TIME_MS,
            gcTime: STOREFRONT_DEFAULT_GC_TIME_MS,
            refetchOnWindowFocus: false,
            experimental_prefetchInRender: true,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {ReactQueryDevtools ? <ReactQueryDevtools /> : null}
    </QueryClientProvider>
  );
};

// AntD ConfigProvider + App. Монтируется только в layout'ах группы (store).
const AntdProvider: FC<PropsWithChildren> = ({ children }) => {
  const { isDark } = useDarkMode();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: isDark
          ? {
              colorPrimary:          "#C81E3A",
              colorInfo:             "#4E97FD",
              colorSuccess:          "#28dc64",
              colorWarning:          "#FFCD4E",
              colorError:            "#ff4d6a",
              colorText:             "#e0e6f5",
              colorTextSecondary:    "#8896be",
              colorTextTertiary:     "#6a7898",
              colorBgLayout:         "#080b12",
              colorBgContainer:      "#10141f",
              colorBgElevated:       "#141a2f",
              colorBgSpotlight:      "#1a2140",
              colorBorder:           "#222a42",
              colorBorderSecondary:  "#192036",
              colorFill:             "rgba(255,255,255,0.06)",
              colorFillSecondary:    "rgba(255,255,255,0.04)",
              colorFillTertiary:     "rgba(255,255,255,0.02)",
              colorSplit:            "#192036",
              borderRadius:          12,
              borderRadiusSM:        8,
              borderRadiusLG:        16,
              fontFamily:            "inherit",
              fontSize:              14,
              lineHeight:            1.5714,
              boxShadow:             "0 4px 24px rgba(0,0,0,0.45)",
              boxShadowSecondary:    "0 2px 12px rgba(0,0,0,0.35)",
            }
          : {
              colorPrimary:          "#C81E3A",
              colorInfo:             "#4E97FD",
              colorSuccess:          "#1a9e4e",
              colorWarning:          "#e8a200",
              colorError:            "#C81E3A",
              colorText:             "#2B3445",
              colorTextSecondary:    "#4B566B",
              colorTextTertiary:     "#7D879C",
              colorBgLayout:         "#f5f6f9",
              colorBgContainer:      "#ffffff",
              colorBgElevated:       "#ffffff",
              colorBorder:           "#DAE1E7",
              colorBorderSecondary:  "#E3E9EF",
              colorFill:             "rgba(0,0,0,0.04)",
              colorFillSecondary:    "rgba(0,0,0,0.02)",
              colorSplit:            "#E3E9EF",
              borderRadius:          12,
              borderRadiusSM:        8,
              borderRadiusLG:        16,
              fontFamily:            "inherit",
              fontSize:              14,
              lineHeight:            1.5714,
              boxShadow:             "0 2px 16px rgba(0,0,0,0.08)",
              boxShadowSecondary:    "0 1px 8px rgba(0,0,0,0.06)",
            },
        components: {
          Button: {
            borderRadius:       10,
            borderRadiusSM:     8,
            controlHeight:      40,
            controlHeightSM:    32,
            fontWeight:         600,
            primaryShadow:      "none",
            defaultShadow:      "none",
            dangerShadow:       "none",
          },
          Card: {
            borderRadiusLG:     16,
            paddingLG:          20,
          },
          Input: {
            borderRadius:       10,
            controlHeight:      42,
          },
          Select: {
            borderRadius:       10,
            controlHeight:      42,
          },
          Drawer: {
            borderRadiusLG:     20,
          },
          Modal: {
            borderRadiusLG:     20,
          },
          Table: {
            borderRadiusLG:     14,
            headerBorderRadius: 14,
          },
          Tabs: {
            itemColor:        isDark ? "#8896be" : "#4B566B",
            itemHoverColor:   isDark ? "#e0e6f5" : "#2B3445",
            itemSelectedColor: isDark ? "#ff6b83" : "#C81E3A",
            inkBarColor:      isDark ? "#ff6b83" : "#C81E3A",
            cardBg:           isDark ? "#141a2f"  : "#f5f6f9",
          },
          Form: {
            labelColor:   isDark ? "#a8b4d0" : "#4B566B",
            labelFontSize: 13,
          },
          Checkbox: {
            borderRadiusSM: 5,
          },
        },
      }}
    >
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  );
};

export { Provider, AntdProvider };
