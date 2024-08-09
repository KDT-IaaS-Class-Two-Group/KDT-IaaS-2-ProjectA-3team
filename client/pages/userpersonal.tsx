import { useState } from "react";

import UserPersonal, { User } from "client/model/services/userpersonal";
import { greenButton, purpleButton } from "client/styles/templatebutton.css";
import Sidebar from "../components/SideBar/AdminSidebar";

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
      <Sidebar></Sidebar>
      <div>
        <h1>My profile</h1>
        {status && <UserPersonal onSave={handleSave} />}
        <button className={greenButton} onClick={() => setStatus(true)}>
          조회하기
        </button>
      </div>
    </div>
  );
};

export default TestPage;
