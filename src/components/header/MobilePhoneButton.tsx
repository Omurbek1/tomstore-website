"use client";

import { useState, useRef, useEffect } from "react";
import { IconPhone, IconBrandWhatsapp, IconX } from "@tabler/icons-react";
import styled, { keyframes } from "styled-components";

const PHONE_DISPLAY = "+996 508 724 365";
const PHONE_RAW = "+996508724365";
const WA_HREF = `https://wa.me/996508724365`;

// ── Animations ────────────────────────────────────────────────────────
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-6px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0)     scale(1); }
`;

// ── Trigger button ─────────────────────────────────────────────────────
const TriggerBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: ${({ theme }) => theme.colors.gray[100]};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: 20px;
  cursor: pointer;
  padding: 5px 9px;
  transition: background 0.15s;
  color: ${({ theme }) => theme.colors.text.primary};

  .flag { font-size: 17px; line-height: 1; }

  &:hover { background: ${({ theme }) => theme.colors.gray[200]}; }
  &:active { transform: scale(0.96); }
`;

// ── Dropdown card ──────────────────────────────────────────────────────
const Card = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  width: 230px;
  background: ${({ theme }) => theme.colors.body.paper};
  border-radius: 18px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  z-index: 9999;
  animation: ${fadeIn} 0.18s ease;
`;

const CardHeader = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 14px 16px 12px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const HeaderText = styled.div`
  .label {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.55);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-bottom: 3px;
  }
  .phone {
    font-size: 16px;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: 0.02em;
  }
  .flag-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 6px;
    .emoji { font-size: 20px; }
    .country { font-size: 11px; color: rgba(255,255,255,0.5); }
  }
`;

const CloseBtn = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  flex-shrink: 0;
  transition: background 0.15s;
  &:hover { background: rgba(255, 255, 255, 0.2); }
`;

const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
`;

const ActionBtn = styled.a<{ $whatsapp?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 14px 8px;
  text-decoration: none;
  transition: background 0.15s;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[100]};
  cursor: pointer;

  &:first-child {
    border-right: 1px solid ${({ theme }) => theme.colors.gray[100]};
  }

  .icon-circle {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ $whatsapp }) =>
      $whatsapp
        ? "linear-gradient(135deg, #25d366 0%, #128c7e 100%)"
        : "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)"};
    color: #fff;
    box-shadow: ${({ $whatsapp }) =>
      $whatsapp
        ? "0 4px 12px rgba(37, 211, 102, 0.4)"
        : "0 4px 12px rgba(37, 99, 235, 0.4)"};
  }

  .label {
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.gray[100]};
  }
  &:active {
    background: ${({ theme }) => theme.colors.gray[200]};
  }
`;

// ── Backdrop ───────────────────────────────────────────────────────────
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9998;
`;

// ── Component ──────────────────────────────────────────────────────────
export default function MobilePhoneButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative", display: "flex", alignItems: "center" }}>
      <TriggerBtn onClick={() => setOpen((v) => !v)} aria-label="Контакты">
        <span className="flag">🇰🇬</span>
        <IconPhone size={15} stroke={2} />
      </TriggerBtn>

      {open && (
        <>
          <Backdrop onClick={() => setOpen(false)} />
          <Card>
            <CardHeader>
              <HeaderText>
                <div className="flag-row">
                  <span className="emoji">🇰🇬</span>
                  <span className="country">KYRGYZSTAN</span>
                </div>
                <div className="label">Мы на связи</div>
                <div className="phone">{PHONE_DISPLAY}</div>
              </HeaderText>
              <CloseBtn onClick={() => setOpen(false)} aria-label="Закрыть">
                <IconX size={14} stroke={2.5} />
              </CloseBtn>
            </CardHeader>

            <Actions>
              <ActionBtn href={`tel:${PHONE_RAW}`} onClick={() => setOpen(false)}>
                <span className="icon-circle">
                  <IconPhone size={18} stroke={2} />
                </span>
                <span className="label">Позвонить</span>
              </ActionBtn>

              <ActionBtn
                $whatsapp
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}>
                <span className="icon-circle">
                  <IconBrandWhatsapp size={18} stroke={2} />
                </span>
                <span className="label">WhatsApp</span>
              </ActionBtn>
            </Actions>
          </Card>
        </>
      )}
    </div>
  );
}
