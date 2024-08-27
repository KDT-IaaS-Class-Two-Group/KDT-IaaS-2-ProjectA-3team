import withCardSection from "client/refactor_component/organism/card/utils/with_card_section";
import React from "react";
import MainContentProps from "../../../../props/main_content.props";
import NoticeBoard from "client/components/Notice/NoticeBoard";
import NoticeMainPage from "client/pages/noticeMain";
import {
  calendarsection,
  usersection,
} from "client/styles/users/userdashboard.css";
const UserNoticeBoardSection = withCardSection(NoticeBoard, {
  sectionClassName: `${usersection} ${calendarsection}`,
  title: "Notice Board",
  buttonText: "View Notices",
  onClick: (props: MainContentProps) => {
    props.onClick(<NoticeMainPage />);
    return null;
  },
});
export default UserNoticeBoardSection;
