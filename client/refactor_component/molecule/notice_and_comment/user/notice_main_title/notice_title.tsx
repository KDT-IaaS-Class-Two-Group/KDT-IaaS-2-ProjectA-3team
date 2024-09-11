import React from "react";
import Link from "next/link";
import { blueButton, tdn } from "client/styles/templatebutton.css";

const NoticeAdminButton = () => {
  return (
    <Link href="/noticeAuthAllPage" className={tdn}>
      <button className={blueButton}>관리자 게시판 보기</button>
    </Link>
  );
};

export default NoticeAdminButton;
