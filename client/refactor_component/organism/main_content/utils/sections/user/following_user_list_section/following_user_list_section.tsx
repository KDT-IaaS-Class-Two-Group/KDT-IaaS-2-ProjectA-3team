import withCardSection from "client/refactor_component/organism/card/utils/with_card_section";
import React from "react";
import MainContentProps from "client/refactor_component/organism/main_content/props/main_content.props";
import { section } from "client/styles/admin/admindashboard.css";
import { favsection } from "client/styles/users/userdashboard.css";
import FollowingUserList from "./components/following_user_list";
const FollowingUserListSection = withCardSection(FollowingUserList, {
  sectionClassName: `${section} ${favsection}`,
  title: "Following Users",
  buttonText: "View Users",
  onClick: (props: MainContentProps) => {
    return null; // 특별한 동작이 필요하지 않은 경우
  },
});

export default FollowingUserListSection;
