import React from "react";
import LinkList from "client/refactor_component/organism/notice_and_comment/notice_main_user_content/notice_link";
import Pages from "client/refactor_component/molecule/notice_and_comment/user/notice_main_user_content/notice_pages";
import { ListNotice } from "client/refactor_component/molecule/notice_and_comment/user/notice_main_user_content/interface/notice_main_interface";
/**
 * @interface NoticeContentProps
 * @description 게시물 리스트 및 페이지네이션에 필요한 속성 정의
 * @property {ListNotice[]} userList - 게시물 리스트
 * @property {number} currentPage - 현재 페이지 번호
 * @property {number} totalPages - 총 페이지 수
 * @property {(page: number) => void} pageChange - 페이지 변경 시 호출되는 함수
 */
interface NoticeContentProps {
  userList: ListNotice[];
  currentPage: number;
  totalPages: number;
  pageChange: (page: number) => void;
}

/**
 * @function NoticeContent
 * @description 게시물 리스트와 페이지네이션을 렌더링하는 함수형 컴포넌트
 *
 * @param {NoticeContentProps} userList - 게시물 리스트
 * @param {NoticeContentProps} currentPage - 현재 페이지 번호
 * @param {NoticeContentProps} totalPages - 총 페이지 수
 * @param {NoticeContentProps} pageChange - 페이지 변경 시 호출되는 함수
 *
 * @returns 사용자 게시물 목록과 페이지네이션을 렌더링하는 JSX 요소
 */
const NoticeContent: React.FC<NoticeContentProps> = ({
  userList,
  currentPage,
  totalPages,
  pageChange,
}) => {
  return (
    <>
      {/* 게시물 리스트 */}
      <LinkList userList={userList} currentPage={currentPage} />
      {/* 페이지네이션 */}
      <Pages
        totalPages={totalPages}
        currentPage={currentPage}
        pageChange={pageChange}
      />
    </>
  );
};

export default NoticeContent;
