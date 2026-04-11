import { Fragment } from "react";
import { IconCreditCard } from "@tabler/icons-react";
import { getTranslations } from "next-intl/server";
// GLOBAL CUSTOM COMPONENTS
import { Button } from "@component/buttons";
import DashboardPageHeader from "@component/DashboardPageHeader";
// PAGE SECTION COMPONENTS
import { PaymentMethodList } from "@sections/customer-dashboard/payment-method";
import { Link } from "i18n/navigation";

export default async function PaymentMethods() {
  const t = await getTranslations("dashboard");
  const headerLink = (
    <Link href="/payment-methods/add">
      <Button color="primary">{t("buttons.addNew")}</Button>
    </Link>
  );

  return (
    <Fragment>
      <DashboardPageHeader
        button={headerLink}
        title={t("headers.paymentMethods")}
        Icon={<IconCreditCard size={27} />}
      />

      <PaymentMethodList methodList={methodList} />
    </Fragment>
  );
}

const methodList = [
  {
    orderNo: "1050017AS",
    exp: "08 / 2022",
    payment_method: "Amex",
    card_no: "1234 **** **** ****"
  },
  {
    orderNo: "1050017AS",
    exp: "10 / 2025",
    payment_method: "Mastercard",
    card_no: "1234 **** **** ****"
  },
  {
    orderNo: "1050017AS",
    exp: "N/A",
    payment_method: "PayPal",
    card_no: "ui-lib@email.com"
  },
  {
    orderNo: "1050017AS",
    exp: "08 / 2022",
    payment_method: "Visa",
    card_no: "1234 **** **** ****"
  }
];
