import React from "react";
import PTag from "client/refactor_component/atom/tag/tag";
import * as styles from "client/styles/notice/notice.css"
import { ListNotice } from "./interface/notice_admin_all.interface";

interface NoticeAuthAllContentProps {
  notice: ListNotice;
  index: number;
}

const AdminAllNoticeContentPtag: React.FC<NoticeAuthAllContentProps> = ({notice, index}) => {
  return (
    <div className={styles.noticelengh}>
      <PTag className={styles.TagSize} content={`${index} + 1 + (currentPage - 1) * itemsPerPage`} />
      <PTag className={styles.pTagTitletext} content={notice.title} />
      <PTag className={styles.TagSize} content={notice.user_id} />
      <PTag className={styles.TagSize} content={notice.createdAt} />
    </div>
  );
};

export default AdminAllNoticeContentPtag;
