"use client";

import { useRef, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { SpaceProps } from "styled-system";
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconLineDotted } from "@tabler/icons-react";

import { Button } from "@component/buttons";
import { StyledPagination } from "./styles";

// ==============================================================
export interface PaginationProps extends SpaceProps {
  pageCount: number;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  onChange?: (data: number) => void;
  prevAriaLabel?: string;
  nextAriaLabel?: string;
}
// ==============================================================

export default function Pagination({
  onChange,
  pageCount,
  pageRangeDisplayed,
  marginPagesDisplayed,
  prevAriaLabel = "Предыдущая страница",
  nextAriaLabel = "Следующая страница",
  ...props
}: PaginationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // react-paginate renders <ul> with list-style-type:none; VoiceOver strips
  // list semantics in that case, so we explicitly restore role="list"
  useEffect(() => {
    containerRef.current?.querySelector("ul")?.setAttribute("role", "list");
  }, []);

  const handlePageChange = async (page: any) => {
    if (onChange) onChange(page.selected);
  };

  const PREVIOUS_BUTTON = (
    <Button
      height="auto"
      padding="6px"
      color="primary"
      overflow="hidden"
      className="control-button"
      aria-label={prevAriaLabel}>
      <IconArrowNarrowLeft size={18} aria-hidden="true" />
    </Button>
  );

  const NEXT_BUTTON = (
    <Button
      height="auto"
      padding="6px"
      color="primary"
      overflow="hidden"
      className="control-button"
      aria-label={nextAriaLabel}>
      <IconArrowNarrowRight size={18} aria-hidden="true" />
    </Button>
  );

  const BREAK_LABEL = <IconLineDotted size={20} aria-hidden="true" />;

  return (
    <StyledPagination ref={containerRef} {...props}>
      <ReactPaginate
        pageCount={pageCount}
        nextLabel={NEXT_BUTTON}
        breakLabel={BREAK_LABEL}
        activeClassName="active"
        disabledClassName="disabled"
        containerClassName="pagination"
        previousLabel={PREVIOUS_BUTTON}
        onPageChange={handlePageChange}
        pageRangeDisplayed={pageRangeDisplayed}
        marginPagesDisplayed={marginPagesDisplayed}
      />
    </StyledPagination>
  );
}
