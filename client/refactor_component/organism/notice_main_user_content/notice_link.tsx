import React from "react";
import LinkTag from "client/refactor_component/organism/notice_main_user_content/notice_link_ptag"; // LinkTag 컴포넌트 임포트
import * as styles from "../../../styles/notice/notice.css";
import { ListNotice } from "client/refactor_component/molecule/notice_main_user_content/interface/notice_main_interface";

interface NoticeListProps {
  userList: ListNotice[];
  currentPage: number;
}

const NoticeList: React.FC<NoticeListProps> = ({ userList, currentPage }) => {
  return (
    <div className={styles.usercontentdiv}>
      {userList.length > 0 ? (
        userList.map((notice, index) => (
          <LinkTag
            key={notice._id}
            notice={notice}
            index={index}
            currentPage={currentPage}
          />
        ))
      ) : (
        <div>게시물 없음</div>
      )}
    </div>
  );
};

export default NoticeList;
