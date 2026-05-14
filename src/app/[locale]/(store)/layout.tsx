import { PropsWithChildren } from "react";
import AppLayout from "@component/layout/main-layout";

export default function Layout({ children }: PropsWithChildren) {
  return <AppLayout>{children}</AppLayout>;
}
