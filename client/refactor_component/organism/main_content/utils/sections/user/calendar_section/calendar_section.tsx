import CalendarComponent from "client/refactor_component/molecule/calendar/calendar";
import withCardSection from "client/refactor_component/organism/card/utils/with_card_section";
import {
  usernoticesection,
  usersection,
} from "client/styles/users/userdashboard.css";
import React from "react";

const CalendarSection = withCardSection(CalendarComponent, {
  sectionClassName: `${usersection} ${usernoticesection}`,
  title: "Calendar",
  buttonText: undefined, // 캘린더에는 별도의 버튼이 필요 없을 수 있음
  onClick: undefined, // 특별한 클릭 동작이 필요하지 않음
});

export default CalendarSection;
