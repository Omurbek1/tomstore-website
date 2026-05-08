import Box from "@component/Box";
import Container from "@component/Container";
import { Carousel } from "@component/carousel";
import { HeroBannerCard } from "@component/carousel-cards";
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
            {slides.map((slide, index) => (
              <HeroBannerCard
                key={slide.id}
                title={slide.title}
                image={slide.imgUrl}
                mobileImage={slide.mobileImgUrl}
                buttonText={slide.buttonText}
                buttonLink={slide.buttonLink}
                description={slide.description}
                priority={index === 0}
              />
            ))}
          </Carousel>
        ) : (
          <HeroBannerCard
            title={singleSlide.title}
            image={singleSlide.imgUrl}
            mobileImage={singleSlide.mobileImgUrl}
            buttonText={singleSlide.buttonText}
            buttonLink={singleSlide.buttonLink}
            description={singleSlide.description}
            priority
          />
        )}
      </Container>
    </Box>
  );
}
