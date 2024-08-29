import React, { useState, useEffect } from "react";
import Link from "next/link";
import { mainpagecontainer } from "client/styles/admin/admindashboard.css";
import AdminSidebar from "client/components/SideBar/AdminSidebar";
import AdminMainContent from "client/refactor_component/template/main_content/admin/admin_main_content";
import MainHeader from "client/components/common/header/mainheader";
import {
  pagemaincontainer,
  pagemainmain,
  pagemaintext,
} from "client/styles/team/teampage.css";
import * as styles from "../../../styles/notice/notice.css";
import { centeredflexrowcontainer } from "client/styles/standardcontainer.css";
import { ListNotice } from "client/refactor_component/molecule/notice_admin_all/interface/notice_admin_all_prop"
import fetchNotices from "client/refactor_component/molecule/notice_admin_all/service/fetch_notice_admin_list";
import PTag from "client/refactor_component/atom/tag/tag";
import Button from "client/refactor_component/atom/button/button";

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
                <PTag className={styles.TagSize} content={"Number"} />
                <PTag className={styles.pTagTitle} content={"Title"} />
                <PTag className={styles.TagSize} content={"Author"} />
                <PTag className={styles.TagSize} content={"Creation Date"} />
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

                          <PTag className={styles.TagSize} content={`${index} + 1 + (currentPage - 1) * itemsPerPage`} />
                          <PTag className={styles.pTagTitletext} content={notice.title} />
                          <PTag className={styles.TagSize} content={notice.user_id} />
                          <PTag className={styles.TagSize} content={notice.createdAt} />
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
                    <Button
                      key={page}
                      button_style={styles.pagebutton}
                      onClick={() => handlePageChange(page)}
                      disabled={currentPage === page}
                      button_text={page.toString()}
                      />
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
