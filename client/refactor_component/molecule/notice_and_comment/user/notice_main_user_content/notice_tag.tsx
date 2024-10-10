import React from "react";
import Tag from "client/refactor_component/atom/tag/tag";
import * as styles from "client/styles/notice/notice.css";
/**
 * @interface pTagListProps
 * @description 개별 공지사항 항목의 정보를 나타내는 속성 인터페이스
 *
 * @property {object} notice - 공지사항 객체로, 제목, 작성자, 생성일 포함
 * @property {string} notice.title - 공지사항 제목
 * @property {string} notice.user_id - 작성자 ID
 * @property {string} notice.createdAt - 공지사항 생성일
 * @property {number} index - 해당 공지사항의 리스트 내 인덱스
 * @property {number} currentPage - 현재 페이지 번호
 */
interface pTagListProps {
  notice: {
    title: string;
    user_id: string;
    createdAt: string;
  };
  index: number;
  currentPage: number;
}
/**
 * @function pTagList
 * @description
 * 개별 공지사항 정보를 태그로 표현하는 컴포넌트입니다.
 * 인덱스를 기반으로 리스트 번호를 생성하고, 공지사항의 제목, 작성자, 생성일을 표시합니다.
 *
 * @param {pTagListProps} props - 공지사항 정보와 관련된 속성을 전달받습니다.
 * @returns {JSX.Element} 각 공지사항 정보를 태그로 표시하는 JSX
 */
const pTagList: React.FC<pTagListProps> = ({ notice, index, currentPage }) => {
  return (
    <div className={styles.noticelengh}>
      <Tag
        className={styles.TagSize}
        content={`${index + 1 + (currentPage - 1) * 5}.`} // 페이지네이션 인덱스 번호
      />
      {/* 게시물 제목 */}
      <Tag className={styles.pTagTitletext} content={notice.title} />
      {/* 작성자 ID */}
      <Tag className={styles.TagSize} content={notice.user_id} />
      {/* 게시물 생성일자 */}
      <Tag className={styles.TagSize} content={notice.createdAt} />
    </div>
  );
};

export default pTagList;
