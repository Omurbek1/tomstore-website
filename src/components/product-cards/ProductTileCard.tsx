import Link from "next/link";
import HoverBox from "@component/HoverBox";
import { H4 } from "@component/Typography";
import NextImage from "@component/NextImage";
import useCurrency from "@hook/useCurrency";
import { useLocale } from "next-intl";

// ========================================================
interface ProductTileCardProps {
  slug: string;
  title: string;
  price: number;
  imgUrl: string;
}
// ========================================================

export default function ProductTileCard({ imgUrl, title, price, slug }: ProductTileCardProps) {
  const locale = useLocale();
  const formatCurrency = useCurrency();
  return (
    <Link href={`/${locale}/product/${slug}`}>
      <HoverBox borderRadius={8} mb="0.5rem" display="flex">
        <NextImage src={imgUrl} width={181} height={181} alt={title} />
      </HoverBox>

      <H4 fontWeight="600" fontSize="14px" mb="0.25rem">
        {title}
      </H4>

      <H4 fontWeight="600" fontSize="14px" color="primary.main">
        {formatCurrency(price)}
      </H4>
    </Link>
  );
}
