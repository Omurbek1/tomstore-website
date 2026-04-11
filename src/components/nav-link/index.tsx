"use client";

import { AnchorHTMLAttributes, ReactNode } from "react";
import { CSSProperties } from "styled-components";
import { ColorProps, SpaceProps } from "styled-system";
import { Link, usePathname } from "i18n/navigation";
import StyledNavLink from "./styles";

// ==============================================================
interface NavLinkProps extends SpaceProps, ColorProps {
  as?: string;
  href: string;
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}
// ==============================================================

export default function NavLink({
  as,
  href,
  style,
  children,
  className,
  ...props
}: NavLinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  let pathname = usePathname();

  const checkRouteMatch = () => {
    if (href === "/") return pathname === href;
    return pathname?.includes(href);
  };

  return (
    <Link href={href}>
      <StyledNavLink
        style={style}
        className={className}
        isCurrentRoute={checkRouteMatch()}
        {...props}>
        {children}
      </StyledNavLink>
    </Link>
  );
}
