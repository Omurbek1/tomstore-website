import { Fragment, PropsWithChildren } from "react";
import StyledComponentsRegistry from "@lib/registry";
import { ThemeProvider } from "theme";
import { Provider } from "@lib/Provider";
import Topbar from "@component/topbar";
import { Header } from "@component/header";
import { Footer1 } from "@component/footer";
import Navbar from "@component/navbar/Navbar";
import MobileNavigationBar from "@component/mobile-navigation";

export const dynamic = "force-dynamic";

export default function SaleLayout1({ children }: PropsWithChildren) {
  return (
    <StyledComponentsRegistry>
      <Provider>
        <ThemeProvider>
          <Fragment>
            <Topbar />
            <Header />
            <Navbar />
            {children}
            <MobileNavigationBar />
            <Footer1 />
          </Fragment>
        </ThemeProvider>
      </Provider>
    </StyledComponentsRegistry>
  );
}
