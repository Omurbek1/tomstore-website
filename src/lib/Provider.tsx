"use client";

import { type FC, type PropsWithChildren, useState } from "react";
import dynamic from "next/dynamic";
import { App as AntdApp, ConfigProvider, theme as antdTheme } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDarkMode } from "@context/DarkModeContext";

const ReactQueryDevtools =
  process.env.NODE_ENV === "development"
    ? dynamic(
        () => import("@tanstack/react-query-devtools").then((m) => ({ default: m.ReactQueryDevtools })),
        { ssr: false },
      )
    : null;

const Provider: FC<PropsWithChildren> = ({ children }) => {
  const { isDark } = useDarkMode();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: 60 * 1000,
            gcTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
            experimental_prefetchInRender: true,
          },
        },
      }),
  );

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: isDark
          ? {
              colorPrimary: "#C81E3A",
              colorInfo: "#C81E3A",
              colorSuccess: "#28dc64",
              colorWarning: "#FFCD4E",
              colorError: "#ff4d6a",
              colorText: "#e0e6f5",
              colorTextSecondary: "#8896be",
              colorBgLayout: "#080b12",
              colorBgContainer: "#10141f",
              colorBgElevated: "#141a2f",
              colorBorder: "#222a42",
              colorBorderSecondary: "#192036",
              borderRadius: 12,
              fontFamily: "inherit",
            }
          : {
              colorPrimary: "#E94560",
              colorInfo: "#E94560",
              colorSuccess: "#0F9D58",
              colorWarning: "#FFCD4E",
              colorError: "#D23F57",
              colorText: "#2B3445",
              colorTextSecondary: "#7D879C",
              colorBgLayout: "#F6F9FC",
              colorBgContainer: "#FFFFFF",
              borderRadius: 12,
              fontFamily: "inherit",
            },
        components: {
          Button: { borderRadius: 10, controlHeight: 40 },
          Card:   { borderRadiusLG: 16 },
          Input:  { borderRadius: 10 },
          Select: { borderRadius: 10 },
        },
      }}
    >
      <AntdApp>
        <QueryClientProvider client={queryClient}>
          {children}
          {ReactQueryDevtools ? <ReactQueryDevtools /> : null}
        </QueryClientProvider>
      </AntdApp>
    </ConfigProvider>
  );
};

export { Provider };
