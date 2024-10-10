/**
 * @file handleDisableBio.ts
 * @brief 사용자 프로필 비활성화 핸들러
 * @details 이 파일은 사용자의 프로필을 비활성화 상태로 설정하는 핸들러 함수를 정의합니다.
 * 사용자가 비활성화 버튼을 클릭하면 해당 사용자 ID에 대한 비활성화 상태를 업데이트하고,
 * 사용자에게 비활성화 완료 알림을 표시합니다.
 *
 * @author @zoeznm
 * @date 2024-08-25
 */

import React from "react";

/**
 * @function handleDisableBio
 * @brief 사용자의 프로필을 비활성화하는 함수
 * @details 주어진 사용자 ID를 비활성화 상태로 설정하고, 사용자에게 비활성화 완료 알림을 표시합니다.
 *
 * @param {string} userId - 비활성화할 사용자의 ID.
 * @param {React.Dispatch<React.SetStateAction<Map<string, boolean>>>} setDisabledUsers - 비활성화 상태를 설정하는 상태 업데이트 함수.
 *
 * @example
 * handleDisableBio('user123', setDisabledUsers);
 */
export const handleDisableBio = (
  userId: string,
  setDisabledUsers: React.Dispatch<React.SetStateAction<Map<string, boolean>>>
) => {
  // 현재 비활성화 상태를 복사하여 새로운 Map 객체를 생성합니다.
  setDisabledUsers((prevDisabled) => new Map(prevDisabled).set(userId, true));

  // 비활성화 완료 알림을 표시합니다.
  alert("비활성화되었습니다.");
};
