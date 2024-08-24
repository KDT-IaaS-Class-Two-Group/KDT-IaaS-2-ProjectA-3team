/**
 * @file handleSave.ts
 * @brief 사용자 정보를 서버에 저장하는 함수
 * @details 이 함수는 사용자 정보를 JSON 형식으로 변환하여 서버에 POST 요청을 보내고, 저장 결과를 콘솔에 출력한다.
 * @author @zoeznm
 * @date 2024-08-25
 */

import { User } from "client/refactor_component/organism/User_Lookup/interface/usertypes";

/**
 * @function handleSave
 * @brief 사용자 정보를 서버에 저장하는 함수
 * @details 이 함수는 제공된 사용자 정보 목록을 JSON 형식으로 변환하여 지정된 서버 엔드포인트로 POST 요청을 보낸다.
 *          요청의 응답 상태를 확인하고, 성공 여부에 따라 콘솔에 메시지를 출력한다.
 * 
 * @param {User[]} users - 저장할 사용자 정보 목록
 * 
 * @return {Promise<void>} - 함수가 비동기적으로 작업을 수행하며, 반환 값은 없음
 * 
 * @throws {Error} - 요청이 실패하거나 서버에서 오류가 발생한 경우 예외를 던진다.
 * 
 * @example
 * // 사용자 정보를 저장할 때
 * const users: User[] = [...]; // 사용자 목록을 정의
 * handleSave(users);
 * 
 * @note 사용자 정보 저장 작업은 비동기로 처리되며, 요청이 성공하면 콘솔에 성공 메시지가 출력된다.
 */
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
