import React from "react";
import Link from "next/link";
import * as styles from "client/styles/notice/notice.css";
import PTags from "client/refactor_component/molecule/notice_and_comment/admin/one_part_post/notice_main_admin_content/notice_admin_tag";
import { NoticeLinkProps } from "./interface/notice_admin_link_props";


const NoticeLinkItem: React.FC<NoticeLinkProps> = ({ noticeId, index, title, userId, createdAt }) => {
  return (
    <Link href={`/noticeAuth/${noticeId}`} className={styles.uploadbutton}>
      <PTags index={index} title={title} userId={userId} createdAt={createdAt} />
    </Link>
  );
};

export default NoticeLinkItem;
