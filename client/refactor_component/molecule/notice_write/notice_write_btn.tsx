import Link from "next/link";
import React from "react";
import Button from "client/refactor_component/atom/button/button";
import { greenButton } from "client/styles/templatebutton.css";
import * as styles from "client/styles/notice/notice.css";

const SendBtn: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className={styles.btnsize}>
      <Link href="/noticeMain" passHref className={styles.uploadbutton}>
        <Button button_text="게시글 작성" button_style={greenButton} onClick={onClick} />
      </Link>
    </div>
  );
};

export default SendBtn;
