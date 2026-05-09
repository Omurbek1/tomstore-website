"use client";

import { useTheme } from "styled-components";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Typography, { H3, H4, SemiSpan } from "@component/Typography";
import { ProductVariant } from "@models/product.model";

type Props = { variant: ProductVariant };

type SpecSection = {
  type: "specs";
  title?: string;
  items: Array<{ label: string; value: string }>;
};

type ListSection = {
  type: "list";
  title?: string;
  icon: "bullet" | "check";
  items: string[];
};

type Section = SpecSection | ListSection;

function parseDescription(description: string): Section[] {
  const lines = description.split("\n");
  const sections: Section[] = [];
  let current: Section | null = null;

  const flush = () => {
    if (!current) return;
    const hasContent =
      current.type === "specs"
        ? current.items.length > 0
        : current.items.length > 0;
    if (hasContent) sections.push(current);
    current = null;
  };

  for (const raw of lines) {
    const line = raw.trim();

    if (!line) { flush(); continue; }

    // Section header "Подходит для:", "Преимущества:"
    if (/^[А-Яа-яёA-Za-z][^•✓\n]{0,50}:$/.test(line)) {
      flush();
      const title = line.replace(/:$/, "");
      const icon = /преимущ|advantage/i.test(title) ? "check" : "bullet";
      current = { type: "list", title, icon, items: [] };
      continue;
    }

    // Bullet •
    if (line.startsWith("•")) {
      if (!current || current.type !== "list") { flush(); current = { type: "list", icon: "bullet", items: [] }; }
      (current as ListSection).items.push(line.replace(/^•\s*/, ""));
      continue;
    }

    // Checkmark ✓
    if (line.startsWith("✓")) {
      if (!current || current.type !== "list") { flush(); current = { type: "list", icon: "check", items: [] }; }
      if ((current as ListSection).icon !== "check") { flush(); current = { type: "list", icon: "check", items: [] }; }
      (current as ListSection).items.push(line.replace(/^✓\s*/, ""));
      continue;
    }

    // "Name: Value" spec
    const ci = line.indexOf(":");
    if (ci > 0) {
      const lbl = line.slice(0, ci).trim();
      const val = line.slice(ci + 1).trim();
      if (lbl && val) {
        if (!current || current.type !== "specs") { flush(); current = { type: "specs", items: [] }; }
        (current as SpecSection).items.push({ label: lbl, value: val });
        continue;
      }
    }
  }

  flush();
  return sections;
}

export default function ProductVariantDetails({ variant }: Props) {
  const theme = useTheme();
  const description = String(variant.description || "").trim();
  const sections = description ? parseDescription(description) : [];

  return (
    <Box>
      {/* Variant title badge */}
      <Box
        mb="1.5rem"
        px="1.25rem"
        py="0.75rem"
        borderRadius="16px"
        display="inline-flex"
        flexDirection="column"
        style={{
          background: theme.colors.primary.light,
          border: `1px solid ${theme.colors.primary.main}`,
          gap: 4,
        }}
      >
        <SemiSpan style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }} color="primary.main">
          Выбранная конфигурация
        </SemiSpan>
        <H3 style={{ fontSize: 18, margin: 0 }} color="text.primary">
          {variant.title}
        </H3>
      </Box>

      {sections.length === 0 ? (
        <Typography color="text.muted">Характеристики этого варианта скоро появятся.</Typography>
      ) : (
        <Box display="flex" flexDirection="column" style={{ gap: 20 }}>
          {sections.map((section, si) => (
            <Box key={si} bg="body.paper" borderRadius="12px" shadow={1} p="1.5rem">
              {section.title && (
                <H4
                  mb="1rem"
                  fontSize="13px"
                  color="text.primary"
                  style={{ textTransform: "uppercase", letterSpacing: "0.07em" }}
                >
                  {section.title}
                </H4>
              )}

              {section.type === "specs" && (
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
                  gridGap="10px"
                >
                  {section.items.map((item) => (
                    <Box
                      key={`${item.label}-${item.value}`}
                      border="1px solid"
                      borderColor="gray.300"
                      borderRadius="12px"
                      p="0.875rem"
                      bg="gray.100"
                    >
                      <SemiSpan
                        display="block"
                        mb="0.35rem"
                        fontSize="11px"
                        fontWeight={700}
                        color="text.hint"
                        style={{ letterSpacing: "0.06em", textTransform: "uppercase" }}
                      >
                        {item.label}
                      </SemiSpan>
                      <Typography fontWeight={600} color="text.primary" lineHeight="1.5">
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}

              {section.type === "list" && (
                <Box display="grid" gridGap="8px">
                  {section.items.map((text, ii) => (
                    <FlexBox key={ii} alignItems="flex-start" style={{ gap: 10 }}>
                      <FlexBox
                        width="22px"
                        height="22px"
                        minWidth="22px"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius="999px"
                        style={{
                          background: section.icon === "check"
                            ? theme.colors.success.light
                            : "rgba(78, 151, 253, 0.15)",
                          color: section.icon === "check"
                            ? theme.colors.success.main
                            : theme.colors.blue.main,
                          fontSize: 13,
                          fontWeight: 700,
                          marginTop: 1,
                        }}
                      >
                        {section.icon === "check" ? "✓" : "•"}
                      </FlexBox>
                      <Typography color="text.primary" lineHeight="1.6" style={{ fontSize: 14 }}>
                        {text}
                      </Typography>
                    </FlexBox>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
