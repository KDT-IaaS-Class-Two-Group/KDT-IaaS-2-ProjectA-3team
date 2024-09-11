import React from "react";
import PTag from "client/refactor_component/atom/tag/tag";
import * as styles from "client/styles/notice/notice.css";

/**
* @component AdminAllNoticeTitlePtag
* @description
* 공지사항 목록의 제목 행을 렌더링하는 컴포넌트입니다. 각 제목은 공지사항 목록의 열 이름을 표시합니다.
* "Number", "Title", "Author", "Creation Date"라는 텍스트를 포함하여, 해당 열의 제목을 설정합니다.
* 
* @returns {React.FC} - 공지사항 제목을 표시하는 컴포넌트
*/
const AdminAllNoticeTitlePtag: React.FC = () => {
  return (
    <div className={styles.title}>
      {/* 공지사항 목록의 열 제목: 번호 */}
      <PTag className={styles.TagSize} content={"Number"} />
      {/* 공지사항 목록의 열 제목: 제목 */}
      <PTag className={styles.pTagTitle} content={"Title"} />
      {/* 공지사항 목록의 열 제목: 작성자 */}
      <PTag className={styles.TagSize} content={"Author"} />
      {/* 공지사항 목록의 열 제목: 생성일 */}
      <PTag className={styles.TagSize} content={"Creation Date"} />
    </div>
  );
};

export default AdminAllNoticeTitlePtag;
