import React from "react";
import LinkList from "client/refactor_component/organism/notice_and_comment/notice_main_user_content/notice_link";
import Pages from "client/refactor_component/molecule/notice_and_comment/user/notice_main_user_content/notice_pages";
import { ListNotice } from "client/refactor_component/molecule/notice_and_comment/user/notice_main_user_content/interface/notice_main_interface";

interface NoticeContentProps {
  userList: ListNotice[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const NoticeContent: React.FC<NoticeContentProps> = ({
  userList,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <>
      <LinkList userList={userList} currentPage={currentPage} />
      <Pages totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
    </>
  );
};

export default NoticeContent;
