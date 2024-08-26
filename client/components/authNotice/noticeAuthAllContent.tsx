import React, { useState, useEffect } from "react";
import Link from "next/link";
import { mainpagecontainer } from "client/styles/admin/admindashboard.css";
import AdminSidebar from "../SideBar/AdminSidebar";
import AdminMainContent from "../../refactor_component/template/adminMainPage/AdminMainPage";
import MainHeader from "../common/header/mainheader";
import {
  pagemaincontainer,
  pagemainmain,
  pagemaintext,
} from "client/styles/team/teampage.css";
import * as styles from "../../styles/notice/notice.css";
import { centeredflexrowcontainer } from "client/styles/standardcontainer.css";
import { ListNotice } from "./noticeAuthContentModule/interfaceType";
import fetchNotices from "./noticeAuthAllContentModule/fetchNotice";

const NoticeAuthAllContent = () => {
  const [userList, setUserList] = useState<ListNotice[]>([]); // admin 서버에서 건너오는 게시물 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  const itemsPerPage = 8; // 한 페이지당 항목 수

  useEffect(() => {
    fetchNotices(currentPage, itemsPerPage, setUserList, setTotalPages);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // 페이지 변경
  };
  // 함수 선언
  const handleMenuClick = (component: React.ReactNode) => {
    setCurrentComponent(component);
  };

  // 상태 훅 설정
  const [currentComponent, setCurrentComponent] = useState<React.ReactNode>(
    <AdminMainContent onclick={handleMenuClick} />
  );

  return (
    <div className={mainpagecontainer}>
      <AdminSidebar onMenuItemClick={handleMenuClick} />
      <div>
        <MainHeader />
        <div className={pagemainmain}>
          <div className={pagemaincontainer}>
            <div className={pagemaintext}>관리자 게시물</div>{" "}
            <div className={styles.noticecontent}>
              <div className={styles.title}>
                <p className={styles.TagSize}>Number</p>
                <p className={styles.pTagTitle}>Title</p>
                <p className={styles.TagSize}>Author</p>
                <p className={styles.TagSize}>Creation Date</p>
              </div>
              <div className={styles.usercontentdiv}>
                {userList.length > 0 ? (
                  userList.map((notice, index) => (
                    <div key={notice._id}>
                      <Link
                        href={`/noticeAuth/${notice._id}`}
                        className={styles.uploadbutton}
                      >
                        <div className={styles.noticelengh}>
                          <p className={styles.TagSize}>
                            {index + 1 + (currentPage - 1) * itemsPerPage}
                          </p>
                          <p className={styles.pTagTitletext}>{notice.title}</p>
                          <p className={styles.TagSize}>{notice.user_id}</p>
                          <p className={styles.TagSize}>{notice.createdAt}</p>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div>게시물 없음</div>
                )}
                {/* 페이징 버튼 UI */}
                <div className={centeredflexrowcontainer}>
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      disabled={currentPage === page}
                      className={styles.pagebutton}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeAuthAllContent;
