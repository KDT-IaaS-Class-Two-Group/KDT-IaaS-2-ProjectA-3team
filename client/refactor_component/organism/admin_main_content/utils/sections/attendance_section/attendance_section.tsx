import withCardSection from "client/refactor_component/organism/card/utils/with_card_section";
import React from "react";
import AdminMainContentProps from "../../../props/admin_main_content.props";
import { section } from "client/styles/admin/admindashboard.css";
import Attendance from "client/components/attendance";
import { attendanceSection } from "client/styles/admin/workAttendance/workattendance.css";
const AttendanceSection = withCardSection(Attendance, {
  sectionClassName: `${section} ${attendanceSection}`,
  title: "Work Attendance",
  buttonText: "View Attendance",
  onClick: (props: AdminMainContentProps) => {
    props.onClick(<Attendance />);
    return null;
  },
});
export default AttendanceSection;
