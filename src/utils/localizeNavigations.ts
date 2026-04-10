import type {
  NavCategoryGroup,
  NavigationImage,
  NavSubCategory,
  LocalizedNavCategoryGroup,
  LocalizedNavSubCategory,
  LocalizedNavigationImage,
  LocalizedNavigationItem,
  NavigationItem
} from "@data/types";

type Translate = (key: string) => string;

const localizeImage = (
  image: NavigationImage | undefined,
  t: Translate
) => {
  if (!image) return undefined;

  return {
    ...image,
    alt: image.altKey ? t(image.altKey) : ""
  } as LocalizedNavigationImage;
};

const localizeSubCategory = (item: NavSubCategory, t: Translate) =>
  ({
    ...item,
    title: t(item.titleKey)
  }) as LocalizedNavSubCategory;

const localizeCategory = (item: NavCategoryGroup, t: Translate) =>
  ({
    ...item,
    title: t(item.titleKey),
    subCategories: item.subCategories?.map((sub) => localizeSubCategory(sub, t))
  }) as LocalizedNavCategoryGroup;

export default function localizeNavigations(
  items: NavigationItem[],
  t: Translate
): LocalizedNavigationItem[] {
  return items.map((item) => ({
    ...item,
    title: t(item.titleKey),
    menuData: item.menuData
      ? {
          ...item.menuData,
          categories: item.menuData.categories?.map((category) => localizeCategory(category, t)),
          rightImage: localizeImage(item.menuData.rightImage, t),
          bottomImage: localizeImage(item.menuData.bottomImage, t)
        }
      : undefined
  }));
}
