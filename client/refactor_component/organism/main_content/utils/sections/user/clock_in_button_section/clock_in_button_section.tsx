import ClockInButton from "client/components/backButtonSection/ClockInButton";
import withCardSection from "client/refactor_component/organism/card/utils/with_card_section";
import MainContentProps from "client/refactor_component/organism/main_content/props/main_content.props";
import { section } from "client/styles/admin/admindashboard.css";
import { companybutton } from "client/styles/users/userdashboard.css";
import React from "react";

const ClockInButtonSection = withCardSection(ClockInButton, {
  sectionClassName: `${section} ${companybutton}`,
  title: "Clock In/Out",
  buttonText: "View Attendance",
  onClick: (props: MainContentProps) => {
    props.onClick(<ClockInButton userId={props.userId} />);
    return null;
  },
});

export default ClockInButtonSection;
