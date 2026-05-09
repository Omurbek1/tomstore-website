// https://github.com/apal21/nextjs-progressbar/issues/86

"use client";

import { useEffect } from "react";

const NPROGRESS_STYLES = `#nprogress{pointer-events:none}#nprogress .bar{background:#D32F2F;position:fixed;z-index:1031;top:0;left:0;width:100%;height:3px}#nprogress .peg{display:block;position:absolute;right:0;width:100px;height:100%;box-shadow:0 0 10px #D32F2F,0 0 5px #D32F2F;opacity:1;transform:rotate(3deg) translate(0,-4px)}`;

type PushStateInput = [data: any, unused: string, url?: string | URL | null | undefined];

export default function NProgressBar() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    const setup = async () => {
      const { default: NProgress } = await import("nprogress");
      if (cancelled) return;

      const style = document.createElement("style");
      style.textContent = NPROGRESS_STYLES;
      document.head.appendChild(style);
      NProgress.configure({ showSpinner: false, speed: 300, minimum: 0.08 });

      const handleAnchorClick = (event: MouseEvent) => {
        const anchorElement = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
        if (!anchorElement) return;
        if (anchorElement.target !== "_self" && anchorElement.target?.trim() !== "") return;
        if (anchorElement.hasAttribute("download")) return;
        if (location.href !== anchorElement.href) NProgress.start();
      };

      document.addEventListener("click", handleAnchorClick);

      const originalPushState = window.history.pushState.bind(window.history);
      const originalPushStateRef = window.history.pushState;
      window.history.pushState = new Proxy(originalPushState, {
        apply: (target, thisArg, argArray: PushStateInput) => {
          NProgress.done();
          return target.apply(thisArg, argArray);
        },
      });

      cleanup = () => {
        document.removeEventListener("click", handleAnchorClick);
        window.history.pushState = originalPushStateRef;
        style.remove();
      };
    };

    const canUseIdleCallback = typeof window.requestIdleCallback === "function";
    let idleHandle: number | undefined;
    let timeoutHandle: ReturnType<typeof globalThis.setTimeout> | undefined;

    if (canUseIdleCallback) {
      idleHandle = window.requestIdleCallback(() => void setup(), { timeout: 1500 });
    } else {
      timeoutHandle = globalThis.setTimeout(() => void setup(), 1000);
    }

    return () => {
      cancelled = true;
      if (idleHandle !== undefined) window.cancelIdleCallback(idleHandle);
      if (timeoutHandle !== undefined) globalThis.clearTimeout(timeoutHandle);
      cleanup?.();
    };
  }, []);

  return null;
}
