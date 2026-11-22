import {
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { CSSProperties } from "styled-components";
import { AnimatePresence, LazyMotion, m } from "motion/react";
// Фичи анимации грузим отдельным чанком после гидрации: в первом бандле
// витрины (топбар на всех страницах) остаётся лёгкий `m`, а не весь motion.
const loadMotionFeatures = () => import("./motionFeatures").then((mod) => mod.default);

// STYLED COMPONENT
import { StyledMenu } from "./styles";

// ============================================
interface MenuProps {
  className?: string;
  style?: CSSProperties;
  direction?: "left" | "right";
  children: ReactElement | ReactElement[];
  handler:
    | ReactElement<{ onClick?: (e: React.MouseEvent<HTMLElement>) => void }>
    | ((handleOpen: (e: React.MouseEvent<HTMLElement>) => void) => ReactNode);
}
// ============================================

export default function Menu({
  handler,
  style,
  children,
  className,
  direction = "left"
}: MenuProps) {
  const [show, setShow] = useState(false);

  const popoverRef = useRef(show);
  popoverRef.current = show;

  const handleDocumentClick = useCallback(() => {
    if (popoverRef.current) setShow(false);
  }, []);

  const togglePopover = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      setShow((state) => !state);
    },
    [show]
  );

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, []);

  const renderedHandler =
    typeof handler === "function"
      ? handler(togglePopover)
      : isValidElement<{ onClick?: (e: React.MouseEvent<HTMLElement>) => void }>(handler)
        ? cloneElement(handler, {
            onClick: (e: React.MouseEvent<HTMLElement>) => {
              handler.props.onClick?.(e);
              togglePopover(e);
            }
          })
        : handler;

  return (
    <StyledMenu direction={direction} className={className} style={style}>
      {renderedHandler}

      <LazyMotion features={loadMotionFeatures}>
        <AnimatePresence>
          {show && (
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="menu-item-holder">
              {children}
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </StyledMenu>
  );
}
