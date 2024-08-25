/**
 * @file handleAccept.ts
 * @brief 사용자 요청을 수락하는 기능을 제공하는 서비스 파일
 * @details 이 파일은 특정 사용자 요청을 수락하는 `handleAccept` 함수를 정의한다.
 * @author @zoeznm
 * @date 2024-08-25
 */

/**
 * @brief 사용자 요청을 수락하는 함수
 * @details 주어진 사용자 ID를 사용하여 해당 사용자 요청을 수락한다. 요청이 성공하면 알림을 표시한다.
 * @param user_id 수락할 사용자 ID
 * @throws {Error} HTTP 요청 실패 시 오류를 발생시킨다.
 */
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
  } catch (error) {
    console.error("변경 수락 실패:", error);
  }
};
