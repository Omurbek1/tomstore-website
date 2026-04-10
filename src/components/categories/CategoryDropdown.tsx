"use client";

import { useTranslations } from "next-intl";
import navigations from "@data/navigations";
import localizeNavigations from "@utils/localizeNavigations";
import MegaMenu1 from "./mega-menu/MegaMenu1";
import CategoryMenuItem from "./CategoryMenuItem";
import { StyledCategoryDropdown } from "./styles";

// =========================================
type CategoryDropdownProps = {
  open: boolean;
  position?: "absolute" | "relative";
};
// =========================================

export default function CategoryDropdown({ open, position = "absolute" }: CategoryDropdownProps) {
  const t = useTranslations();
  const localizedNavigations = localizeNavigations(navigations, t);

  return (
    <StyledCategoryDropdown open={open} position={position}>
      {localizedNavigations.map((item) => {
        return (
          <CategoryMenuItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            title={item.title}
            caret={!!item.menuData}>
            {item.menuComponent === "MegaMenu1" && <MegaMenu1 data={item.menuData ?? {}} />}
          </CategoryMenuItem>
        );
      })}
    </StyledCategoryDropdown>
  );
}
