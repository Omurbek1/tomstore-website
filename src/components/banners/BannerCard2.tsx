import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
// GLOBAL CUSTOM COMPONENTS
import { Button } from "@component/buttons";
import { H1, H3, Paragraph } from "@component/Typography";

// STYLED COMPONENTS
const CardWrapper = styled("div")({
  maxHeight: 240,
  overflow: "hidden",
  borderRadius: "10px",
  position: "relative",
  "& img": { transition: "0.3s" },
  "&:hover": { img: { transform: "scale(1.1)" } }
});

const CardContent = styled("div")({
  top: 0,
  zIndex: 1,
  padding: 32,
  width: "100%",
  color: "#fff",
  height: "100%",
  display: "flex",
  position: "absolute",
  alignItems: "center",
  justifyContent: "space-between"
});

// ========================================================
type BannerCard2Props = {
  img: string;
  url: string;
  text1: string;
  text2: string;
  text3: string;
};
// ========================================================

export default function BannerCard2({ img, url, text1, text2, text3 }: BannerCard2Props) {
  return (
    <CardWrapper>
      <Image
        alt="category"
        src={img}
        width={900}
        height={300}
        quality={80}
        sizes="100vw"
        loading="lazy"
        style={{ width: "100%", height: "auto", display: "block" }}
      />

      <CardContent>
        <div>
          <Paragraph fontWeight={600}>{text1}</Paragraph>
          <H3>{text2}</H3>
          <H1 fontSize={52} lineHeight={1}>
            {text3}
          </H1>
        </div>

        <Link href={url}>
          <Button variant="outlined" color="primary">
            Shop Now
          </Button>
        </Link>
      </CardContent>
    </CardWrapper>
  );
}
