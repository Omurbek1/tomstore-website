import { space, border, layout, shadow, compose, variant } from "styled-system";
import styled from "styled-components";
import { isValidProp } from "@utils/utils";
import { StyledButtonProps } from "./Button";

const FALLBACK_COLORS = {
  text: "#2B3445",
  hint: "#7D879C",
  disabled: "#DAE1E7",
  primaryMain: "#E94560",
  primaryLight: "#FFE1E6",
  primaryText: "#FFFFFF",
  hover: "#F6F9FC",
};

type ButtonTheme = {
  colors?: {
    body?: { text?: string };
    text?: { hint?: string; disabled?: string };
    gray?: { 100?: string };
    primary?: { main?: string; light?: string; text?: string };
    secondary?: { main?: string; light?: string; text?: string };
    warn?: { main?: string; light?: string; text?: string };
    error?: { main?: string; light?: string; text?: string };
    dark?: { main?: string; light?: string; text?: string };
  };
};

function getPalette(theme: ButtonTheme, color?: StyledButtonProps["color"]) {
  if (!color || color === "inherit") return undefined;
  return theme.colors?.[color as keyof NonNullable<ButtonTheme["colors"]>];
}

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: isValidProp
})<StyledButtonProps>(
  ({ color, fullWidth, size, theme }) => {
    const palette = getPalette(theme, color);

    return {
    display: "flex",
    width: fullWidth ? "100%" : "unset",
    justifyContent: "center",
    alignItems: "center",
    outline: "none",
    border: "none",
    cursor: "pointer",
    padding: "11px 1.5rem",
    fontSize: "1rem",
    fontWeight: 600,
    fontFamily: "inherit",
    color:
      color === "inherit"
        ? "inherit"
        : palette?.main ?? theme.colors?.body?.text ?? FALLBACK_COLORS.text,
    backgroundColor: "transparent",
    transition: "all 150ms ease-in-out",
    lineHeight: 1,
    "&:disabled": {
      cursor: "unset",
      color: theme.colors?.text?.hint ?? FALLBACK_COLORS.hint,
      borderColor: theme.colors?.text?.disabled ?? FALLBACK_COLORS.disabled,
      backgroundColor: theme.colors?.text?.disabled ?? FALLBACK_COLORS.disabled,
      "svg path": { fill: theme.colors?.text?.hint ?? FALLBACK_COLORS.hint },
      "svg polyline, svg polygon": { color: theme.colors?.text?.hint ?? FALLBACK_COLORS.hint }
    },
    ...(size === "large" && { height: "56px", px: 30, borderRadius: "1rem" }),
    ...(size === "medium" && { height: "48px", px: 30, borderRadius: "0.75rem" }),
    ...(size === "small" && { height: "40px", fontSize: 14, borderRadius: "0.5rem" }),
    ...(size === "none" && { height: "unset", px: 0, borderRadius: "0.3rem" })
  };
  },
  ({ theme, color }) => {
    const palette = getPalette(theme, color);
    const main =
      color === "inherit"
        ? "inherit"
        : palette?.main ?? FALLBACK_COLORS.primaryMain;
    const light = palette?.light ?? FALLBACK_COLORS.primaryLight;
    const text =
      color === "inherit"
        ? "inherit"
        : palette?.text ?? FALLBACK_COLORS.primaryText;
    const hover = theme.colors?.gray?.[100] ?? FALLBACK_COLORS.hover;

    return (
    variant({
      prop: "variant",
      variants: {
        text: {
          border: "none",
          color: main,
          "&:hover": { backgroundColor: color === "inherit" ? hover : light }
        },
        outlined: {
          padding: "10px 16px",
          color: main,
          border: "1px solid",
          borderColor: color === "inherit" ? "currentColor" : main,
          "&:enabled svg path": {
            fill: `${color === "inherit" ? "currentColor" : main} !important`
          },
          "&:enabled svg polyline, svg polygon": {
            color: `${color === "inherit" ? "currentColor" : main} !important`
          },
          "&:focus": {
            boxShadow: `0px 1px 4px 0px ${light}`
          },
          "&:hover:enabled": {
            backgroundColor: color === "inherit" ? hover : main,
            borderColor: color === "inherit" ? "currentColor" : main,
            color: text,
            "svg path": {
              fill: `${color === "inherit" ? "currentColor" : text} !important`
            },
            "svg polyline, svg polygon": {
              color: `${color === "inherit" ? "currentColor" : text} !important`
            },
            ...(color === "dark" && { color: "white" })
          }
        },
        contained: {
          border: "none",
          color: text,
          backgroundColor: color === "inherit" ? "transparent" : main,
          "&:focus": {
            boxShadow: `0px 1px 4px 0px ${light}`
          },
          "&:enabled svg path": {
            fill: `${color === "inherit" ? "currentColor" : text} !important`
          },
          "&:enabled svg polyline, svg polygon": {
            color: `${color === "inherit" ? "currentColor" : text} !important`
          }
        }
      }
    })
    );
  },
  compose(layout, space, border, shadow)
);
