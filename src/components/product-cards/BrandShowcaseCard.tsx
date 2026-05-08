import HoverBox from "@component/HoverBox";
import Typography from "@component/Typography";
import NextImage from "@component/NextImage";

// ====================================================================
type BrandShowcaseCardProps = { imgUrl: string; title: string };
// ====================================================================

export default function BrandShowcaseCard({ imgUrl, title }: BrandShowcaseCardProps) {
  return (
    <div>
      <HoverBox borderRadius={5} mb="0.5rem" display="flex">
        <NextImage alt={title} src={imgUrl} width={260} height={175} />
      </HoverBox>

      <Typography fontSize="14px" fontWeight="600">
        {title}
      </Typography>
    </div>
  );
}
