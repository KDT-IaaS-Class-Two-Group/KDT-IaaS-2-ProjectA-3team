import React, { useState } from "react";
const App: React.FC = () => {
  const [content, newContent] = useState(""); // 클라이언트가 갖는 현재 상태 값과 변경 함수 
  const [innerContent, newInnerContent] = useState(""); //서버가 갖는 현재 상태 값과 변경 함수 
  const send = () => {
    const data = {
      content: content, //객체로 보냄 - 내가 적은 값
    };
    fetch("http://localhost:3001/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", //객체니까 json으로 보낸다.
      },
      body: JSON.stringify(data), // 서버로 보낸 값
    })
      .then((response) => response.json()) // await async랑 비슷한 것  파싱해준 것 서버에서 받은 값
      .then((data) => newInnerContent(data.content)); // 이게 진짜 값
  };
  return (
    <div>
      <input
        type="text"
        value={content}
        onChange={(element) => newContent(element.target.value)}
        placeholder="내용을 입력하세요"
      />
      <button onClick={send}>전송하기</button>
      <ul id="inner"><li>{innerContent}</li></ul>
    </div>
  );
};
export default App;
