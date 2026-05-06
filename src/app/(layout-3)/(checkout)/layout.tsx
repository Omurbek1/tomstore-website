"use client";

import { Fragment, PropsWithChildren, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@i18n/navigation";
import Hidden from "@component/hidden";
import Stepper from "@component/Stepper";

const PATH_TO_STEP_MAP = {
  "/cart": 1,
  "/checkout": 2,
  "/payment": 3
};

export default function Layout({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("checkout.steps");
  const stepperList = [
    { title: t("cart"), disabled: false, path: "/cart" },
    { title: t("details"), disabled: false, path: "/checkout" },
    { title: t("payment"), disabled: false, path: "/payment" },
    { title: t("review"), disabled: true, path: "/orders" }
  ];

  const selectedStep = useMemo(() => PATH_TO_STEP_MAP[pathname] ?? 0, [pathname]);

  const handleStepChange = useCallback(
    (_step: unknown, index: number) => {
      const targetPath = stepperList[index]?.path;
      if (targetPath) {
        router.push(targetPath);
      }
    },
    [router, stepperList]
  );

  return (
    <Fragment>
      <Hidden down="md" mb="2rem">
        <Stepper
          stepperList={stepperList}
          selectedStep={selectedStep}
          onChange={handleStepChange}
        />
      </Hidden>

      {children}
    </Fragment>
  );
}
