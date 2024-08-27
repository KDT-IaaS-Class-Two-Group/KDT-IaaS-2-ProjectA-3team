import { greenButton } from "client/styles/templatebutton.css";
import Link from "next/link";
import React, { useState } from "react";
import * as styles from "../../styles/notice/notice.css";
import send from "./noticePageModule/fetchSendNotice";
import Input from "client/refactor_component/atom/notice_input/notice_input";
import Button from "client/refactor_component/atom/button/button";
import TextArea from "client/refactor_component/atom/notice_textarea/notice_textarea";

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
  };

  const back = () => {
    window.location.href = "/noticeMain";
  };

  return (
    <>
      <div className={styles.btnsize}>
        <Button
          button_text="뒤로가기"
          button_style={greenButton}
          onClick={back}
        />
      </div>
      <div className={styles.wrtiePage}>
        <div className={styles.checksize}>
          <Input
            id="title"
            type="text"
            value={state}
            onChange={(ele) => setState(ele.target.value)}
            placeholder="글 제목"
            style={styles.inputSize}
          />
        </div>
        <div className={styles.testsize}>
          <TextArea
            value={stateContent}
            onChange={(ele) => setStateContent(ele.target.value)}
            name="content"
            id="content"
            placeholder="글 내용"
            style={styles.textareaSize}
          />
        </div>
      </div>{" "}
      <div className={styles.btnsize}>
        <Link href="/noticeMain" passHref className={styles.uploadbutton}>
          <Button
            button_text="게시글 작성"
            button_style={greenButton}
            onClick={dataSend}
          />
        </Link>
      </div>
    </>
  );
};

export default NoticeBoard;
