import Box from "@component/Box";
import Container from "@component/Container";
import { Carousel } from "@component/carousel";
import { CarouselCard1 } from "@component/carousel-cards";
// API FUNCTIONS
import api from "@utils/__api__/market-1";

export default async function Section1() {
  const carouselData = await api.getMainCarousel();

  if (!carouselData.length) return null;
  const hasMultipleSlides = carouselData.length > 1;
  const [singleSlide] = carouselData;

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
            pauseOnHover
          >
            {carouselData.map((item) => (
              <CarouselCard1
                key={item.id}
                title={item.title}
                image={item.imgUrl}
                buttonText={item.buttonText}
                buttonLink={item.buttonLink}
                description={item.description}
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
