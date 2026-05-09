import styled from "styled-components";
import { Link } from "@i18n/navigation";
import Typography from "@component/Typography";
import NextImage from "@component/NextImage";
import { JSX } from "react/jsx-runtime";

// STYLED COMPONENT
const StyledHeroBannerCard = styled.div`
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
      color: ${({ theme }) => theme.colors.text.primary};
    }
  }

  .image-holder {
    position: relative;
    flex: 0 0 min(38%, 380px);
    width: min(38%, 380px);
    min-height: 240px;
    aspect-ratio: 1 / 1;
  }

  .desktop-image,
  .mobile-image {
    position: absolute;
    inset: 0;
  }

  .mobile-image {
    display: none;
  }

  @media only screen and (max-width: 900px) {
    min-height: 260px;

    .content .title {
      font-size: 30px;
    }
  }

  @media only screen and (max-width: 600px) {
    flex-direction: column-reverse;
    gap: 1rem;
    padding: 1.5rem 0;
    min-height: unset;

    .content {
      max-width: 100%;
      text-align: center;
      .title {
        font-size: 22px;
        margin-bottom: 0.75rem;
        color: ${({ theme }) => theme.colors.text.primary};
      }
      p, span {
        font-size: 13px;
      }
    }

    .image-holder {
      flex: 0 0 auto;
      width: min(76vw, 240px);
      max-width: 240px;
      min-height: 190px;
      margin: 0 auto;
    }

    .desktop-image.has-mobile {
      display: none;
    }

    .mobile-image {
      display: block;
    }

    .button-link {
      font-size: 13px;
      padding: 0.6rem 1rem;
      margin: 0 auto;
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
  color: "#FFFFFF",
  backgroundColor: theme?.colors?.primary?.main || "#C81E3A",
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 1,
  textDecoration: "none",
  transition: "all 150ms ease-in-out",
  border: "1px solid transparent",
  "&:hover": {
    color: "#FFFFFF",
    backgroundColor: theme?.colors?.primary?.[900] || "#A1122B",
  },
  "&:focus-visible": {
    outline: `3px solid ${theme?.colors?.primary?.light || "#FFE1E6"}`,
    outlineOffset: 2,
  },
});

const InternalButtonLink = styled(Link)(buttonStyles);
const ExternalButtonLink = styled.a(buttonStyles);

// ===============================================
interface Props {
  title: string | undefined;
  image: string | undefined;
  mobileImage?: string;
  buttonLink?: string;
  buttonText: string | string[] | JSX.Element | undefined;
  description: string | string[] | JSX.Element | undefined;
  priority?: boolean;
}
// ===============================================

const isExternalUrl = (href?: string) => /^https?:\/\//.test(String(href || ""));
const HERO_FALLBACK_IMAGE = "/assets/images/banners/banner.png";

export default function HeroBannerCard({
  title,
  image,
  mobileImage,
  buttonLink,
  buttonText,
  description,
  priority = false,
}: Props) {
  const desktopImage = image || mobileImage || HERO_FALLBACK_IMAGE;
  const responsiveMobileImage = mobileImage || desktopImage;
  const hasMobileImage = Boolean(mobileImage && mobileImage !== desktopImage);

  return (
    <StyledHeroBannerCard>
      <div className="content">
        <h1 className="title">{title}</h1>
        <Typography color="text.secondary" mb="1.35rem">
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

      <div className="image-holder">
        <div className={`desktop-image${hasMobileImage ? " has-mobile" : ""}`}>
          <NextImage
            src={desktopImage}
            alt={title || "banner"}
            fill
            priority={priority}
            fetchPriority={priority ? "high" : "auto"}
            quality={80}
            optimizedWidth={1200}
            sizes="(max-width: 600px) 76vw, (max-width: 900px) 38vw, 380px"
            fallbackSrc={HERO_FALLBACK_IMAGE}
            style={{ objectFit: "contain" }}
          />
        </div>
        {hasMobileImage ? (
          <div className="mobile-image">
            <NextImage
              src={responsiveMobileImage}
              alt={title || "banner"}
              fill
              priority={priority}
              fetchPriority={priority ? "high" : "auto"}
              quality={80}
              optimizedWidth={720}
              sizes="76vw"
              fallbackSrc={desktopImage}
              style={{ objectFit: "contain" }}
            />
          </div>
        ) : null}
      </div>
    </StyledHeroBannerCard>
  );
}
