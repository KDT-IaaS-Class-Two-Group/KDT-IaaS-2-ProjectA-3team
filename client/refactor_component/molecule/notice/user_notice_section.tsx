import React from "react";
import NoticeContent from "./notice_content";
import {
  noticesection,
  noticesubtext,
} from "client/styles/notice/mainnotice.css";

const UserNoticeSection: React.FC = () => {
  return (
    <div className={noticesection}>
      <div className={noticesubtext}>USER</div>
      <NoticeContent apiEndpoint="/homenotice/user" />
    </div>
  );
};

export default UserNoticeSection;
