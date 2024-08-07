import React, { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import * as styles from "../../styles/userMainContent.css";
const CalendarComponent: React.FC = () => {
  const [calendarValue, setCalendarValue] = useState<CalendarProps["value"]>(
    new Date()
  );

  const handleCalendarChange: CalendarProps["onChange"] = (value) => {
    setCalendarValue(value);
  };
  return (
    <div className={styles.mainProjectCalender}>
      {/* 캘린더 추가 */}
      <Calendar onChange={handleCalendarChange} value={calendarValue} />
    </div>
  );
};

export default CalendarComponent;