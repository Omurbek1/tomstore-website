import Box from "@component/Box";
import Card from "@component/Card";
import Chip from "@component/Chip";
import NextImage from "@component/NextImage";

// ===========================================================================
type CategoryPromoCardProps = {
  title: string;
  imgUrl: string;
  subtitle: string;
  priority?: boolean;
};
// ===========================================================================

const CategoryPromoCard = ({
  title,
  subtitle,
  imgUrl,
  priority = false,
}: CategoryPromoCardProps) => {
  const imageSrc = imgUrl || "/assets/images/banners/category-1.webp";

  return (
    <Card
      position="relative"
      padding="0"
      borderRadius={8}
      overflow="hidden"
      height="100%"
      style={{ minHeight: 160 }}
    >
      <Box position="relative" width="100%" style={{ height: "100%", minHeight: 160 }}>
        <NextImage
          src={imageSrc}
          fill
          alt={title}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          quality={80}
          optimizedWidth={720}
          style={{ objectFit: "cover" }}
          sizes="(max-width: 650px) 100vw, (max-width: 959px) 50vw, 33vw"
        />

        <Box
          zIndex={2}
          top="1rem"
          left="1rem"
          right="1rem"
          display="flex"
          position="absolute"
          flexDirection="column"
          alignItems="flex-start"
          style={{ gap: 6 }}
        >
          <Chip
            p="4px 10px"
            color="white"
            fontSize="10px"
            fontWeight="600"
            bg="secondary.main"
            style={{
              maxWidth: "100%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </Chip>

          {subtitle ? (
            <Chip
              p="4px 10px"
              bg="gray.300"
              fontSize="10px"
              color="gray.800"
              fontWeight="600"
              style={{
                maxWidth: "100%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {subtitle}
            </Chip>
          ) : null}
        </Box>
      </Box>
    </Card>
  );
};

export default CategoryPromoCard;
