import React from "react";
import Link from "next/link";
import { pagemaintext } from "client/styles/team/teampage.css";
import { noticeheaderdiv } from "client/styles/notice/noticecomponent.css";
import { blueButton, tdn } from "client/styles/templatebutton.css";

const NoticeMainTitle = () => {
  return (
    <div className={noticeheaderdiv}>
      <div className={pagemaintext}>notice board</div>
      <Link href="/noticeAuthAllPage" className={tdn}>
        <button className={blueButton}>관리자 게시판 보기</button>
      </Link>
    </div>
  );
};

export default NoticeMainTitle;
