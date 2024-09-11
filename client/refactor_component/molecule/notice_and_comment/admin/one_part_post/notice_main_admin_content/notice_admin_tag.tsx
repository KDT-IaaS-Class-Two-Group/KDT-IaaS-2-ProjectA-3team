import React from "react";
import * as styles from "client/styles/notice/notice.css";
import PTag from "client/refactor_component/atom/tag/tag";
import { NoticeTagsProps } from "./interface/notice_admin_tag_props";

/**
 * @function PTags
 * @description
 * 공지사항의 태그들을 표시하는 컴포넌트입니다. 각 태그는 공지사항의 인덱스, 제목, 작성자 ID, 작성일을 포함합니다.
 * 
 * @param {NoticeTagsProps} props - 컴포넌트에 전달되는 속성들입니다.
 * @param {number} props.index - 공지사항의 인덱스입니다. 0부터 시작하며, 표시할 때 1부터 시작하도록 조정됩니다.
 * @param {string} props.title - 공지사항의 제목입니다.
 * @param {string} props.userId - 공지사항 작성자의 사용자 ID입니다.
 * @param {string} props.createdAt - 공지사항 작성일입니다.
 * 
 * @returns {JSX.Element} - 공지사항의 태그들을 포함하는 JSX 요소를 반환합니다.
 */
const PTags: React.FC<NoticeTagsProps> = ({ index, title, userId, createdAt }) => {
  return (
    <div className={styles.noticelengh}>
      {/* 공지사항 인덱스 표시 */}
      <PTag className={styles.TagSize} content={`${index + 1}.`} />
      <PTag className={styles.pTagTitletext} content={title} />
      <PTag className={styles.TagSize} content={userId} />
      <PTag className={styles.TagSize} content={createdAt} />
    </div>
  );
};

export default PTags;
