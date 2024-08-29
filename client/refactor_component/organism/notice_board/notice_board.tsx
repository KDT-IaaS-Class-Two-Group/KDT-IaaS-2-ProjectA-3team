import React from "react";
import AdminNoticeSection from "client/refactor_component/molecule/notice/admin_notice_section";
import UserNoticeSection from "client/refactor_component/molecule/notice/user_notice_section";
import { noticeboardsection } from "client/styles/notice/mainnotice.css";

const NoticeBoard: React.FC = () => {
  return (
    <div className={noticeboardsection}>
      <AdminNoticeSection />
      <UserNoticeSection />
    </div>
  );
};

export default NoticeBoard;
