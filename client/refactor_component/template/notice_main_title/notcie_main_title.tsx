import { pagemaintext } from "client/styles/team/teampage.css";
import React from "react";
import { noticeheaderdiv } from "client/styles/notice/noticecomponent.css";
import NoticeAdminButton from "client/refactor_component/molecule/notice_main_title/notice_title";


const NoticeMainTitle = () => {
  return (
    <div className={noticeheaderdiv}>
      <div className={pagemaintext}>notice board</div>
      <NoticeAdminButton />
    </div>
  );
};

export default NoticeMainTitle;
