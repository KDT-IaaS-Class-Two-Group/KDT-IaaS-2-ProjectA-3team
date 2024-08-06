// TestPage.tsx
import React, { useState } from "react";
import Checkprofile, { User } from "client/model/services/checkprofile";

const TestPage: React.FC = () => {
  const [status, setStatus] = useState<boolean>(false);

  const handleSave = async (checkusers: User[]) => {
    try {
      const response = await fetch(
        "http://localhost:3001/getUser/checkprofile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ checkusers }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("사용자 정보 가져오기 성공");
    } catch (error) {
      console.error("사용자 정보 가져오기 실패:", error);
    }
  };

  const handleButtonClick = () => {
    setStatus(true);
  };

  return (
    <div>
      <h1>사용자 프로필 요청수락하기</h1>
      {status && <Checkprofile onSave={handleSave} />}
      <button onClick={handleButtonClick}>조회하기</button>
    </div>
  );
};

export default TestPage;
