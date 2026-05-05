import Box from "@component/Box";
import Container from "@component/Container";
import { Carousel } from "@component/carousel";
import { CarouselCard1 } from "@component/carousel-cards";
import type { StorefrontHeroCarouselItem } from "@utils/__api__/storefront";

type HomeHeroSectionProps = {
  slides: StorefrontHeroCarouselItem[];
};

export default function HomeHeroSection({ slides }: HomeHeroSectionProps) {
  if (!slides.length) return null;

  const hasMultipleSlides = slides.length > 1;
  const [singleSlide] = slides;

  return (
    <Box bg="gray.white" mb="3.75rem">
      <Container pb="3rem">
        {hasMultipleSlides ? (
          <Carousel
            dots
            autoplay
            infinite
            swipe
            draggable
            swipeToSlide
            arrows={false}
            slidesToShow={1}
            autoplaySpeed={4500}
            speed={500}
            pauseOnHover>
            {slides.map((slide) => (
              <CarouselCard1
                key={slide.id}
                title={slide.title}
                image={slide.imgUrl}
                buttonText={slide.buttonText}
                buttonLink={slide.buttonLink}
                description={slide.description}
              />
            ))}
          </Carousel>
        ) : (
          <CarouselCard1
            title={singleSlide.title}
            image={singleSlide.imgUrl}
            buttonText={singleSlide.buttonText}
            buttonLink={singleSlide.buttonLink}
            description={singleSlide.description}
          />
        )}
      </Container>
    </Box>
  );
}
