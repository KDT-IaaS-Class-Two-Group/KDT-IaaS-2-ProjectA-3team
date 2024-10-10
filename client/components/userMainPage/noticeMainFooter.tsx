import Link from "next/link";
import React from "react";
import { greenButton } from "client/styles/templatebutton.css";
import * as styles from "../../styles/notice/notice.css";

const NoticeMainFooter = () => {
  return (
    <div>
      <Link href="/notice" passHref className={styles.uploadbutton}>
        <div className={styles.writeButton}>
          <button className={greenButton}>작성하기</button>
        </div>
      </Link>
    </div>
  );
};

export default NoticeMainFooter;
