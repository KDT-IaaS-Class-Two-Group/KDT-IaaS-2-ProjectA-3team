import ClockInButton from "client/components/backButtonSection/ClockInButton";
import withCardSection from "client/refactor_component/organism/card/utils/with_card_section";
import MainContentProps from "client/refactor_component/organism/main_content/props/main_content.props";
import {
  companybutton,
  usersection,
} from "client/styles/users/userdashboard.css";
import React from "react";

const ClockInButtonSection = withCardSection(ClockInButton, {
  sectionClassName: `${usersection} ${companybutton}`,
  title: "출퇴근 버튼",
  buttonText: "View Attendance",
  onClick: (props: MainContentProps) => {
    props.onClick(<ClockInButton userId={props.userId} />);
    return null;
  },
});

export default ClockInButtonSection;
