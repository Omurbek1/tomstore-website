import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/assets/images/logo.svg"
      alt="TomStore"
      width={240}
      height={240}
      priority
      unoptimized
      className="site-logo"
      style={{ display: "block", objectFit: "contain", objectPosition: "left center" }}
    />
  );
}
