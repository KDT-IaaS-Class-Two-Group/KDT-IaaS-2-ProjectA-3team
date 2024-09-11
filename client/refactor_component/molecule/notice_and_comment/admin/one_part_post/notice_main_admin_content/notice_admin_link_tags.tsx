import React from "react";
import Link from "next/link";
import * as styles from "client/styles/notice/notice.css";
import PTags from "client/refactor_component/molecule/notice_and_comment/admin/one_part_post/notice_main_admin_content/notice_admin_tag";
import { NoticeLinkProps } from "./interface/notice_admin_link_props";

/**
 * @function NoticeLinkItem
 * @description
 * 공지사항 항목을 링크로 표시하는 컴포넌트입니다. 링크를 클릭하면 공지사항의 상세 페이지로 이동합니다.
 * 
 * @param {NoticeLinkProps} props - 컴포넌트에 전달되는 속성들입니다.
 * @param {string} props.noticeId - 공지사항의 고유 ID입니다.
 * @param {number} props.index - 공지사항의 인덱스입니다.
 * @param {string} props.title - 공지사항의 제목입니다.
 * @param {string} props.userId - 공지사항 작성자의 사용자 ID입니다.
 * @param {string} props.createdAt - 공지사항 작성일입니다.
 * 
 * @returns {JSX.Element} - 공지사항 링크를 포함한 JSX 요소를 반환합니다.
 */
const NoticeLinkItem: React.FC<NoticeLinkProps> = ({ noticeId, index, title, userId, createdAt }) => {
  return (
    // 공지사항 p 태그 링크화
    <Link href={`/noticeAuth/${noticeId}`} className={styles.uploadbutton}>
      <PTags index={index} title={title} userId={userId} createdAt={createdAt} />
    </Link>
  );
};

export default NoticeLinkItem;
