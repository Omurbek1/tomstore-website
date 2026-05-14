import { Fragment } from "react";
import { IconShoppingBagCheck } from "@tabler/icons-react";
import { getTranslations } from "next-intl/server";
// API FUNCTIONS
import api from "@utils/__api__/orders";
import DashboardPageHeader from "@component/DashboardPageHeader";
import OrdersTable from "@component/orders/OrdersTable";

export default async function OrderList() {
  const orderList = await api.getOrders();
  const t = await getTranslations("dashboard");

  return (
    <Fragment>
      <DashboardPageHeader title={t("headers.myOrders")} Icon={<IconShoppingBagCheck size={27} />} />
      <OrdersTable orders={orderList} basePath="/orders" />
    </Fragment>
  );
}
