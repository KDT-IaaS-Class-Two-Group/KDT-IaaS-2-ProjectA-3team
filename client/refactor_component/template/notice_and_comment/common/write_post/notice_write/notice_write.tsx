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
 * @component NoticeBoard
 * @description 공지사항 게시판에서 공지를 작성하는 폼 컴포넌트. 제목과 내용을 입력한 후 서버로 데이터를 전송한다.
 */

const NoticeBoard: React.FC = () => {
  const [state, setState] = useState(""); // 게시물 제목 상태
  const [stateContent, setStateContent] = useState(""); // 게시물 내용 상태

  /**
   * @function dataSend
   * @description 제목과 내용을 서버로 전송하는 함수
   */
  const dataSend = () => {
    send(state, stateContent);
  };

  /**
   * @function back
   * @description 뒤로가기 버튼 클릭 시 공지사항 메인 페이지로 이동하는 함수
   */
  const back = () => {
    window.location.href = "/noticeMain";
  };

  return (
    <>
      {/* 뒤로가기 버튼 */}
      <BackBtn onClick={back} />
      {/* 게시물 작성 */}
      <div className={styles.wrtiePage}>
        {/* 제목 input */}
        <TitleInput value={state} onChange={(ele) => setState(ele.target.value)} />
        {/* 내용 textarea */}
        <ContentTextArea value={stateContent} onChange={(ele) => setStateContent(ele.target.value)} />
      </div>{" "}
      {/* 전송버튼 */}
      <SendBtn onClick={dataSend} />
    </>
  );
};

export default NoticeBoard;
