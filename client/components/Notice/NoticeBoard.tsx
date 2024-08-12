import React from "react";
import TextOnlyNoticeUserContent from "../../../client/components/TextContent";
import TextOnlyNoticeAuthContent from "../../../client/components/TextNoticeAuth";
import { admintext, runtext } from "client/styles/admin/greet/greet.css";
import {
  noticeboardsection,
  noticemaintext,
  noticesection,
  noticesubtext,
} from "client/styles/notice/mainnotice.css";
import {
  profilecontainer,
  userlistcontainer,
} from "client/styles/sidebar/SidebarStyles.css";

const NoticeBoard: React.FC = () => {
  return (
    <div>
      <div className={noticeboardsection}>
        {/* 관리자 게시물 표시 */}
        <div className={noticesection}>
          <div className={noticemaintext}>MANAGER</div>
          <TextOnlyNoticeAuthContent />
        </div>

        {/* 사용자 게시물 표시 */}
        <div className={noticesection}>
          <div className={noticesubtext}>USER</div>
          <TextOnlyNoticeUserContent />
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;
