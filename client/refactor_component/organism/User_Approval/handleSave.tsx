import { User } from "client/refactor_component/organism/User_Lookup/interface/usertypes";

export const handleSave = async (users: User[]) => {
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
