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
import { AnimatePresence, motion } from "framer-motion";
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

  useEffect(() => { setIsMounted(true); }, []);

  const handleModalContentClick = useCallback((e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const backdrop: CSSProperties = {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 1200,
    display: "flex",
  };

  const container: CSSProperties = {
    position: "fixed",
    top: 0, bottom: 0,
    [position]: 0,
    width: `min(${width}px, 100vw)`,
    backgroundColor: isDark ? "#10141f" : "#ffffff",
    boxShadow: isDark
      ? "0 0 40px rgba(0, 0, 0, 0.7)"
      : "0 0 10px rgba(0, 0, 0, 0.2)",
    borderLeft: isDark ? "1px solid #1e2235" : "none",
    zIndex: 1201,
    overflowY: scroll ? "auto" : "hidden",
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const sidenavVariants = {
    hidden: { opacity: 0, x: position === "right" ? width : -width },
    visible: {
      x: 0, opacity: 1,
      transition: { type: "spring" as const, damping: 30, stiffness: 300 },
    },
    exit: {
      x: position === "right" ? width : -width,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const sidenavContent = (
    <AnimatePresence>
      {open && (
        <motion.div
          onClick={onClose}
          style={backdrop}
          className={className}
          exit="exit"
          initial="hidden"
          animate="visible"
          variants={backdropVariants}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            style={container}
            variants={sidenavVariants}
            role="dialog"
            aria-modal="true"
            onClick={handleModalContentClick}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <Fragment>
      {isMounted && createPortal(sidenavContent, document.body)}
      {handle}
    </Fragment>
  );
}
