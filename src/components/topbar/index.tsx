"use client";

import { Suspense, useCallback, useState, useTransition } from "react";
import NextImage from "next/image";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { IconChevronDown, IconMail, IconPhone } from "@tabler/icons-react";
import {  KG, RU, US } from "country-flag-icons/react/3x2";

import { usePathname, useRouter } from "../../i18n/navigation";
import FlexBox from "@component/FlexBox";
import Menu from "../menu";
import NavLink from "../nav-link";
import MenuItem from "../MenuItem";
import Container from "../Container";
import { Small } from "../Typography";
import { StyledTopbar } from "./styles";
import { LANGUAGES, CURRENCIES } from "./data";
import type { FlagCode, LanguageOption } from "./data";

import logo from "../../../public/assets/images/logo.svg";

const LOCALE_SWITCH_SUPPORTED_PATHS = new Set<string>(["/"]);
const FLAG_COMPONENTS = { KG, RU, US } as const;

function FlagIcon({ code, title }: { code: FlagCode; title: string }) {
  const Flag = FLAG_COMPONENTS[code];

  return <Flag className="country-flag" aria-label={title} title={title} />;
}

function TopbarContent() {
  const t = useTranslations("topbar");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [currency, setCurrency] = useState(CURRENCIES[0]);

  const language = LANGUAGES.find((item) => item.id === locale) ?? LANGUAGES[0];
  const search = Object.fromEntries(searchParams.entries());

  const handleCurrencyClick = useCallback(
    (curr: typeof currency) => () => setCurrency(curr),
    [],
  );

  const handleLanguageClick = useCallback(
    (nextLanguage: LanguageOption) => () => {
      if (!pathname || nextLanguage.id === locale) return;

      const targetPathname = LOCALE_SWITCH_SUPPORTED_PATHS.has(pathname)
        ? pathname
        : "/";

      startTransition(() => {
        router.replace(
          {
            pathname: targetPathname as "/",
            ...(Object.keys(search).length > 0 && { query: search }),
          },
          { locale: nextLanguage.id },
        );
      });
    },
    [locale, pathname, router, search],
  );

  return (
    <StyledTopbar>
      <Container className="container">
        <div className="topbar-left">
          <div className="logo">
            <NextImage src={logo} alt="Tomstore" />
          </div>

          <div className="phone">
            <IconPhone size={16} stroke={1.5} />
            <span>+996 508 724 365</span>
          </div>

          <div className="email">
            <IconMail size={16} stroke={1.5} />
            <span>support@tomstore.com</span>
          </div>
        </div>

        <div className="topbar-right">
          <NavLink className="link" href="/">
            {t("themeFaq")}
          </NavLink>

          <NavLink className="link" href="/">
            {t("needHelp")}
          </NavLink>

          <Menu
            direction="right"
            handler={(handleOpen) => (
              <div
                className="dropdown-handler"
                onClick={handleOpen}
                aria-label={t("switchLanguage")}
                aria-busy={isPending}
              >
                <FlagIcon code={language.flagCode} title={language.title} />
                <Small fontWeight="600">{language.title}</Small>
                <IconChevronDown size={16} stroke={1.5} />
              </div>
            )}
          >
            {LANGUAGES.map((item) => {
              const isActive = item.id === locale;

              return (
                <MenuItem
                  key={item.id}
                  role="button"
                  onClick={handleLanguageClick(item)}
                  aria-current={isActive ? "true" : undefined}
                  aria-disabled={isPending || isActive}
                  color={isActive ? "primary.main" : undefined}
                  style={{ opacity: isPending && !isActive ? 0.7 : 1 }}
                >
                  <FlagIcon code={item.flagCode} title={item.title} />
                  <Small fontWeight="600">{t(`languages.${item.id}`)}</Small>
                </MenuItem>
              );
            })}
          </Menu>

          <Menu
            direction="right"
            handler={
              <FlexBox
                className="dropdown-handler"
                alignItems="center"
                height="40px"
              >
                <FlagIcon code={currency.flagCode} title={currency.title} />
                <Small fontWeight="600">{currency.title}</Small>
                <IconChevronDown size={16} stroke={1.5} />
              </FlexBox>
            }
          >
            {CURRENCIES.map((item) => (
              <MenuItem key={item.id} onClick={handleCurrencyClick(item)}>
                <FlagIcon code={item.flagCode} title={item.title} />
                <Small fontWeight="600">{item.title}</Small>
              </MenuItem>
            ))}
          </Menu>
        </div>
      </Container>
    </StyledTopbar>
  );
}
export default function Topbar() {
  return (
    <Suspense fallback={null}>
      <TopbarContent />
    </Suspense>
  );
}
