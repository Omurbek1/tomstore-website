import type { ReactNode } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";

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
