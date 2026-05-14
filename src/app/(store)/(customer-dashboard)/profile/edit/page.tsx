import { Button } from "antd";
import { Fragment } from "react";
import { IconUserFilled } from "@tabler/icons-react";
import { getTranslations } from "next-intl/server";
// API FUNCTIONS
import api from "@utils/__api__/users";
// GLOBAL CUSTOM COMPONENTS
import { Card1 } from "@component/Card1";
import DashboardPageHeader from "@component/DashboardPageHeader";
import { Link } from "@i18n/navigation";
// PAGE SECTION COMPONENTS
import { ProfileEditForm } from "@sections/customer-dashboard/profile";

export default async function ProfileEditor() {
  const user = await api.getUser();
  const t = await getTranslations("dashboard");
  const headerLink = (
    <Link href="/profile">
      <Button>{t("buttons.back")}</Button>
    </Link>
  );

  return (
    <Fragment>
      <DashboardPageHeader
        Icon={<IconUserFilled size={27} />}
        title={t("headers.editProfile")}
        button={headerLink}
      />

      <Card1 borderRadius={12}>
        <ProfileEditForm user={user as any} />
      </Card1>
    </Fragment>
  );
}
