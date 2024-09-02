import React from "react";
import PTag from "client/refactor_component/atom/tag/tag";
import * as styles from "../../../styles/notice/notice.css";

const AdminAllNoticeTitlePtag: React.FC = () => {
  return (
    <div className={styles.title}>
      <PTag className={styles.TagSize} content={"Number"} />
      <PTag className={styles.pTagTitle} content={"Title"} />
      <PTag className={styles.TagSize} content={"Author"} />
      <PTag className={styles.TagSize} content={"Creation Date"} />
    </div>
  );
};

export default AdminAllNoticeTitlePtag;
