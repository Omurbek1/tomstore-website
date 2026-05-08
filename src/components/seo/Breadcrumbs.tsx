"use client";
import Link from "next/link";
import styled from "styled-components";
import { Fragment } from "react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tomstore.kg";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
  locale: string;
}

const Wrapper = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.muted};
  margin-bottom: 1rem;

  a {
    color: ${({ theme }) => theme.colors.text.muted};
    text-decoration: none;
    &:hover {
      color: ${({ theme }) => theme.colors.primary.main};
      text-decoration: underline;
    }
  }

  .sep {
    color: ${({ theme }) => theme.colors.text.disabled};
    user-select: none;
  }
`;

export default function Breadcrumbs({ items, locale }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}/${locale}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Wrapper aria-label="breadcrumb">
        {items.map((item, index) => (
          <Fragment key={index}>
            {index > 0 && <span className="sep">/</span>}
            {item.href && index < items.length - 1 ? (
              <Link href={`/${locale}${item.href}`}>{item.label}</Link>
            ) : (
              <span aria-current={index === items.length - 1 ? "page" : undefined}>
                {item.label}
              </span>
            )}
          </Fragment>
        ))}
      </Wrapper>
    </>
  );
}
