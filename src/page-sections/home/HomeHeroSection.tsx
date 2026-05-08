import Box from "@component/Box";
import Container from "@component/Container";
import { HeroBannerCard } from "@component/carousel-cards";
import type { StorefrontHeroCarouselItem } from "@utils/__api__/storefront";

type HomeHeroSectionProps = {
  slides: StorefrontHeroCarouselItem[];
};

export default function HomeHeroSection({ slides }: HomeHeroSectionProps) {
  if (!slides.length) return null;

  const [singleSlide] = slides;

  return (
    <Box bg="gray.white" mb="3.75rem">
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
    </Box>
  );
}
