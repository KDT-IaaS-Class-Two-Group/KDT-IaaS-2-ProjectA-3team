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
import * as styles from "client/styles/notice/notice.css";
import { ListNotice } from "client/refactor_component/molecule/notice_and_comment/admin/all_post/notice_admin_all/interface/notice_admin_all.interface"
import fetchNotices from "client/refactor_component/molecule/notice_and_comment/admin/all_post/notice_admin_all/service/fetch_notice_admin_list";
import AdminAllNoticeTitlePtag from "client/refactor_component/molecule/notice_and_comment/admin/all_post/notice_admin_all/notice_admin_title_tags";
import AdminAllNoticeContentPtag from "client/refactor_component/molecule/notice_and_comment/admin/all_post/notice_admin_all/notice_admin_content_tags";
import AdminAllNoticePageBtn from "client/refactor_component/molecule/notice_and_comment/admin/all_post/notice_admin_all/notice_admin_btn";

/**
 * @function NoticeAuthAllContent
 * @description 관리자의 모든 게시물을 렌더링하고 페이지네이션 기능을 제공하는 컴포넌트
 */
const NoticeAuthAllContent = () => {
  const [userList, setUserList] = useState<ListNotice[]>([]); // admin 서버에서 건너오는 게시물 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  const itemsPerPage = 8; // 한 페이지당 항목 수

    /**
   * @function useEffect
   * @description 현재 페이지에 해당하는 게시물 데이터를 fetchNotices를 이용해 불러온다.
   * @param {number} currentPage - 현재 페이지 번호
   * @param {number} itemsPerPage - 한 페이지당 게시물 수
   * @param {function} setUserList - 게시물 리스트를 설정하는 함수
   * @param {function} setTotalPages - 총 페이지 수를 설정하는 함수
   */
  useEffect(() => {
    fetchNotices(currentPage, itemsPerPage, setUserList, setTotalPages);
  }, [currentPage]);

  /**
   * @function pageChange
   * @description 페이지네이션 버튼 클릭 시 페이지 번호를 변경하는 함수
   * @param {number} page - 변경할 페이지 번호
   */
  const pageChange = (page: number) => {
    setCurrentPage(page); // 페이지 변경
  };
  
    /**
   * @function handleMenuClick
   * @description 사이드바 메뉴 클릭 시 해당 컴포넌트로 전환
   * @param {React.ReactNode} component - 렌더링할 컴포넌트
   */
  const handleMenuClick = (component: React.ReactNode) => {
    setCurrentComponent(component);
  };

  // 상태 훅 설정 (현재 렌더링 할 컴포넌트를 상태로 관리)
  const [currentComponent, setCurrentComponent] = useState<React.ReactNode>(
    <AdminMainContent onclick={handleMenuClick} />
  );

  return (
    <div className={mainpagecontainer}>
      {/* 사이드바 컴포넌트 */}
      <AdminSidebar onMenuItemClick={handleMenuClick} />
      <div>
        {/* 페이지 상단의 메인 헤더 */}
        <MainHeader />
        <div className={pagemainmain}>
          <div className={pagemaincontainer}>
            <div className={pagemaintext}>관리자 게시물</div>{" "}
            <div className={styles.noticecontent}>
              {/* 게시물 상단 제목 */}
              <AdminAllNoticeTitlePtag/>
              <div className={styles.usercontentdiv}>
                {userList.length > 0 ? ( // 게시물 있을 때 조건문
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
                <AdminAllNoticePageBtn totalPages={totalPages} pageChange={pageChange} currentPage={currentPage}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeAuthAllContent;
