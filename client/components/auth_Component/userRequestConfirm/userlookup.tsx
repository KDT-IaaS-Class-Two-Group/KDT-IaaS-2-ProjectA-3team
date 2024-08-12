import React from "react";

import UserLookup, { User } from "client/model/services/userlookup";
import { pagemainmain, pagemaintext } from "client/styles/team/teampage.css";

const PendingUserLook: React.FC = () => {
  const handleSave = async (users: User[]) => {
    try {
      const response = await fetch("http://localhost:3001/getUser/all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ users }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("사용자 정보 저장 성공");
    } catch (error) {
      console.error("사용자 정보 저장 실패:", error);
    }
  };

  return (
    <div className={pagemainmain}>
      <div className={pagemaintext}>회원가입 대기 사용자 수락</div>
      <UserLookup onSave={handleSave} />
    </div>
  );
};

export default PendingUserLook;
