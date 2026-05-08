import { PropsWithChildren } from "react";
import StyledComponentsRegistry from "@lib/registry";
import { ThemeProvider } from "theme";
import { Provider } from "@lib/Provider";
import AppLayout from "@component/layout/layout-3";

export const dynamic = "force-dynamic";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <StyledComponentsRegistry>
      <Provider>
        <ThemeProvider>
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>
      </Provider>
    </StyledComponentsRegistry>
  );
}
