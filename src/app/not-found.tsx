"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";

export default function NotFound() {
  const router = useRouter();
  const handleGoBack = () => router.back();

  return (
    <FlexBox
      px="1rem"
      minHeight="100vh"
      alignItems="center"
      flexDirection="column"
      justifyContent="center">
      <Image
        src="/assets/images/illustrations/not-found.svg"
        alt="Not found"
        width={320}
        height={240}
        unoptimized
        style={{ width: "100%", maxWidth: 320, height: "auto", marginBottom: "2rem" }}
      />

      <FlexBox flexWrap="wrap">
        <Button variant="outlined" color="primary" m="0.5rem" onClick={handleGoBack}>
          Go Back
        </Button>

        <Link href="/">
          <Button variant="contained" color="primary" m="0.5rem">
            Go to Home
          </Button>
        </Link>
      </FlexBox>
    </FlexBox>
  );
}
