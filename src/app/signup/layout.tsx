import { PropsWithChildren } from "react";
import StyledComponentsRegistry from "@lib/registry";
import { ThemeProvider } from "theme";
import { Provider } from "@lib/Provider";
import FlexBox from "@component/FlexBox";

export const dynamic = "force-dynamic";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <StyledComponentsRegistry>
      <Provider>
        <ThemeProvider>
          <FlexBox minHeight="100vh" alignItems="center" flexDirection="column" justifyContent="center">
            {children}
          </FlexBox>
        </ThemeProvider>
      </Provider>
    </StyledComponentsRegistry>
  );
}
