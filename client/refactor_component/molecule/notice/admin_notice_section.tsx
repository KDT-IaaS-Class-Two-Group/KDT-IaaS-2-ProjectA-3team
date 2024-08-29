import React from "react";
import NoticeContent from "./notice_content";
import {
  noticemaintext,
  noticesection,
} from "client/styles/notice/mainnotice.css";

const AdminNoticeSection: React.FC = () => {
  return (
    <div className={noticesection}>
      <div className={noticemaintext}>MANAGER</div>
      <NoticeContent apiEndpoint="/homeauthnotice" />
    </div>
  );
};

export default AdminNoticeSection;
