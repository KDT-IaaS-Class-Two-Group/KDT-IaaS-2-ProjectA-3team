import { backcontainer } from "client/styles/info/index.css";
import { uploadbutton } from "client/styles/notice/notice.css";
import {
  centeredflexcolcontainer,
  flexcolcontainer,
} from "client/styles/standardcontainer.css";
import { greenButton } from "client/styles/templatebutton.css";
import Link from "next/link";
import React, { useState } from "react";

/**
 * * Function : RegisterForm
 * 작성자 : @신지윤 / 2024-07-31
 * 편집자 : @yun-21 / 2024-08-01
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

  return (
    <div className={flexcolcontainer}>
      <div className={centeredflexcolcontainer}>
        <input
          type="text"
          value={state}
          onChange={(ele) => setState(ele.target.value)}
          placeholder="글 제목"
        />
        <textarea
          value={stateContent}
          onChange={(ele) => setStateContent(ele.target.value)}
          name="content"
          id="content"
          placeholder="글 내용"
          cols={30}
          rows={10}
        ></textarea>
        <Link href="/noticeMain" passHref className={uploadbutton}>
          <button onClick={send} className={greenButton}>
            upload
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NoticeBoard;
