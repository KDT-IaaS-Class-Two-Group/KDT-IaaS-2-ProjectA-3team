import React, { useState, useEffect } from "react";
import { ListNotice } from "client/refactor_component/molecule/notice_main_user_content/interface/notice_main_interface";
import fetchNotices from "client/refactor_component/molecule/notice_main_user_content/hook/fetch_notcie_main";
import NoticeContent from "client/refactor_component/organism/notice_main_user_content/notice_link_pages";

/**
 * * Function : NoticeMainContent
 * 작성자 : @yun-21 / 2024-08-01
 * 편집자 : @yun-21 / 2024-08-23
 * Issue : 
 * @function NoticeMainContent
 * @description 

 */
const NoticeMainContent = () => {
  const [userList, setUserList] = useState<ListNotice[]>([]); // empolyee 서버에서 건너오는 게시물 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  const itemsPerPage = 5; // 한 페이지당 항목 수

  useEffect(() => {
    fetchNotices(currentPage, itemsPerPage, setUserList, setTotalPages);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // 페이지 변경
  };

  return (
    <NoticeContent
      userList={userList}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
};

export default NoticeMainContent;
