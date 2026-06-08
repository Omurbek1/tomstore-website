"use client";

import {
  Fragment,
  ReactNode,
  useEffect,
  ReactElement,
  useCallback,
  MouseEvent,
  CSSProperties,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useDarkMode } from "@context/DarkModeContext";

// ==============================================================
interface SidenavProps {
  width?: number;
  scroll?: boolean;
  className?: string;
  position?: "left" | "right";
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  handle: ReactElement;
}
// ==============================================================

// Анимация на чистом CSS (без framer-motion) — раньше это был единственный
// потребитель framer-motion на витрине, из-за чего ~50 kB попадали в бандл
// КАЖДОЙ страницы. Slide + fade теперь делаются transition'ами.
export default function Sidenav({
  handle,
  onClose,
  children,
  className,
  open = false,
  width = 280,
  scroll = false,
  position = "right",
}: SidenavProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { isDark } = useDarkMode();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleModalContentClick = useCallback((e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const backdrop: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 1200,
    display: "flex",
    opacity: open ? 1 : 0,
    visibility: open ? "visible" : "hidden",
    pointerEvents: open ? "auto" : "none",
    transition: "opacity 0.25s ease, visibility 0.25s ease",
  };

  const hiddenOffset =
    position === "right" ? "translateX(100%)" : "translateX(-100%)";

  const container: CSSProperties = {
    position: "fixed",
    top: 0,
    bottom: 0,
    [position]: 0,
    width: `min(${width}px, 100vw)`,
    backgroundColor: isDark ? "#10141f" : "#ffffff",
    boxShadow: isDark
      ? "0 0 40px rgba(0, 0, 0, 0.7)"
      : "0 0 10px rgba(0, 0, 0, 0.2)",
    borderLeft: isDark ? "1px solid #1e2235" : "none",
    zIndex: 1201,
    overflowY: scroll ? "auto" : "hidden",
    transform: open ? "translateX(0)" : hiddenOffset,
    transition: "transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
    willChange: "transform",
  };

  const sidenavContent = (
    <div
      onClick={onClose}
      style={backdrop}
      className={className}
      aria-hidden={!open}
    >
      <div
        style={container}
        role="dialog"
        aria-modal="true"
        onClick={handleModalContentClick}
      >
        {children}
      </div>
    </div>
  );

  return (
    <Fragment>
      {isMounted && createPortal(sidenavContent, document.body)}
      {handle}
    </Fragment>
  );
}
