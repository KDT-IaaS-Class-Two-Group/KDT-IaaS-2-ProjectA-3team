import useFetchCheckProfile from "./fetchCheckProfile"

export const handleReject = async (user_id: string) => {
  try {
    const response = await fetch("http://localhost:3001/getUser/reject", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    alert("변경사항이 거절되었습니다.");
    useFetchCheckProfile(); // 데이터 새로 고침
  } catch (error) {
    console.error("변경 거절 실패:", error);
  }
};