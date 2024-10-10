import React from "react";
import PTag from "client/refactor_component/atom/tag/tag";
import * as styles from "client/styles/notice/notice.css";
import { ListNotice } from "./interface/notice_admin_all.interface";

interface NoticeAuthAllContentProps {
  notice: ListNotice; // 공지사항 목록 데이터
  index: number; // 글 번호
}
/**
 * @component AdminAllNoticeContentPtag
 * @description
 * 개별 공지사항 항목을 렌더링하는 컴포넌트입니다. 인덱스와 공지사항 데이터를 받아서 표시합니다.
 * 공지사항의 제목, 사용자 ID, 생성일 등을 렌더링하며, 인덱스는 1부터 시작하는 번호로 표시됩니다.
 *
 * @param {ListNotice} notice - 공지사항 데이터 객체
 * @param {number} index - 공지사항의 인덱스 (페이지네이션에 따른 표시용)
 * @returns {React.FC<NoticeAuthAllContentProps>} - 공지사항 정보를 표시하는 컴포넌트
 */
const AdminAllNoticeContentPtag: React.FC<NoticeAuthAllContentProps> = ({
  notice,
  index,
}) => {
  return (
    <div className={styles.noticelengh}>
      {/* 공지사항의 인덱스를 1부터 시작하는 번호로 표시 */}
      <PTag
        className={styles.TagSize}
        content={`${index} + 1 + (currentPage - 1) * itemsPerPage`}
      />
      {/* 공지사항의 제목을 표시 */}
      <PTag className={styles.pTagTitletext} content={notice.title} />
      {/* 공지사항 작성자의 ID를 표시 */}
      <PTag className={styles.TagSize} content={notice.user_id} />
      {/* 공지사항 생성일을 표시 */}
      <PTag className={styles.TagSize} content={notice.createdAt} />
    </div>
  );
};

export default AdminAllNoticeContentPtag;
