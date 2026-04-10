import type {
  LocalizedNavCategoryGroup,
  LocalizedNavigationImage,
  LocalizedNavigationItem,
  LocalizedNavigationMenuData
} from "@data/types";

export type MegaMenu1Props = { data: LocalizedNavigationMenuData; minWidth?: string };

export type MegaMenu2Props = { data: LocalizedNavigationItem[] };

type MegaMenu3 = { rightImage?: LocalizedNavigationImage; categories: LocalizedNavCategoryGroup[] };

export type MegaMenu3Props = { data: MegaMenu3; minWidth?: string };
