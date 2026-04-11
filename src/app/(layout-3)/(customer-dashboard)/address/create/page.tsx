import { Button } from "antd";
import { Fragment } from "react";
import { IconMapPin } from "@tabler/icons-react";
import { getTranslations } from "next-intl/server";
// GLOBAL CUSTOM COMPONENTS
import { Card1 } from "@component/Card1";
import DashboardPageHeader from "@component/DashboardPageHeader";
import { Link } from "i18n/navigation";
// PAGE SECTION COMPONENTS
import { AddressForm } from "@sections/customer-dashboard/address";

export default async function CreateAddress() {
  const t = await getTranslations("dashboard");
  const headerLink = (
    <Link href="/address">
      <Button>{t("buttons.back")}</Button>
    </Link>
  );

  return (
    <Fragment>
      <DashboardPageHeader
        button={headerLink}
        title={t("headers.addAddress")}
        Icon={<IconMapPin size={27} />}
      />

      <Card1 borderRadius={12}>
        <AddressForm />
      </Card1>
    </Fragment>
  );
}
