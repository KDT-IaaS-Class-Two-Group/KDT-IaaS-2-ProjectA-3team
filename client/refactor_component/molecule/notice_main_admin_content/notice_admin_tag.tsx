import React from "react";
import * as styles from "../../../styles/notice/notice.css";
import PTag from "client/refactor_component/atom/tag/tag";
import { NoticeTagsProps } from "./interface/notice_admin_tag_props";

const PTags: React.FC<NoticeTagsProps> = ({ index, title, userId, createdAt }) => {
  return (
    <div className={styles.noticelengh}>
      <PTag className={styles.TagSize} content={`${index + 1}.`} />
      <PTag className={styles.pTagTitletext} content={title} />
      <PTag className={styles.TagSize} content={userId} />
      <PTag className={styles.TagSize} content={createdAt} />
    </div>
  );
};

export default PTags;
