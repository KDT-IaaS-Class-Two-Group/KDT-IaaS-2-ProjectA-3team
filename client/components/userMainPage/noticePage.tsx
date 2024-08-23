import { greenButton } from "client/styles/templatebutton.css";
import Link from "next/link";
import React, { useState } from "react";
import * as styles from "../../styles/notice/notice.css";

/**
 * * Function : RegisterForm
 * 작성자 : @신지윤 / 2024-07-31
 * 편집자 : @dalramjwi / 2024-08-13
 * Issue :
 * @function : NoticeBoard
 * @description : 게시판
 */

const NoticeBoard: React.FC = () => {
  const [state, setState] = useState("");
  const [stateContent, setStateContent] = useState("");

  const send = () => {
    fetch("http://localhost:3001/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ title: state, content: stateContent }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        console.log("Success", data);
      })
      .catch((error) => {
        console.error("에러나어엉", error);
      });
  };
  
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
          <button onClick={send} className={greenButton}>
            게시글 작성
          </button>
        </Link>
      </div>
    </>
  );
};

export default NoticeBoard;
