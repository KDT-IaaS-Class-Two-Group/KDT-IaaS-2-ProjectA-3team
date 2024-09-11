import React from "react";
import Link from "next/link";
import PTagList from "client/refactor_component/molecule/notice_and_comment/user/notice_main_user_content/notice_tag";
import * as styles from "client/styles/notice/notice.css";

interface NoticeItemProps {
  notice: {
    _id: string;
    title: string;
    user_id: string;
    createdAt: string;
  };
  index: number;
  currentPage: number;
}

const NoticeItem: React.FC<NoticeItemProps> = ({
  notice,
  index,
  currentPage
}) => {
  return (
    <div key={notice._id}>
      <Link
        href={`/notice/${notice._id}`}
        className={styles.uploadbutton}
      >
        <PTagList
          notice={notice}
          index={index}
          currentPage={currentPage} />
      </Link>
    </div>
  );
};

export default NoticeItem;
