import styled from "styled-components";
import { color, compose, space, variant } from "styled-system";
import systemCss from "@styled-system/css";
import { isValidProp } from "@utils/utils";
import { IconProps } from "./types";

export const StyledSvgWrapper = styled("div").withConfig({
  shouldForwardProp: isValidProp
})<IconProps>(
  ({ color, size, transform, defaultColor, source = "svg" }) =>
    systemCss({
      display: "flex",
      width: size,
      height: size,
      color: color ? `${color}.main` : defaultColor,
      svg: {
        transform,
        width: "100%",
        height: "100%",
        ...(source === "library"
          ? {
              path: { stroke: "currentColor" },
              circle: { stroke: "currentColor" },
              line: { stroke: "currentColor" },
              polyline: { stroke: "currentColor" },
              polygon: { stroke: "currentColor" },
              rect: { stroke: "currentColor" }
            }
          : {
              path: { fill: color ? `${color}.main` : defaultColor },
              polyline: { color: color ? `${color}.main` : defaultColor },
              polygon: { color: color ? `${color}.main` : defaultColor }
            })
      },
      "> div": {
        display: "flex",
        width: "100%",
        height: "100%"
      }
    }),
  ({ size }) =>
    variant({
      prop: "variant",
      variants: {
        large: {
          width: size || "2rem",
          height: size || "2rem",
          "> div": {
            width: size || "2rem",
            height: size || "2rem"
          }
        },
        medium: {
          width: size || "1.5rem",
          height: size || "1.5rem",
          "> div": {
            width: size || "1.5rem",
            height: size || "1.5rem"
          }
        },
        small: {
          width: size || "1.25rem",
          height: size || "1.25rem",
          "> div": {
            width: size || "1.25rem",
            height: size || "1.25rem"
          }
        }
      }
    }),
  compose(color, space)
);

export const StyledCircleProgress = styled.div`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  width: 20px;
  height: 20px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-left-color: currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
`;
