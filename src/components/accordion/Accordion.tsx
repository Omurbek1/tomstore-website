"use client";

import {
  Children,
  useState,
  cloneElement,
  isValidElement,
  ReactElement,
  useMemo,
  useCallback
} from "react";
// STYLED COMPONENT
import { AccordionWrapper } from "./styles";

// ==========================================
interface AccordionProps {
  expanded?: boolean;
  children: ReactElement[] | any;
}
// ==========================================

export default function Accordion({ expanded = false, children }: AccordionProps) {
  const [open, setOpen] = useState(expanded);

  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  const modifiedChildren = useMemo(() => {
    return Children.map(children, (child, ind) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (ind === 0 && isValidElement<any>(child)) {
        return cloneElement(child, { open, onClick: toggle });
      }
      return child;
    });
  }, [children, open]);

  const [header, ...content] = Children.toArray(modifiedChildren);

  return (
    <AccordionWrapper open={open}>
      {header}
      {content.length ? (
        <div className="accordion-content">
          <div>{content}</div>
        </div>
      ) : null}
    </AccordionWrapper>
  );
}
