import styled from "styled-components";
import { border, color, layout, space } from "styled-system";
import { BaseAvatarProps } from "./index";
import { isValidProp } from "@utils/utils";

const StyledAvatar = styled.div.withConfig({
  shouldForwardProp: (prop) => isValidProp(prop)
})<BaseAvatarProps>`
  display: block;
  font-weight: 600;
  overflow: hidden;
  position: relative;
  text-align: center;
  min-width: ${({ size }) => size ?? 0}px;
  font-size: ${({ size }) => (size ?? 0) / 2}px;
  border-radius: ${({ size }) => size ?? 0}px;
  width: "100%";
  img {
    object-fit: cover;
  }
  & > span {
    top: 50%;
    left: 50%;
    line-height: 0;
    position: absolute;
    transform: translate(-50%, -50%);
  }
  ${color}
  ${space}
  ${border}
  ${layout}
`;

export default StyledAvatar;
