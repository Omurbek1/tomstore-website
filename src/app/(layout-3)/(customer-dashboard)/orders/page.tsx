import { Fragment } from "react";
import { IconShoppingBagCheck } from "@tabler/icons-react";
// API FUNCTIONS
import api from "@utils/__api__/orders";
// GLOBAL CUSTOM COMPONENTS
import Hidden from "@component/hidden";
import TableRow from "@component/TableRow";
import { H5 } from "@component/Typography";
import DashboardPageHeader from "@component/DashboardPageHeader";
// PAGE SECTION COMPONENTS
import { OrderRow, OrdersPagination } from "@sections/customer-dashboard/orders";

const ORDER_HEADERS = ["Order #", "Status", "Date purchased", "Total"];

export default async function OrderList() {
  const orderList = await api.getOrders();

  return (
    <Fragment>
      <DashboardPageHeader title="My Orders" Icon={<IconShoppingBagCheck size={27} />} />

      <Hidden down={769}>
        <TableRow boxShadow="none" padding="0px 18px" backgroundColor="transparent">
          {ORDER_HEADERS.map((item) => (
            <H5 key={item} fontWeight={500} color="text.muted" my="0px" mx="6px" textAlign="left">
              {item}
            </H5>
          ))}

          <H5 flex="0 0 0 !important" fontWeight={500} color="text.muted" px="22px" my="0px" />
        </TableRow>
      </Hidden>

      {orderList.map((item) => (
        <OrderRow order={item} key={item.id} />
      ))}

      <OrdersPagination orderList={orderList} />
    </Fragment>
  );
}
