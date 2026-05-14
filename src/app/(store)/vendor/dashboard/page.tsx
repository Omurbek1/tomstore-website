import { Fragment } from "react";
import { IconDeviceAnalytics } from "@tabler/icons-react";
import { getTranslations } from "next-intl/server";
// API FUNCTIONS
import api from "@utils/__api__/dashboard";
// GLOBAL CUSTOM COMPONENTS
import DashboardPageHeader from "@component/DashboardPageHeader";
// PAGE SECTION COMPONENTS
import DashboardContent from "@sections/vendor-dashboard/dashboard";

export default async function VendorDashboard() {
  const t = await getTranslations("dashboard");
  const [sales, summeryCards, countrySales] = await Promise.all([
    api.getSales(),
    api.getSummeryCards(),
    api.getCountryBasedSales()
  ]);

  return (
    <Fragment>
      <DashboardPageHeader title={t("headers.dashboard")} Icon={<IconDeviceAnalytics size={24} />} />
      <DashboardContent sales={sales} summeryCards={summeryCards} countrySales={countrySales} />
    </Fragment>
  );
}
