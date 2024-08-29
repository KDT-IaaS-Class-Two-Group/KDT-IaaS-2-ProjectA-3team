import React from "react";
import * as styles from "../../../styles/notice/notice.css";
import LinkTag from "client/refactor_component/molecule/notice_main_admin_content/notice_admin_link_tags";
import { NoticeAuthListProps } from "./props/notice_list_auth_props";

const NoticeAuthList: React.FC<NoticeAuthListProps> = ({ authList }) => {
  return (
    <div className={styles.authcontentdiv}>
      {authList.length > 0 ? (
        authList.map((notice, index) => (
          <div key={notice._id}>
            <LinkTag
              noticeId={notice._id}
              index={index}
              title={notice.title}
              userId={notice.user_id}
              createdAt={notice.createdAt}
            />
          </div>
        ))
      ) : (
        <div>게시물 없음</div>
      )}
    </div>
  );
};

export default NoticeAuthList;
