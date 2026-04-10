import Link from "next/link";
import { Fragment } from "react";
import { IconUserFilled } from "@tabler/icons-react";
// API FUNCTIONS
import api from "@utils/__api__/users";
// GLOBAL CUSTOM COMPONENTS
import { Card1 } from "@component/Card1";
import { Button } from "@component/buttons";
import DashboardPageHeader from "@component/DashboardPageHeader";
// PAGE SECTION COMPONENTS
import { ProfileEditForm } from "@sections/customer-dashboard/profile";

const HEADER_LINK = (
  <Link href="/profile">
    <Button color="primary">Back</Button>
  </Link>
);

export default async function ProfileEditor() {
  const user = await api.getUser();

  return (
    <Fragment>
      <DashboardPageHeader
        Icon={<IconUserFilled size={27} />}
        title="Edit Profile"
        button={HEADER_LINK}
      />

      <Card1 borderRadius={12}>
        <ProfileEditForm user={user as any} />
      </Card1>
    </Fragment>
  );
}
