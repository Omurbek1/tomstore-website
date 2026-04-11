import { Fragment } from "react";
import { IconShoppingBagCheck } from "@tabler/icons-react";
import { getTranslations } from "next-intl/server";
// UTILS
import axios from "@lib/axios";
import DashboardPageHeader from "@component/DashboardPageHeader";
import OrdersTable from "@component/orders/OrdersTable";

export default async function Orders() {
  const t = await getTranslations("dashboard");
  const { data } = await axios.get("/api/admin/orders");

  return (
    <Fragment>
      <DashboardPageHeader title={t("headers.orders")} Icon={<IconShoppingBagCheck size={27} />} />
      <OrdersTable orders={data} basePath="/vendor/orders" />
    </Fragment>
  );
}
