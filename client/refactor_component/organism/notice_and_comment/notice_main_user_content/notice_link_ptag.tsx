import React from "react";
import Link from "next/link";
import PTagList from "client/refactor_component/molecule/notice_and_comment/user/notice_main_user_content/notice_tag";
import * as styles from "client/styles/notice/notice.css";

/**
 * @interface NoticeItemProps
 * @description 게시물 항목에 필요한 속성 정의
 * @property {string} notice._id - 게시물 고유 ID
 * @property {string} notice.title - 게시물 제목
 * @property {string} notice.user_id - 작성자 ID
 * @property {string} notice.createdAt - 게시물 생성 날짜
 * @property {number} index - 게시물 목록에서의 인덱스
 * @property {number} currentPage - 현재 페이지 번호
 */
interface NoticeItemProps {
  notice: {
    _id: string;
    title: string;
    user_id: string;
    createdAt: string;
  };
  index: number;
  currentPage: number;
}

/**
 * @function NoticeItem
 * @description 게시물 목록에서 각 항목을 개별적으로 렌더링하고, 해당 항목의 상세 페이지로 이동하는 링크를 생성
 *
 * @param {NoticeItemProps} notice - 게시물 객체로, 공지사항의 ID, 제목, 작성자 ID, 생성일을 포함
 * @param {NoticeItemProps} index - 게시물 리스트 내에서의 순서
 * @param {NoticeItemProps} currentPage - 현재 페이지 번호, 페이징을 위한 변수
 * 
 * @returns 게시물의 제목, 작성자, 날짜 등을 표시하고, 공지사항 상세 페이지로 이동하는 링크를 제공하는 JSX 요소
 */
const NoticeItem: React.FC<NoticeItemProps> = ({
  notice,
  index,
  currentPage
}) => {
  return (
    <div key={notice._id}>
      {/* 게시물 상세 페이지 이동 링크 */}
      <Link
        href={`/notice/${notice._id}`}
        className={styles.uploadbutton}
      >
        {/* 게시물 제목~ 리스트 */}
        <PTagList
          notice={notice}
          index={index}
          currentPage={currentPage} />
      </Link>
    </div>
  );
};

export default NoticeItem;
