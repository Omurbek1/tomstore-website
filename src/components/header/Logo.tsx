import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/assets/images/logo.svg"
      alt="TomStore"
      width={140}
      height={40}
      priority
      className="site-logo"
      style={{ display: "block", objectFit: "contain", objectPosition: "left center" }}
    />
  );
}
