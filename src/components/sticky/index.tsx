"use client";

import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { StyledSticky } from "./styles";

// ==============================================================
export interface StickyProps {
  fixedOn: number;
  children?: ReactElement;
  scrollDistance?: number;
  onSticky?: (isFixed: boolean) => void;
}
// ==============================================================

export default function Sticky({ fixedOn, scrollDistance = 0, children, onSticky }: StickyProps) {
  const [height, setHeight] = useState(0);
  const [fixed, setFixed] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const scrollListener = useCallback(() => {
    if (typeof window === "undefined") return;

    const isFixed = window.scrollY >= fixedOn + scrollDistance;
    setFixed(isFixed);
  }, [fixedOn, scrollDistance]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("scroll", scrollListener);
    window.addEventListener("resize", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
      window.removeEventListener("resize", scrollListener);
    };
  }, [scrollListener]);

  useEffect(() => {
    if (onSticky) onSticky(fixed);
  }, [fixed, onSticky]);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const size = entries[0]?.borderBoxSize?.[0]?.blockSize;
      setHeight(size ?? entries[0]?.contentRect.height ?? 0);
      scrollListener();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [scrollListener]);

  return (
    <StyledSticky fixedOn={fixedOn} componentHeight={height} fixed={fixed}>
      <div className={clsx({ hold: !fixed, fixed: fixed })} ref={elementRef}>
        {children}
      </div>
    </StyledSticky>
  );
}
