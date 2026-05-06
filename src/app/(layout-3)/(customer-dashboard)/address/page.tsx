import { Fragment } from "react";
import { IconMapPin } from "@tabler/icons-react";
import { getTranslations } from "next-intl/server";
// API FUNCTIONS
import api from "@utils/__api__/address";
// GLOBAL CUSTOM COMPONENTS
import { Button } from "@component/buttons";
import DashboardPageHeader from "@component/DashboardPageHeader";
// PAGE SECTION COMPONENTS
import { AddressItem, AddressPagination } from "@sections/customer-dashboard/address";
import { Link } from "@i18n/navigation";

export default async function AddressList() {
  const addressList = await api.getAddressList();
  const t = await getTranslations("dashboard");
  const headerLink = (
    <Link href="/address/create">
      <Button color="primary">{t("buttons.addNewAddress")}</Button>
    </Link>
  );

  return (
    <Fragment>
      <DashboardPageHeader
        title={t("headers.myAddresses")}
        button={headerLink}
        Icon={<IconMapPin size={27} />}
      />

      {addressList.map((item) => (
        <AddressItem item={item} />
      ))}

      <AddressPagination addressList={addressList} />
    </Fragment>
  );
}
