import { pagemaintext } from "client/styles/team/teampage.css";
import React from "react";
import { noticeheaderdiv } from "client/styles/notice/noticecomponent.css";
import NoticeAdminButton from "client/refactor_component/molecule/notice_and_comment/user/notice_main_title/notice_title";

/**
 * @component NoticeMainTitle
 * @description 공지사항 메인 페이지의 제목과 버튼을 포함하는 헤더 컴포넌트.
 */
const NoticeMainTitle = () => {
  return (
    <div className={noticeheaderdiv}>
      <div className={pagemaintext}>notice board</div> {/* 게시판 제목 */}
      <NoticeAdminButton /> {/* 공지사항 관리 버튼 */}
    </div>
  );
};

export default NoticeMainTitle;
