"use client";

import { type FC, type PropsWithChildren, useState } from "react";
import dynamic from "next/dynamic";
import { App as AntdApp, ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ReactQueryDevtools =
  process.env.NODE_ENV === "development"
    ? dynamic(
        () => import("@tanstack/react-query-devtools").then((m) => ({ default: m.ReactQueryDevtools })),
        { ssr: false },
      )
    : null;

export const Provider: FC<PropsWithChildren> = ({ children }) => {
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
        token: {
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
          fontFamily: "inherit"
        },
        components: {
          Button: {
            borderRadius: 10,
            controlHeight: 40
          },
          Card: {
            borderRadiusLG: 16
          },
          Input: {
            borderRadius: 10
          },
          Select: {
            borderRadius: 10
          }
        }
      }}>
      <AntdApp>
        <QueryClientProvider client={queryClient}>
          {children}
          {ReactQueryDevtools ? <ReactQueryDevtools /> : null}
        </QueryClientProvider>
      </AntdApp>
    </ConfigProvider>
  );
};
