import type { ReactNode } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
// @ts-ignore
import "slick-carousel/slick/slick.css";
// @ts-ignore
import "slick-carousel/slick/slick-theme.css";
// @ts-ignore
import "./globals.css";

export const dynamic = "force-dynamic";
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
