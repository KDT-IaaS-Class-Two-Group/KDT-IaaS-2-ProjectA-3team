import withCardSection from "client/refactor_component/organism/card/utils/with_card_section";
import React from "react";
import MainContentProps from "../../../../props/main_content.props";
import { section } from "client/styles/admin/admindashboard.css";
import Attendance from "client/components/attendance";
import { attendanceSection } from "client/styles/admin/workAttendance/workattendance.css";
const AttendanceSection = withCardSection(Attendance, {
  sectionClassName: `${section} ${attendanceSection}`,
  title: "Work Attendance",
  buttonText: "View Attendance",
  onClick: (props: MainContentProps) => {
    props.onClick(<Attendance />);
    return null;
  },
});
export default AttendanceSection;
