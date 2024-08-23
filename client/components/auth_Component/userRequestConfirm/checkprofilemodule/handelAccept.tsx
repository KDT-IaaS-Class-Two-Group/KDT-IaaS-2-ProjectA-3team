import {User} from "./usertypes"
import useFetchCheckProfile from "./fetchCheckProfile"

export const handleAccept = async (user_id: string) => {
  try {
    const response = await fetch("http://localhost:3001/getUser/accept", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    alert("변경사항이 수락되었습니다.");
    useFetchCheckProfile(); // 데이터 새로 고침
  } catch (error) {
    console.error("변경 수락 실패:", error);
  }
};