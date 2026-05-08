"use client";
import styled from "styled-components";
import categoryDescriptions from "@data/categoryDescriptions";
import categoryFaqs from "@data/categoryFaqs";

interface Props {
  catalogPath: string; // e.g. "/catalog/laptops"
  locale: string;
}

const DescriptionBox = styled.div`
  background: ${({ theme }) => theme.colors.body.paper};
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;

  h2 {
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 0.75rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  p {
    font-size: 14px;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0;
  }
`;

const FaqBox = styled.div`
  background: ${({ theme }) => theme.colors.body.paper};
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2.5rem;

  h2 {
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 1.25rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const FaqItem = styled.details`
  border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
  padding: 0.85rem 0;

  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  }

  summary {
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text.primary};
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;

    &::-webkit-details-marker { display: none; }

    &::after {
      content: "+";
      font-size: 18px;
      font-weight: 400;
      flex-shrink: 0;
      color: ${({ theme }) => theme.colors.text.muted};
    }
  }

  &[open] summary::after {
    content: "−";
  }

  p {
    font-size: 13px;
    line-height: 1.65;
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0.65rem 0 0;
  }
`;

const faqTitles: Record<string, string> = {
  ru: "Часто задаваемые вопросы",
  en: "Frequently Asked Questions",
  ky: "Көп берилүүчү суроолор",
};

export default function CategorySeo({ catalogPath, locale }: Props) {
  const safeLocale = (locale === "ru" || locale === "en" || locale === "ky" ? locale : "ru") as
    | "ru"
    | "en"
    | "ky";

  const descData = categoryDescriptions[catalogPath]?.[safeLocale];
  const faqs = categoryFaqs[catalogPath]?.[safeLocale];

  if (!descData && !faqs) return null;

  const faqSchema = faqs
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  return (
    <>
      {descData && (
        <DescriptionBox>
          <h2>{descData.title}</h2>
          <p>{descData.description}</p>
        </DescriptionBox>
      )}

      {faqs && faqs.length > 0 && (
        <>
          {faqSchema && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
          )}
          <FaqBox>
            <h2>{faqTitles[safeLocale]}</h2>
            {faqs.map((faq, i) => (
              <FaqItem key={i}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </FaqItem>
            ))}
          </FaqBox>
        </>
      )}
    </>
  );
}
