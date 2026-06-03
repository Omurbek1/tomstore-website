import { PropsWithChildren } from "react";
import AppLayout from "@component/layout/main-layout";
import { AntdProvider } from "@lib/Provider";

// AntD монтируется только здесь (группа store), а не глобально на витрине —
// так AntD не попадает в критический бандл главной/каталога/товара.
export default function Layout({ children }: PropsWithChildren) {
  return (
    <AntdProvider>
      <AppLayout>{children}</AppLayout>
    </AntdProvider>
  );
}
