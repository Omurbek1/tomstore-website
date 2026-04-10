export type NavSubCategory = {
  titleKey: string;
  href: string;
  imgUrl?: string;
};

export type NavCategoryGroup = {
  titleKey: string;
  href: string;
  subCategories?: NavSubCategory[];
};

export type NavigationImage = {
  imgUrl: string;
  href: string;
  altKey?: string;
};

export type NavigationMenuData = {
  categories?: NavCategoryGroup[];
  rightImage?: NavigationImage;
  bottomImage?: NavigationImage;
};

export type NavigationItem = {
  id: string;
  icon: string;
  titleKey: string;
  href: string;
  menuComponent?: "MegaMenu1" | "MegaMenu2";
  menuData?: NavigationMenuData;
};

export type LocalizedNavSubCategory = NavSubCategory & {
  title: string;
};

export type LocalizedNavCategoryGroup = Omit<NavCategoryGroup, "subCategories"> & {
  title: string;
  subCategories?: LocalizedNavSubCategory[];
};

export type LocalizedNavigationImage = NavigationImage & {
  alt: string;
};

export type LocalizedNavigationMenuData = {
  categories?: LocalizedNavCategoryGroup[];
  rightImage?: LocalizedNavigationImage;
  bottomImage?: LocalizedNavigationImage;
};

export type LocalizedNavigationItem = Omit<NavigationItem, "menuData"> & {
  title: string;
  menuData?: LocalizedNavigationMenuData;
};
