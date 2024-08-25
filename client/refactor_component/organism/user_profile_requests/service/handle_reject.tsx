/**
 * @file handleReject.ts
 * @brief 사용자 요청을 거부하는 기능을 제공하는 서비스 파일
 * @details 이 파일은 특정 사용자 요청을 거부하는 `handleReject` 함수를 정의한다.
 * @author @zoeznm
 * @date 2024-08-25
 */

import { User } from "../props/user.props"; 

/**
 * @brief 사용자 요청을 거부하는 함수
 * @details 주어진 사용자 ID를 사용하여 해당 사용자 요청을 거부한다. 요청이 성공하면 알림을 표시한다.
 * @param user_id 거부할 사용자 ID
 * @throws {Error} HTTP 요청 실패 시 오류를 발생시킨다.
 */
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
  } catch (error) {
    console.error("변경 거절 실패:", error);
  }
};
