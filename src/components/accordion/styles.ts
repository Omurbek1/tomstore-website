import styled from "styled-components";
import FlexBox from "@component/FlexBox";
import { isValidProp } from "@utils/utils";

// STYLED COMPONENT
export const AccordionWrapper = styled.div<{ open: boolean }>`
  cursor: pointer;
  display: grid;
  grid-template-rows: auto ${({ open }) => (open ? "1fr" : "0fr")};
  transition: grid-template-rows 250ms ease-in-out;

  .accordion-content {
    min-height: 0;
    overflow: hidden;
  }
`;

export const AccordionHeaderWrapper = styled(FlexBox).withConfig({
  shouldForwardProp: isValidProp
})<{ open: boolean }>`
  align-items: center;
  justify-content: space-between;
  .caret-icon {
    transition: transform 250ms ease-in-out;
    transform: ${({ open }) => (open ? "rotate(90deg)" : "rotate(0deg)")};
  }
`;
