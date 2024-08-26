/**
 * @file handleUpdateUser.ts
 * @brief 사용자 정보 업데이트 처리 함수
 * @details 이 파일은 사용자의 정보를 업데이트하는 함수를 정의합니다.
 * 
 * @author @zoeznm
 * @date 2024-08-25
 */

import { User } from "../interface/usertype.interface";

/**
 * @function handleUpdateUser
 * @brief 사용자의 정보를 업데이트하는 비동기 함수
 * @details 주어진 사용자 ID와 편집된 필드 정보를 사용하여 사용자 정보를 업데이트합니다.
 * 업데이트가 완료되면 `handleCancelEdit` 함수를 호출하여 편집 상태를 취소합니다.
 * 
 * @param {string} userId - 업데이트할 사용자의 ID
 * @param {Partial<User>} editFields - 업데이트할 사용자 정보의 일부 필드
 * @param {() => void} handleCancelEdit - 편집 취소를 처리하는 함수
 * @returns {Promise<void>} - 비동기 작업의 완료를 나타내는 프로미스
 */
export const handleUpdateUser = async (
  userId: string,
  editFields: Partial<User>,
  handleCancelEdit: () => void
): Promise<void> => {
  try {
    const updateuser = {
      user_id: userId,
      ...editFields,
    };

    const response = await fetch("http://localhost:3001/getUser/insertuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateuser),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log("사용자 정보 입력 성공");
    handleCancelEdit();
  } catch (error) {
    console.error("사용자 정보 입력 실패:", error);
  }
};
