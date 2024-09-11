import React from "react";
import Tag from "client/refactor_component/atom/tag/tag";
import * as styles from "client/styles/notice/notice.css";

interface pTagListProps {
  notice: {
    title: string;
    user_id: string;
    createdAt: string;
  };
  index: number;
  currentPage: number;
}

const pTagList: React.FC<pTagListProps> = ({
  notice,
  index,
  currentPage
}) => {
  return (
    <div className={styles.noticelengh}>
      <Tag
        className={styles.TagSize}
        content={`${index + 1 + (currentPage - 1) * 5}.`}
      />
      <Tag className={styles.pTagTitletext} content={notice.title} />
      <Tag className={styles.TagSize} content={notice.user_id} />
      <Tag className={styles.TagSize} content={notice.createdAt} />
    </div>
  );
};

export default pTagList;
