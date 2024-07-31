import React, { useState } from "react";

/**
 * * Function : RegisterForm
 * 작성자 : @신지윤 / 2024-07-31
 * 편집자 : @yun-21 / 2024-07-31
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
      body: JSON.stringify({ title: state, content: stateContent }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div>글 작성하기</div>
      <div>
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
      </div>
      <button onClick={send}>작성하기</button>
    </div>
  );
};

export default NoticeBoard;
