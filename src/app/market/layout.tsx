import type { PropsWithChildren } from "react";
import StyledComponentsRegistry from "@lib/registry";
import { ThemeProvider } from "theme";
import { Provider } from "@lib/Provider";
import AppLayout from "@component/layout/layout-1";
import Navbar from "@component/navbar/Navbar";

export const dynamic = "force-dynamic";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <StyledComponentsRegistry>
      <Provider>
        <ThemeProvider>
          <AppLayout navbar={<Navbar navListOpen />}>{children}</AppLayout>
        </ThemeProvider>
      </Provider>
    </StyledComponentsRegistry>
  );
}
