// https://github.com/apal21/nextjs-progressbar/issues/86

"use client";

import { useEffect } from "react";
import NProgress from "nprogress";
// @ts-ignore
import "nprogress/nprogress.css";

type PushStateInput = [data: any, unused: string, url?: string | URL | null | undefined];

export default function NProgressBar() {
  useEffect(() => {
    NProgress.configure({ showSpinner: false, speed: 300, minimum: 0.08 });

    const handleAnchorClick = (event: MouseEvent) => {
      const anchorElement = event.currentTarget as HTMLAnchorElement;
      if (anchorElement.target !== "_self" && anchorElement.target?.trim() !== "") return;
      if (anchorElement.hasAttribute("download")) return;
      if (location.href !== anchorElement.href) NProgress.start();
    };

    const attachListeners = () => {
      document.querySelectorAll("a[href]").forEach((anchor) =>
        anchor.addEventListener("click", handleAnchorClick),
      );
    };

    attachListeners();

    const mutationObserver = new MutationObserver(attachListeners);
    mutationObserver.observe(document, { childList: true, subtree: true });

    const originalPushState = window.history.pushState.bind(window.history);
    window.history.pushState = new Proxy(originalPushState, {
      apply: (target, thisArg, argArray: PushStateInput) => {
        NProgress.done();
        return target.apply(thisArg, argArray);
      },
    });

    return () => {
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
