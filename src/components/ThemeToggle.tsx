"use client";

import styled, { keyframes, css } from "styled-components";
import { useDarkMode } from "@context/DarkModeContext";

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const Track = styled.button<{ $dark: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 48px;
  height: 26px;
  border-radius: 13px;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  transition: background 0.3s ease;
  background: ${({ $dark }) =>
    $dark
      ? "linear-gradient(135deg, #1a1f3a 0%, #0f1228 100%)"
      : "linear-gradient(135deg, #6ab0f5 0%, #3b8ef0 100%)"};
  box-shadow: ${({ $dark }) =>
    $dark
      ? "0 0 0 1px rgba(255,255,255,0.12), inset 0 1px 3px rgba(0,0,0,0.4)"
      : "0 0 0 1px rgba(255,255,255,0.3), inset 0 1px 3px rgba(0,0,0,0.1)"};

  &:focus-visible {
    outline: 2px solid rgba(255,255,255,0.6);
    outline-offset: 2px;
  }
`;

const Thumb = styled.span<{ $dark: boolean }>`
  position: absolute;
  top: 3px;
  left: ${({ $dark }) => ($dark ? "calc(100% - 23px)" : "3px")};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
  transition: left 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  line-height: 1;

  ${({ $dark }) =>
    $dark &&
    css`
      animation: ${rotate} 0.5s ease;
    `}
`;

const Stars = styled.span<{ $dark: boolean }>`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 9px;
  line-height: 1;
  opacity: ${({ $dark }) => ($dark ? 1 : 0)};
  transition: opacity 0.2s ease;
  pointer-events: none;
`;

const SunRays = styled.span<{ $dark: boolean }>`
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 9px;
  line-height: 1;
  opacity: ${({ $dark }) => ($dark ? 0 : 1)};
  transition: opacity 0.2s ease;
  pointer-events: none;
`;

export default function ThemeToggle() {
  const { isDark, toggle } = useDarkMode();

  return (
    <Track
      $dark={isDark}
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <SunRays $dark={isDark}>✦</SunRays>
      <Thumb $dark={isDark}>
        {isDark ? "🌙" : "☀️"}
      </Thumb>
      <Stars $dark={isDark}>✦</Stars>
    </Track>
  );
}
