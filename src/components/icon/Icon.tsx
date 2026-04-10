"use client";

import { ComponentPropsWithRef, ComponentType } from "react";
import {
  IconCategoryFilled,
  IconChevronDown,
  IconDots,
  IconMenu2
} from "@tabler/icons-react";
import {
  Cpu,
  CreditCard,
  Eye,
  Gift,
  Heart,
  Home,
  Laptop,
  LayoutGrid,
  Minus,
  Monitor,
  Mouse,
  Package,
  Plus,
  Printer,
  Router,
  ShoppingBag,
  ShoppingCart,
  UserRound
} from "lucide-react";
import { ReactSVG } from "react-svg";
import { SpaceProps } from "styled-system";

import { StyledCircleProgress, StyledSvgWrapper } from "./styles";
import { IconProps } from "./types";

// ==============================================================
type Props = SpaceProps & ComponentPropsWithRef<"div"> & IconProps;
// ==============================================================

const LIBRARY_ICONS: Record<string, ComponentType<any>> = {
  "arrow-down-filled": IconChevronDown,
  bag: ShoppingBag,
  bundle: Package,
  categories: IconCategoryFilled,
  category: LayoutGrid,
  cpu: Cpu,
  "credit-card": CreditCard,
  desktop: Monitor,
  "eye-alt": Eye,
  "gift-1": Gift,
  heart: Heart,
  home: Home,
  laptop: Laptop,
  menu: IconMenu2,
  minus: Minus,
  mouse: Mouse,
  options: IconDots,
  plus: Plus,
  printer: Printer,
  router: Router,
  "shopping-cart": ShoppingCart,
  "user-2": UserRound
};

export default function Icon({
  ref,
  children,
  variant = "medium",
  defaultColor = "currentColor",
  ...others
}: Props) {
  if (typeof children !== "string") return null;

  const LibraryIcon = LIBRARY_ICONS[children];

  return (
    <StyledSvgWrapper
      ref={ref}
      variant={variant}
      defaultColor={defaultColor}
      source={LibraryIcon ? "library" : "svg"}
      {...others}>
      {LibraryIcon ? (
        <LibraryIcon />
      ) : (
        <ReactSVG
          src={`/assets/images/icons/${children}.svg`}
          loading={() => <StyledCircleProgress />}
        />
      )}
    </StyledSvgWrapper>
  );
}
