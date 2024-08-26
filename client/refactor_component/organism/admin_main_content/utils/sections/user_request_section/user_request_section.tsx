import withCardSection from "client/refactor_component/organism/card/utils/with_card_section";
import React from "react";
import AdminMainContentProps from "../../../props/admin_main_content.props";
import CheckUsersCount from "client/components/checktest";
import UserRequest from "client/refactor_component/template/user_profile_requests/profile_request_admin";
import { section } from "client/styles/admin/admindashboard.css";
import { requestSection } from "client/styles/admin/requests/requests.css";

const UserRequestSection = withCardSection(CheckUsersCount, {
  sectionClassName: `${section} ${requestSection}`,
  title: "User Request Management",
  buttonText: "View Requests",
  onClick: (props: AdminMainContentProps) => {
    props.onClick(<UserRequest />);
    return null;
  },
});

export default UserRequestSection;
