"use client";

import { Suspense, useCallback, useEffect, useRef, useState, useTransition } from "react";
import NextImage from "next/image";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  IconChevronDown,
  IconMail,
  IconPhone,
  IconBrandWhatsapp,
  IconBrandInstagram,
  IconX,
} from "@tabler/icons-react";
import { KG, RU, US } from "country-flag-icons/react/3x2";
import styled, { keyframes } from "styled-components";

import { usePathname, useRouter } from "@i18n/navigation";
import FlexBox from "@component/FlexBox";
import Menu from "../menu";
import NavLink from "../nav-link";
import MenuItem from "../MenuItem";
import Container from "../Container";
import { Small } from "../Typography";
import { StyledTopbar } from "./styles";
import { LANGUAGES, CURRENCIES } from "./data";
import type { FlagCode, LanguageOption } from "./data";

const PHONE_DISPLAY = "0508 724 365";
const PHONE_RAW = "+996508724365";
const WA_HREF = `https://wa.me/996508724365`;

const LOCALE_SWITCH_SUPPORTED_PATHS = new Set<string>(["/"]);
const FLAG_COMPONENTS = { KG, RU, US } as const;

// ── Phone dropdown styles ──────────────────────────────────────────────
const dropIn = keyframes`
  from { opacity: 0; transform: translateY(-6px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

const pulse = keyframes`
  0%   { transform: scale(1);   opacity: 1; }
  70%  { transform: scale(2.2); opacity: 0; }
  100% { transform: scale(1);   opacity: 0; }
`;

const OnlineDot = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 8px;
  height: 8px;
  flex-shrink: 0;

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
  }
  /* solid green dot */
  &::before {
    width: 8px;
    height: 8px;
    background: #22c55e;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.15);
  }
  /* pulsing ring */
  &::after {
    width: 8px;
    height: 8px;
    background: #22c55e;
    animation: ${pulse} 1.8s ease-out infinite;
  }
`;

const PhoneBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 3px 10px 3px 7px;
  cursor: pointer;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: background 0.15s;
  white-space: nowrap;

  &:hover { background: rgba(255, 255, 255, 0.22); }
  &:active { transform: scale(0.97); }

  svg { flex-shrink: 0; }
`;

const DropCard = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 210px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 12px 36px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08);
  overflow: hidden;
  z-index: 9999;
  animation: ${dropIn} 0.17s ease;
`;

const DropHeader = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 12px 14px 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const DropHeaderText = styled.div`
  .label {
    font-size: 10px;
    color: rgba(255,255,255,0.5);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 3px;
  }
  .num {
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.03em;
  }
`;

const DropClose = styled.button`
  background: rgba(255,255,255,0.12);
  border: none;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: rgba(255,255,255,0.65);
  flex-shrink: 0;
  &:hover { background: rgba(255,255,255,0.22); }
`;

const DropActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const DropAction = styled.a<{ $wa?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 6px;
  text-decoration: none;
  cursor: pointer;
  border-top: 1px solid #f0f0f0;
  transition: background 0.13s;

  &:first-child { border-right: 1px solid #f0f0f0; }
  &:hover { background: #f7f7f7; }
  &:active { background: #efefef; }

  .ic {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background: ${({ $wa }) =>
      $wa
        ? "linear-gradient(135deg, #25d366 0%, #128c7e 100%)"
        : "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)"};
    box-shadow: ${({ $wa }) =>
      $wa
        ? "0 4px 10px rgba(37,211,102,0.4)"
        : "0 4px 10px rgba(37,99,235,0.38)"};
  }

  .lbl {
    font-size: 11px;
    font-weight: 600;
    color: #222;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9998;
`;

// ── PhoneDropdown component ────────────────────────────────────────────
function PhoneDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <PhoneBtn onClick={() => setOpen((v) => !v)} aria-label="Контакты">
        <OnlineDot />
        <IconPhone size={13} stroke={2.2} />
        {PHONE_DISPLAY}
        <IconChevronDown size={12} stroke={2.5} style={{ opacity: 0.7 }} />
      </PhoneBtn>

      {open && (
        <>
          <Backdrop onClick={() => setOpen(false)} />
          <DropCard>
            <DropHeader>
              <DropHeaderText>
                <div className="label">Мы на связи</div>
                <div className="num">{PHONE_DISPLAY}</div>
              </DropHeaderText>
              <DropClose onClick={() => setOpen(false)} aria-label="Закрыть">
                <IconX size={12} stroke={2.5} />
              </DropClose>
            </DropHeader>

            <DropActions>
              <DropAction href={`tel:${PHONE_RAW}`} onClick={() => setOpen(false)}>
                <span className="ic"><IconPhone size={17} stroke={2} /></span>
                <span className="lbl">Позвонить</span>
              </DropAction>
              <DropAction $wa href={WA_HREF} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                <span className="ic"><IconBrandWhatsapp size={17} stroke={2} /></span>
                <span className="lbl">WhatsApp</span>
              </DropAction>
            </DropActions>
          </DropCard>
        </>
      )}
    </div>
  );
}

// ── Flag icon ──────────────────────────────────────────────────────────
function FlagIcon({ code, title }: { code: FlagCode; title: string }) {
  const Flag = FLAG_COMPONENTS[code];
  return <Flag className="country-flag" aria-label={title} title={title} />;
}

// ── Main topbar ────────────────────────────────────────────────────────
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
      const targetPathname = LOCALE_SWITCH_SUPPORTED_PATHS.has(pathname) ? pathname : "/";
      startTransition(() => {
        router.replace(
          { pathname: targetPathname as "/", ...(Object.keys(search).length > 0 && { query: search }) },
          { locale: nextLanguage.id },
        );
      });
    },
    [locale, pathname, router, search],
  );

  const langMenu = (
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
  );

  return (
    <StyledTopbar>
      <Container className="container">
        {/* Desktop left */}
        <div className="topbar-left">
          <div className="logo">
            <NextImage
              src="/assets/images/logo.svg"
              alt="Tomstore"
              width={112}
              height={32}
              unoptimized
            />
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

        {/* Mobile left: phone dropdown only */}
        <div className="mobile-left">
          <PhoneDropdown />
        </div>

        {/* Desktop right */}
        <div className="topbar-right">
          <NavLink className="link" href="/contacts">{t("themeFaq")}</NavLink>
          <NavLink className="link" href="/contacts">{t("needHelp")}</NavLink>

          {langMenu}

          <Menu
            direction="right"
            handler={
              <FlexBox className="dropdown-handler" alignItems="center" height="40px">
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

          <a
            href="https://www.instagram.com/tomstore.kg"
            target="_blank"
            rel="noopener noreferrer"
            className="ig-link"
            aria-label="Instagram"
          >
            <IconBrandInstagram size={18} stroke={1.5} />
          </a>
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
