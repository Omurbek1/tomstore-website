"use client";

import { ComponentPropsWithRef, ComponentType } from "react";
import {
  IconAlarm,
  IconApple,
  IconArmchair,
  IconBabyBottle,
  IconBallFootball,
  IconBeer,
  IconBottle,
  IconBox,
  IconBrush,
  IconCake,
  IconCamera,
  IconCandle,
  IconCar,
  IconCarrot,
  IconCategoryFilled,
  IconCheck,
  IconChevronDown,
  IconChristmasTree,
  IconCoin,
  IconCookie,
  IconDeviceMobile,
  IconDots,
  IconDroplet,
  IconEggs,
  IconEyeglass2,
  IconFaceMask,
  IconFish,
  IconFlower,
  IconHanger,
  IconHeadset,
  IconHorseToy,
  IconIceCream,
  IconLungs,
  IconMenu2,
  IconMilk,
  IconMoodKid,
  IconPaw,
  IconPerfume,
  IconPillow,
  IconRobot,
  IconSalad,
  IconShield,
  IconShieldDollar,
  IconShirt,
  IconSofa,
  IconTable,
  IconTemperature,
  IconBrandApple,
  IconBrandGooglePlay,
  IconBrandInstagram,
  IconBulb,
  IconMedal,
  IconPhone,
  IconSparkles,
  IconThumbUp,
  IconToolsKitchen2,
  IconTrendingUp,
  IconTruck,
  IconUsersGroup,
  IconWheat
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
  // Brand & contact icons
  "app-store": IconBrandApple,
  "instagram": IconBrandInstagram,
  "phone": IconPhone,
  "play-store": IconBrandGooglePlay,

  // UI icons (lucide)
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
  "user-2": UserRound,

  // Category & product icons (tabler)
  "alarm-clock": IconAlarm,
  apple: IconApple,
  automotive: IconCar,
  "baby-toys": IconHorseToy,
  "beauty-products": IconPerfume,
  beer: IconBeer,
  "birthday-cake": IconCake,
  bottle: IconBottle,
  box: IconBox,
  breakfast: IconEggs,
  camera: IconCamera,
  carrot: IconCarrot,
  chair: IconArmchair,
  check: IconCheck,
  children: IconMoodKid,
  "christmas-tree": IconChristmasTree,
  credit: IconCoin,
  "customer-service": IconHeadset,
  decoration: IconCandle,
  "digital-thermometer": IconTemperature,
  dining: IconToolsKitchen2,
  "eye-lens": IconEyeglass2,
  "face-mask": IconFaceMask,
  fashion: IconHanger,
  "feedback-thumbs-up": IconThumbUp,
  "Group": IconUsersGroup,
  light: IconBulb,
  "new-product-1": IconSparkles,
  "ranking-1": IconMedal,
  "feeding-bottle": IconBabyBottle,
  fish: IconFish,
  flower: IconFlower,
  football: IconBallFootball,
  furniture: IconSofa,
  "healthy-food": IconSalad,
  honey: IconDroplet,
  interior: IconPillow,
  lipstick: IconBrush,
  living: IconSofa,
  "living-set": IconSofa,
  lotion: IconDroplet,
  makeup: IconBrush,
  mascara: IconEyeglass2,
  milk: IconMilk,
  "money-guarantee": IconShieldDollar,
  "new-year-gift": Gift,
  "oxygen-pump": IconLungs,
  payment: CreditCard,
  popular: IconTrendingUp,
  powder: IconDroplet,
  products: Package,
  robot: IconRobot,
  "round-table": IconTable,
  shield: IconShield,
  skincare: IconDroplet,
  smartphone: IconDeviceMobile,
  snack: IconCookie,
  sofa: IconSofa,
  stool: IconTable,
  "teddy-bear": IconPaw,
  toys: IconHorseToy,
  trending: IconTrendingUp,
  truck: IconTruck,
  "valentine-gift": Heart,
  wardrobe: IconHanger,
  "wedding-gift": Gift,
  "wheat-flour": IconWheat,
  "women-dress": IconShirt,
  yogurt: IconIceCream
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
