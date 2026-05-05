"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  IconBrandTelegram,
  IconBrandWhatsapp,
  IconCheck,
  IconCopy,
  IconShare2,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";

import { Button } from "@component/buttons";

interface Props {
  title: string;
  text?: string;
  slug?: string;
}

type MenuPosition = {
  top: number;
  left: number;
};

const ShareWrapper = styled.div`
  position: relative;
  display: inline-flex;
`;

const ShareMenu = styled.div<{ $top: number; $left: number }>`
  position: fixed;
  top: ${({ $top }) => `${$top}px`};
  left: ${({ $left }) => `${$left}px`};
  z-index: 9999;
  width: 220px;
  max-width: calc(100vw - 32px);
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.body.paper};
  box-shadow: 0 18px 48px -24px rgba(15, 23, 42, 0.35);
`;

const shareMenuItemStyles = css`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 42px;
  padding: 9px 10px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  transition: background-color 150ms ease, color 150ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.gray[100]};
    color: ${({ theme }) => theme.colors.primary.main};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  &[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;

const ShareMenuItem = styled.button`
  ${shareMenuItemStyles}
`;

const ShareMenuLink = styled.a`
  ${shareMenuItemStyles}
`;

function resolveProductUrl(slug?: string) {
  if (typeof window === "undefined") return "";

  if (!slug) return window.location.href;

  const localeMatch = window.location.pathname.match(/^\/(ru|en|ky)(?=\/|$)/);
  const localePrefix = localeMatch?.[1] ? `/${localeMatch[1]}` : "";
  const normalizedSlug = slug.replace(/^\/+/, "");

  return new URL(`${localePrefix}/product/${normalizedSlug}`, window.location.origin).toString();
}

function getEncodedShareUrl(provider: "whatsapp" | "telegram", url: string, text: string) {
  if (provider === "whatsapp") {
    return `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`;
  }

  return `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
}

async function copyToClipboard(value: string) {
  if (!value || typeof navigator === "undefined") return false;

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    return false;
  }

  return false;
}

export default function ProductShareButton({ title, text, slug }: Props) {
  const t = useTranslations("product");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [shareUrl, setShareUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);

  const shareText = text || title;
  const whatsappHref = useMemo(
    () => getEncodedShareUrl("whatsapp", shareUrl, shareText),
    [shareText, shareUrl],
  );
  const telegramHref = useMemo(
    () => getEncodedShareUrl("telegram", shareUrl, shareText),
    [shareText, shareUrl],
  );

  useEffect(() => {
    setShareUrl(resolveProductUrl(slug));
  }, [slug]);

  useEffect(() => {
    if (!isOpen || typeof document === "undefined" || typeof window === "undefined") return;

    const updateMenuPosition = () => {
      const buttonRect = wrapperRef.current?.getBoundingClientRect();
      if (!buttonRect) return;

      const menuWidth = 220;
      const viewportPadding = 12;
      const nextLeft = Math.min(
        Math.max(buttonRect.left, viewportPadding),
        window.innerWidth - menuWidth - viewportPadding,
      );
      const nextTop = buttonRect.bottom + 8;

      setMenuPosition({ top: nextTop, left: nextLeft });
    };

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !wrapperRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    updateMenuPosition();

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", updateMenuPosition);
    window.addEventListener("scroll", updateMenuPosition, true);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [isOpen]);

  const handleCopyLink = useCallback(async () => {
    const copied = await copyToClipboard(shareUrl);

    if (!copied) return;

    setIsCopied(true);
    setIsOpen(false);

    window.setTimeout(() => {
      setIsCopied(false);
    }, 1800);
  }, [shareUrl]);

  const handleNativeShare = useCallback(async () => {
    if (!shareUrl || typeof navigator === "undefined") return;

    if (!navigator.share) {
      await handleCopyLink();
      return;
    }

    try {
      await navigator.share({ title, text: shareText, url: shareUrl });
      setIsOpen(false);
    } catch {
      // User can close the native share sheet without choosing an app.
    }
  }, [handleCopyLink, shareText, shareUrl, title]);

  return (
    <ShareWrapper ref={wrapperRef}>
      <Button
        type="button"
        size="small"
        color="primary"
        variant="outlined"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        title={isCopied ? t("linkCopied") : t("shareTitle")}
        onClick={() => setIsOpen((current) => !current)}>
        {isCopied ? <IconCheck size={18} /> : <IconShare2 size={18} />}
        <span style={{ marginLeft: 8 }}>{isCopied ? t("linkCopied") : t("share")}</span>
      </Button>

      {isOpen && menuPosition
        ? createPortal(
        <ShareMenu ref={menuRef} role="menu" $top={menuPosition.top} $left={menuPosition.left}>
          <ShareMenuItem type="button" role="menuitem" disabled={!shareUrl} onClick={handleNativeShare}>
            <IconShare2 size={18} />
            {t("share")}
          </ShareMenuItem>

          <ShareMenuLink
            role="menuitem"
            href={shareUrl ? whatsappHref : undefined}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!shareUrl}
            onClick={(event) => {
              if (!shareUrl) {
                event.preventDefault();
                return;
              }

              setIsOpen(false);
            }}>
            <IconBrandWhatsapp size={18} />
            WhatsApp
          </ShareMenuLink>

          <ShareMenuLink
            role="menuitem"
            href={shareUrl ? telegramHref : undefined}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!shareUrl}
            onClick={(event) => {
              if (!shareUrl) {
                event.preventDefault();
                return;
              }

              setIsOpen(false);
            }}>
            <IconBrandTelegram size={18} />
            Telegram
          </ShareMenuLink>

          <ShareMenuItem type="button" role="menuitem" disabled={!shareUrl} onClick={handleCopyLink}>
            <IconCopy size={18} />
            {t("copyLink")}
          </ShareMenuItem>
        </ShareMenu>,
        document.body,
      )
        : null}
    </ShareWrapper>
  );
}
