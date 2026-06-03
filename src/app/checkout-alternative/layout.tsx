import { PropsWithChildren } from "react";
import StyledComponentsRegistry from "@lib/registry";
import { ThemeProvider } from "theme";
import { Provider, AntdProvider } from "@lib/Provider";
import ShopLayout from "@component/layout/alt-layout";

// This route is served without the [locale] layout wrapper, so it needs
// its own provider stack. Actual requests are redirected to /[locale]/checkout-alternative
// by middleware, so this only runs if accessed directly (skip static prerender).
export const dynamic = "force-dynamic";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <StyledComponentsRegistry>
      <Provider>
        <ThemeProvider>
          {/* checkout-alternative использует AntD (CheckoutForm2) — монтируем ConfigProvider */}
          <AntdProvider>
            <ShopLayout showNavbar={false}>{children}</ShopLayout>
          </AntdProvider>
        </ThemeProvider>
      </Provider>
    </StyledComponentsRegistry>
  );
}
