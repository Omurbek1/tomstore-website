import { PropsWithChildren } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import StyledComponentsRegistry from "@lib/registry";
import { ThemeProvider } from "theme";
import { Provider } from "@lib/Provider";
import { DarkModeProvider } from "@context/DarkModeContext";
import AppLayout from "@component/layout/layout-3";

export const dynamic = "force-dynamic";

export default async function Layout({ children }: PropsWithChildren) {
  const messages = await getMessages();
  return (
    <StyledComponentsRegistry>
      <DarkModeProvider>
        <Provider>
          <ThemeProvider>
            <NextIntlClientProvider locale="ru" messages={messages}>
              <AppLayout>{children}</AppLayout>
            </NextIntlClientProvider>
          </ThemeProvider>
        </Provider>
      </DarkModeProvider>
    </StyledComponentsRegistry>
  );
}
