import React from "react";

import * as styles from "../../styles/userMainContent.css";

const mainHeader: React.FC = () => {
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
          <div>첫번째 사람</div>
          <div>두번째 사람</div>
          <div>세번째 사람</div>
        </div>
      </div>
      <div className={styles.mainProjectContent}>
        <div className={styles.mainProjectKanban}>칸반보드</div>
        <div className={styles.mainProjectStatus}>프로젝트 상태</div>
        <div className={styles.mainProjectCalender}>캘린더</div>
        <div className={styles.mainProjectToDo}>Todo-list</div>
        <div className={styles.mainProjectPlus}>+</div>
      </div>
    </div>
  );
};

export default mainHeader;
