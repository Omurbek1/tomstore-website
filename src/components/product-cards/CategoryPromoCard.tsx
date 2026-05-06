import Box from "@component/Box";
import Card from "@component/Card";
import Chip from "@component/Chip";
import NextImage from "@component/NextImage";

// ===========================================================================
type CategoryPromoCardProps = {
  title: string;
  imgUrl: string;
  subtitle: string;
};
// ===========================================================================

const CategoryPromoCard = ({ title, subtitle, imgUrl }: CategoryPromoCardProps) => {
  return (
    <Card position="relative" padding="1rem" borderRadius={8} overflow="hidden">
      <Box
        zIndex={2}
        top="1.5rem"
        left="1.5rem"
        right="1.5rem"
        display="flex"
        position="absolute"
        flexDirection="column"
        alignItems="flex-start"
        style={{ gap: 6 }}>
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
          }}>
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
            }}>
            {subtitle}
          </Chip>
        ) : null}
      </Box>

      <Box borderRadius={8} display="flex" overflow="hidden">
        <NextImage src={imgUrl} width={345} height={120} alt={title} />
      </Box>
    </Card>
  );
};

export default CategoryPromoCard;
