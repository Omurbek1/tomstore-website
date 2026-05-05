"use client";

import Container from "@component/Container";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import { H2, Paragraph } from "@component/Typography";

type LocaleErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function LocaleError({ error, reset }: LocaleErrorProps) {
  console.error("[app] Route render failed", error);

  return (
    <Container py="5rem">
      <FlexBox
        mx="auto"
        maxWidth="520px"
        alignItems="center"
        flexDirection="column"
        textAlign="center">
        <H2 mb="1rem">Страница временно недоступна</H2>
        <Paragraph mb="1.5rem" color="text.muted">
          Данные не загрузились. Попробуйте обновить страницу.
        </Paragraph>
        <Button variant="contained" color="primary" onClick={reset}>
          Обновить
        </Button>
      </FlexBox>
    </Container>
  );
}
