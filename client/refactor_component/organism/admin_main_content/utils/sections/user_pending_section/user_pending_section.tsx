import withCardSection from "client/refactor_component/organism/card/utils/with_card_section";
import React from "react";
import AdminMainContentProps from "../../../props/admin_main_content.props";
import { section } from "client/styles/admin/admindashboard.css";
import { requestSection } from "client/styles/admin/requests/requests.css";
import PendingUsersList from "client/components/PendingUsersList";
import PendingUserLook from "client/refactor_component/template/user_approval/pending_user_approval";

const UserPendingSection = withCardSection(PendingUsersList, {
  sectionClassName: `${section} ${requestSection}`,
  title: "User Sign up Management",
  buttonText: "View Pending Users",
  onClick: (props: AdminMainContentProps) => {
    props.onClick(<PendingUserLook />);
    return null;
  },
});
export default UserPendingSection;
