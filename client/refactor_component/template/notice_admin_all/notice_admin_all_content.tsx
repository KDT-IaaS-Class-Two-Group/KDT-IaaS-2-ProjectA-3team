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
import { ListNotice } from "client/refactor_component/molecule/notice_admin_all/interface/notice_admin_all.interface"
import fetchNotices from "client/refactor_component/molecule/notice_admin_all/service/fetch_notice_admin_list";
import AdminAllNoticeTitlePtag from "client/refactor_component/molecule/notice_admin_all/notice_admin_title_tags";
import AdminAllNoticeContentPtag from "client/refactor_component/molecule/notice_admin_all/notice_admin_content_tags";
import AdminAllNoticePageBtn from "client/refactor_component/molecule/notice_admin_all/notice_admin_btn";

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
              <AdminAllNoticeTitlePtag/>
              <div className={styles.usercontentdiv}>
                {userList.length > 0 ? (
                  userList.map((notice, index) => (
                    <div key={notice._id}>
                      <Link
                        href={`/noticeAuth/${notice._id}`}
                        className={styles.uploadbutton}
                      >
                        <AdminAllNoticeContentPtag notice={notice} index={index}/>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div>게시물 없음</div>
                )}
                <AdminAllNoticePageBtn totalPages={totalPages} handlePageChange={handlePageChange} currentPage={currentPage}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeAuthAllContent;
