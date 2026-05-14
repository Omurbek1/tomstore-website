"use client";

import { useEffect } from "react";

const NPROGRESS_STYLES = `#nprogress{pointer-events:none}#nprogress .bar{background:#D32F2F;position:fixed;z-index:1031;top:0;left:0;width:100%;height:3px}#nprogress .peg{display:block;position:absolute;right:0;width:100px;height:100%;box-shadow:0 0 10px #D32F2F,0 0 5px #D32F2F;opacity:1;transform:rotate(3deg) translate(0,-4px)}`;

type HistoryMethod = typeof window.history.pushState;

export default function NProgressBar() {
  useEffect(() => {
    let mounted = true;
    let NProgress: any;

    const start = async () => {
      const mod = await import("nprogress");
      if (!mounted) return;

      NProgress = mod.default;
      NProgress.configure({ showSpinner: false, speed: 300, minimum: 0.08 });

      const style = document.createElement("style");
      style.textContent = NPROGRESS_STYLES;
      document.head.appendChild(style);

      const handleAnchorClick = (event: MouseEvent) => {
        const target = event.target as Element | null;
        const anchor = target?.closest<HTMLAnchorElement>("a[href]");
        if (!anchor) return;

        if (anchor.target && anchor.target !== "_self") return;
        if (anchor.hasAttribute("download")) return;
        if (anchor.origin !== location.origin) return;
        if (anchor.href === location.href) return;

        NProgress.start();
      };

      document.addEventListener("click", handleAnchorClick);

      const originalPushState = window.history.pushState;
      const originalReplaceState = window.history.replaceState;

      const done = () => {
        NProgress?.done();
      };

      window.history.pushState = function (...args) {
        const result = originalPushState.apply(this, args);
        done();
        return result;
      } as HistoryMethod;

      window.history.replaceState = function (...args) {
        const result = originalReplaceState.apply(this, args);
        done();
        return result;
      } as HistoryMethod;

      window.addEventListener("popstate", done);

      return () => {
        document.removeEventListener("click", handleAnchorClick);
        window.removeEventListener("popstate", done);
        window.history.pushState = originalPushState;
        window.history.replaceState = originalReplaceState;
        style.remove();
      };
    };

    let cleanup: void | (() => void);

    start().then((fn) => {
      cleanup = fn;
    });

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, []);

  return null;
}
