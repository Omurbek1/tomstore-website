import Script from "next/script";
import { Fragment } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-6CTD0XYMHV";

export default function GoogleAnalytics() {
  if (!GA_ID) return null;

  const MARKUP = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}');
  `;

  return (
    <Fragment>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: MARKUP }}
      />
    </Fragment>
  );
}
