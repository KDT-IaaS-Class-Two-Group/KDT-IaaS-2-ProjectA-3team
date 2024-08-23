import { greenButton } from "client/styles/templatebutton.css";
import Link from "next/link";
import React, { useState } from "react";
import * as styles from "../../styles/notice/notice.css";
import send from "./noticePageModule/fetchSendNotice";

/**
 * * Function : RegisterForm
 * 작성자 : @신지윤 / 2024-07-31
 * 편집자 : @yun-21 / 2024-08-23
 * Issue :
 * @function : NoticeBoard
 * @description : 게시판
 */

const NoticeBoard: React.FC = () => {
  const [state, setState] = useState("");
  const [stateContent, setStateContent] = useState("");

  const dataSend = () => {
    send(state, stateContent);
  }
  
  const back = () => {
    window.location.href = "/noticeMain";
  };

  return (
    <>
      <div className={styles.btnsize}>
        <button onClick={back} className={greenButton}>
          뒤로가기
        </button>
      </div>
      <div className={styles.wrtiePage}>
        <div className={styles.checksize}>
          <input
            type="text"
            value={state}
            onChange={(ele) => setState(ele.target.value)}
            placeholder="글 제목"
            className={styles.inputSize}
          />
        </div>
        <div className={styles.testsize}>
          <textarea
            value={stateContent}
            onChange={(ele) => setStateContent(ele.target.value)}
            name="content"
            id="content"
            placeholder="글 내용"
            className={styles.textareaSize}
          />
        </div>
      </div>{" "}
      <div className={styles.btnsize}>
        <Link href="/noticeMain" passHref className={styles.uploadbutton}>
          <button onClick={dataSend} className={greenButton}>
            게시글 작성
          </button>
        </Link>
      </div>
    </>
  );
};

export default NoticeBoard;
