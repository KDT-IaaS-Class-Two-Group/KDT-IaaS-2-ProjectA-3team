import { useState } from "react";

import UserPersonal, { User } from "client/model/services/userpersonal";

const TestPage: React.FC = () => {
  const [status, setStatus] = useState<boolean>(false);

  const handleSave = async (users: User[]) => {
    try {
      const response = await fetch(
        "http://localhost:3001/getUser/userpersonal",
        //"http://localhost:3001/getUser/userprofile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ users }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("사용자 정보 저장 성공");
    } catch (error) {
      console.error("사용자 정보 저장 실패:", error);
    }
  };

  return (
    <div>
      <h1>개인 프로필 조회하기</h1>
      {status && <UserPersonal onSave={handleSave} />}
      <button onClick={() => setStatus(true)}>조회하기</button>
    </div>
  );
};

export default TestPage;
