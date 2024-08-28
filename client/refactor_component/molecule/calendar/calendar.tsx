/**
 * @file calendar_component.tsx
 * @brief 캘린더 컴포넌트 파일
 * @details 이 파일은 날짜를 선택할 수 있는 캘린더 컴포넌트를 정의한다.
 *          `react-calendar` 라이브러리를 사용하여 캘린더를 렌더링하며, 선택된 날짜를 상태로 관리한다.
 *
 * @author @dalramjwi
 * @date 2024-08-28
 */

import React, { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import * as styles from "../../../styles/userMainContent.css";

/**
 * @brief 캘린더 컴포넌트
 * @details 사용자가 날짜를 선택할 수 있는 캘린더를 렌더링하며, 선택된 날짜를 상태로 관리한다.
 * @return 캘린더를 포함한 `div` 요소를 반환. 캘린더는 한국어 로케일을 사용하며, 선택된 날짜는 상태로 관리된다.
 */
const CalendarComponent: React.FC = () => {
  // 캘린더의 현재 날짜를 상태로 관리
  const [calendarValue, setCalendarValue] = useState<CalendarProps["value"]>(
    new Date() // 초기값은 현재 날짜
  );

  /**
   * @brief 캘린더 변경 핸들러
   * @details 사용자가 캘린더에서 날짜를 선택할 때 호출되어 상태를 업데이트한다.
   * @param {Date | Date[]} value 선택된 날짜 (단일 날짜 또는 날짜 배열)
   */
  const handleCalendarChange: CalendarProps["onChange"] = (value) => {
    setCalendarValue(value); // 선택된 날짜를 상태로 업데이트
  };

  return (
    <div className={styles.mainProjectCalender}>
      <Calendar
        locale="ko" // 한국어 로케일 설정
        onChange={handleCalendarChange} // 날짜 선택 시 핸들러 호출
        value={calendarValue} // 현재 선택된 날짜
      />
    </div>
  );
};

export default CalendarComponent;
