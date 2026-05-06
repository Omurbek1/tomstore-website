import styled from "styled-components";
import Link from "next/link";
import Typography from "@component/Typography";
import { JSX } from "react/jsx-runtime";

// STYLED COMPONENT
const StyledCarouselCard1 = styled.div`
  display: flex;
  text-align: left;
  min-height: 360px;
  align-items: center;
  padding: 2rem 0;
  justify-content: space-between;
  gap: 2rem;

  .content {
    max-width: 500px;
    .title {
      font-size: 50px;
      margin-top: 0px;
      line-height: 1.2;
      margin-bottom: 1.35rem;
    }
  }

  .image-holder {
    position: relative;
    flex: 0 0 min(38%, 380px);
    img {
      width: 100%;
      height: auto;
      display: block;
      object-fit: contain;
    }
  }

  @media only screen and (max-width: 900px) {
    min-height: 300px;

    .title {
      font-size: 32px;
    }
  }

  @media only screen and (max-width: 425px) {
    .title {
      font-size: 16px;
    }
    .title + * {
      font-size: 13px;
    }
    .button-link {
      font-size: 13px;
      padding: 0.66rem 0.95rem;
    }
  }
`;

const buttonStyles = ({ theme }: any) => ({
  width: "fit-content",
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem 1.5rem",
  borderRadius: "0.5rem",
  color: theme.colors?.primary?.text || "#FFFFFF",
  backgroundColor: theme.colors?.primary?.main || "#E94560",
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 1,
  textDecoration: "none",
  transition: "all 150ms ease-in-out",
});

const InternalButtonLink = styled(Link)(buttonStyles);
const ExternalButtonLink = styled.a(buttonStyles);

// ===============================================
interface Props {
  title: string | undefined;
  image: string | undefined;
  buttonLink?: string;
  buttonText: string | string[] | JSX.Element | undefined;
  description: string | string[] | JSX.Element | undefined;
}
// ===============================================

const isExternalUrl = (href?: string) => /^https?:\/\//.test(String(href || ""));

export default function CarouselCard1({
  title,
  image,
  buttonLink,
  buttonText,
  description,
}: Props) {
  return (
    <StyledCarouselCard1>
      <div className="content">
        <h1 className="title">{title}</h1>
        <Typography color="secondary.main" mb="1.35rem">
          {description}
        </Typography>

        {buttonLink && buttonText ? (
          isExternalUrl(buttonLink) ? (
            <ExternalButtonLink
              className="button-link"
              href={buttonLink}
              rel="noreferrer"
              target="_blank">
              {buttonText}
            </ExternalButtonLink>
          ) : (
            <InternalButtonLink className="button-link" href={buttonLink}>
              {buttonText}
            </InternalButtonLink>
          )
        ) : null}
      </div>

      {image ? (
        <div className="image-holder">
          <img src={image} alt={title || "banner"} />
        </div>
      ) : null}
    </StyledCarouselCard1>
  );
}
