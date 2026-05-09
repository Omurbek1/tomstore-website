"use client";

import styled from "styled-components";
import Container from "@component/Container";
import { HeroBannerCard } from "@component/carousel-cards";
import type { StorefrontHeroCarouselItem } from "@utils/__api__/storefront";

type HomeHeroSectionProps = {
  slides: StorefrontHeroCarouselItem[];
};

const HeroWrapper = styled.section`
  margin-bottom: 3.75rem;
  background: ${({ theme }) =>
    theme.isDark
      ? `
        radial-gradient(ellipse at 68% 45%, rgba(200, 30, 58, 0.08) 0%, transparent 55%),
        linear-gradient(160deg,
          ${theme.colors.body.default} 0%,
          ${theme.colors.secondary[100]} 55%,
          ${theme.colors.body.default} 100%)
      `
      : theme.colors.gray.white};
`;

export default function HomeHeroSection({ slides }: HomeHeroSectionProps) {
  if (!slides.length) return null;

  const [singleSlide] = slides;

  return (
    <HeroWrapper>
      <Container pb="3rem">
        <HeroBannerCard
          title={singleSlide.title}
          image={singleSlide.imgUrl}
          mobileImage={singleSlide.mobileImgUrl}
          buttonText={singleSlide.buttonText}
          buttonLink={singleSlide.buttonLink}
          description={singleSlide.description}
          priority
        />
      </Container>
    </HeroWrapper>
  );
}
