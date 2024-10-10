/**
 * @file handleSave.tsx
 * @brief 사용자 정보 저장 처리 함수
 * @details 이 파일은 사용자 정보 저장을 처리하는 함수를 정의합니다.
 *
 * @author @zoeznm
 * @date 2024-08-25
 */

import React from "react";
import { User } from "../interface/usertype.interface";

/**
 * @function handleSave
 * @brief 사용자 정보를 저장하는 비동기 함수
 * @details 주어진 `onSave` 콜백 함수를 호출하여 사용자 정보를 저장합니다.
 * 만약 `onSave` 함수가 제공되지 않거나 호출 중 오류가 발생하면 콘솔에 로그를 남깁니다.
 *
 * @param {((users: User[]) => Promise<void>) | undefined} onSave - 사용자 정보를 저장할 콜백 함수
 * @param {User[]} users - 저장할 사용자 정보 배열
 * @returns {Promise<void>} - 비동기 작업의 완료를 나타내는 프로미스
 */
export const handleSave = async (
  onSave: ((users: User[]) => Promise<void>) | undefined,
  users: User[]
): Promise<void> => {
  if (onSave) {
    try {
      await onSave(users);
      console.log("사용자 정보 저장 성공");
    } catch (error) {
      console.error("사용자 정보 저장 실패:", error);
    }
  } else {
    console.log("onSave 함수가 제공되지 않았습니다.");
  }
};
