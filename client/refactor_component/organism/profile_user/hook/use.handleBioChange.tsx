/**
 * @file handleBioChange.tsx
 * @brief 사용자 프로필 bio 변경 핸들러
 * @details 이 파일은 사용자의 프로필 bio를 변경하는 핸들러 함수를 정의합니다.
 * 주어진 사용자 ID와 새로운 bio 값을 사용하여 상태에 있는 bio 정보를 업데이트합니다.
 * 
 * @author @zoeznm
 * @date 2024-08-25
 */

import React from "react";

/**
 * @function handleBioChange
 * @brief 사용자 프로필 bio를 업데이트하는 함수
 * @details 주어진 사용자 ID와 새로운 bio 값을 사용하여 상태에 있는 bio 정보를 업데이트합니다.
 * 상태 업데이트 함수 `setBios`를 호출하여 bio 맵을 업데이트합니다.
 * 
 * @param {string} userId - 업데이트할 사용자 ID
 * @param {string} value - 새로운 bio 값
 * @param {React.Dispatch<React.SetStateAction<Map<string, string>>>} setBios - 상태 업데이트 함수로, 사용자 ID와 bio를 매핑하는 맵을 설정합니다.
 * 
 * @example
 * handleBioChange("user123", "새로운 bio 내용", setBios);
 */
export const handleBioChange = (
  userId: string,
  value: string,
  setBios: React.Dispatch<React.SetStateAction<Map<string, string>>>
) => {
  // 이전 상태의 맵을 복사하여 새로운 맵을 생성한 후, 주어진 userId에 대해 새로운 bio 값을 설정합니다.
  setBios((prevBios) => new Map(prevBios).set(userId, value));
};
