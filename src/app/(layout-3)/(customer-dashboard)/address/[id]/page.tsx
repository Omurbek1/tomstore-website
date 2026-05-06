import { Button } from "antd";
import { Fragment } from "react";
import { IconMapPin } from "@tabler/icons-react";
import { getTranslations } from "next-intl/server";
// API FUNCTIONS
import api from "@utils/__api__/address";
// GLOBAL CUSTOM COMPONENTS
import { Card1 } from "@component/Card1";
import DashboardPageHeader from "@component/DashboardPageHeader";
import { Link } from "@i18n/navigation";
// PAGE SECTION COMPONENTS
import { AddressForm } from "@sections/customer-dashboard/address";
// CUSTOM DATA MODEL
import { IDParams } from "interfaces";

const AddressDetails = async ({ params }: IDParams) => {
  const { id } = await params;
  const address = await api.getAddress(id);
  const t = await getTranslations("dashboard");
  const headerLink = (
    <Link href="/address">
      <Button>{t("buttons.back")}</Button>
    </Link>
  );

  return (
    <Fragment>
      <DashboardPageHeader
        title={t("headers.editAddress")}
        button={headerLink}
        Icon={<IconMapPin size={27} />}
      />

      <Card1 borderRadius={12}>
        <AddressForm address={address} />
      </Card1>
    </Fragment>
  );
};

export default AddressDetails;
