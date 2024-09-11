import React from 'react';
import Link from 'next/link';
import { greenButton } from "client/styles/templatebutton.css";
import * as styles from "client/styles/notice/notice.css";

const WriteButton = () => {
  return (
    <Link href="/notice" passHref className={styles.uploadbutton}>
      <div className={styles.writeButton}>
        <button className={greenButton}>작성하기</button>
      </div>
    </Link>
  );
};

export default WriteButton;
