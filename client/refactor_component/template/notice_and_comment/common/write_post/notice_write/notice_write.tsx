import React, { useState } from "react";
import * as styles from "client/styles/notice/notice.css";
import send from "client/refactor_component/molecule/notice_and_comment/common/write_post/notice_write/service/fetch_notice_write";
import SendBtn from "client/refactor_component/molecule/notice_and_comment/common/write_post/notice_write/notice_write_btn";
import BackBtn from "client/refactor_component/molecule/notice_and_comment/common/write_post/notice_write/notice_write_back_btn";
import TitleInput from "client/refactor_component/molecule/notice_and_comment/common/write_post/notice_write/notice_write_input";
import ContentTextArea from "client/refactor_component/molecule/notice_and_comment/common/write_post/notice_write/notice_write_textarea";

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
      <BackBtn onClick={back} />
      <div className={styles.wrtiePage}>
        <TitleInput value={state} onChange={(ele) => setState(ele.target.value)} />
        <ContentTextArea value={stateContent} onChange={(ele) => setStateContent(ele.target.value)} />
      </div>{" "}
      <SendBtn onClick={dataSend} />
    </>
  );
};

export default NoticeBoard;
