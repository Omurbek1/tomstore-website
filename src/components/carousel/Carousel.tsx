"use client";

import { PropsWithChildren, useCallback, useEffect, useRef } from "react";
import SlickCarousel, { Settings } from "react-slick";
import { CSSObject } from "styled-components";
// LOCAL CUSTOM COMPONENTS
import CarouselDots from "./CarouselDots";
import CarouselArrows from "./CarouselArrows";
// STYLED COMPONENT
import { RootStyle } from "./styles";

// ==============================================================
interface Props extends PropsWithChildren, Settings {
  dotColor?: string;
  spaceBetween?: number;
  dotStyles?: CSSObject;
  arrowStyles?: CSSObject;
  ref?: React.Ref<SlickCarousel>;
}
// ==============================================================

export default function Carousel({
  ref,
  dotColor,
  children,
  arrowStyles,
  dots = false,
  arrows = true,
  slidesToShow = 4,
  spaceBetween = 10,
  dotStyles = { marginTop: "2rem" },
  ...others
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  const syncHiddenSlides = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;

    root.querySelectorAll<HTMLElement>(".slick-slide").forEach((slide) => {
      const isHidden = slide.getAttribute("aria-hidden") === "true";
      const focusable = slide.querySelectorAll<HTMLElement>(
        "a, button, input, select, textarea, [tabindex]",
      );

      if (isHidden) {
        slide.setAttribute("inert", "");
        focusable.forEach((element) => {
          if (!element.hasAttribute("data-carousel-tabindex")) {
            element.setAttribute(
              "data-carousel-tabindex",
              element.getAttribute("tabindex") ?? "",
            );
          }
          element.setAttribute("tabindex", "-1");
        });
      } else {
        slide.removeAttribute("inert");
        focusable.forEach((element) => {
          const previousTabIndex = element.getAttribute("data-carousel-tabindex");
          if (previousTabIndex === null) return;

          if (previousTabIndex) element.setAttribute("tabindex", previousTabIndex);
          else element.removeAttribute("tabindex");

          element.removeAttribute("data-carousel-tabindex");
        });
      }
    });
  }, []);

  useEffect(() => {
    const id = window.requestAnimationFrame(syncHiddenSlides);
    return () => window.cancelAnimationFrame(id);
  }, [children, syncHiddenSlides]);

  const settings: Settings = {
    ...others,
    dots,
    arrows,
    slidesToShow,
    onInit: () => {
      window.requestAnimationFrame(syncHiddenSlides);
      others.onInit?.();
    },
    afterChange: (currentSlide) => {
      window.requestAnimationFrame(syncHiddenSlides);
      others.afterChange?.(currentSlide);
    },
    ...CarouselArrows({ style: arrowStyles }),
    ...CarouselDots({ dotColor, style: dotStyles }),
  };

  return (
    <RootStyle ref={rootRef} space={spaceBetween}>
      <SlickCarousel ref={ref} {...settings}>
        {children}
      </SlickCarousel>
    </RootStyle>
  );
}
