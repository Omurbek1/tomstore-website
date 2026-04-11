import {
  IconUpload,
  IconSettings,
  IconShoppingCart,
  IconBuildingStore,
  IconLayoutDashboard
} from "@tabler/icons-react";

export const navigationLinkDefs = [
  {
    href: "/vendor/dashboard",
    titleKey: "dashboard",
    Icon: IconLayoutDashboard
  },
  {
    href: "/vendor/products",
    titleKey: "products",
    Icon: IconBuildingStore,
    count: 300
  },
  {
    href: "/vendor/products/create",
    titleKey: "addNewProduct",
    Icon: IconUpload
  },
  {
    href: "/vendor/orders",
    titleKey: "orders",
    Icon: IconShoppingCart,
    count: 40
  },
  {
    href: "/vendor/account-settings",
    titleKey: "accountSettings",
    Icon: IconSettings
  }
] as const;
