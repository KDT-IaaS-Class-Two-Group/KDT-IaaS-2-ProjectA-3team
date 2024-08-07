import React, { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 기본 스타일
import * as styles from "../../styles/userMainContent.css";

const MainHeader: React.FC = () => {
  const [calendarValue, setCalendarValue] = useState<CalendarProps["value"]>(
    new Date()
  );

  const handleCalendarChange: CalendarProps["onChange"] = (value) => {
    setCalendarValue(value);
  };

  return (
    <div className={styles.mainContentAll}>
      <div className={styles.mainContentHeader}>
        <h1>Hello 토마토맛</h1>
        <div>다크모드</div>
      </div>
      <div>
        <div className={styles.mainFavorites}>
          <div>favorites</div>
          <div>+</div>
        </div>
        <div className={styles.mainFavoritPeople}>
          <div className={styles.mainFriend}>
            <div>프로필 사진</div>
            <div>이름</div>
            <div className={styles.mainFriendDetail}>
              <div>전화번호</div>
              <div>친구끊기</div>
              <div>메세지</div>
            </div>
          </div>
          <div>두번째 사람</div>
          <div>세번째 사람</div>
        </div>
      </div>
      <div className={styles.mainProjectContent}>
        <div className={styles.mainProjectKanban}>
          <div>project Kanban board</div>
          <div className={styles.mainProjectDetail}>
            <div>To-do</div>
            <div>Doing</div>
            <div>Done</div>
          </div>
        </div>
        <div className={styles.mainProjectStatus}>프로젝트 상태</div>
        <div className={styles.mainProjectCalender}>
          {/* 캘린더 추가 */}
          <Calendar onChange={handleCalendarChange} value={calendarValue} />
        </div>
        <div className={styles.mainProjectToDo}>Todo-list</div>
        <div className={styles.mainProjectPlus}>+</div>
      </div>
    </div>
  );
};

export default MainHeader;
