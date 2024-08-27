import withCardSection from "client/refactor_component/organism/card/utils/with_card_section";
import React from "react";
import MainContentProps from "../../../../props/main_content.props";
import { section } from "client/styles/admin/admindashboard.css";
import NoticeBoard from "client/components/Notice/NoticeBoard";
import { noticeBoardSection } from "client/styles/admin/noticeBoard/noticeboard.css";
import NoticeMainPage from "client/pages/noticeMain";
const NoticeBoardSection = withCardSection(NoticeBoard, {
  sectionClassName: `${section} ${noticeBoardSection}`,
  title: "Notice Board",
  buttonText: "View Notices",
  onClick: (props: MainContentProps) => {
    props.onClick(<NoticeMainPage />);
    return null;
  },
});
export default NoticeBoardSection;
