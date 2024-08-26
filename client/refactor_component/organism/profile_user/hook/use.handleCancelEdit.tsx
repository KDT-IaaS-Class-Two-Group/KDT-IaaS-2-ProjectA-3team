/**
 * @file handleCancelEdit.tsx
 * @brief 편집 취소 핸들러
 * @details 이 파일은 사용자의 편집 모드를 취소하고, 편집 필드를 초기화하는 핸들러 함수를 정의합니다.
 * 사용자가 편집을 취소할 때 호출되며, 편집 중인 사용자 ID를 초기화하고 편집 필드를 비웁니다.
 * 
 * @author @zoeznm
 * @date 2024-08-25
 */

import React from "react";

/**
 * @interface User
 * @brief 사용자 정보 타입
 * @details 사용자의 정보를 정의하는 타입으로, 사용자 ID, 이름, 생년월일, 주소, 전화번호, 이메일, 비밀번호를 포함합니다.
 */
export interface User {
  user_id: string;
  username: string;
  birth_date: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

/**
 * @function handleCancelEdit
 * @brief 편집 모드 취소 및 필드 초기화 함수
 * @details 사용자가 편집 모드를 취소할 때 호출됩니다. 편집 중인 사용자 ID를 초기화하고,
 * 편집 필드를 비워서 상태를 원래대로 되돌립니다.
 * 
 * @param {React.Dispatch<React.SetStateAction<string | null>>} setEditingUserId - 현재 편집 중인 사용자 ID를 설정하는 상태 업데이트 함수.
 * @param {React.Dispatch<React.SetStateAction<Partial<User>>>} setEditFields - 편집 필드를 설정하는 상태 업데이트 함수.
 * 
 * @example
 * handleCancelEdit(setEditingUserId, setEditFields);
 */
export const handleCancelEdit = (
  setEditingUserId: React.Dispatch<React.SetStateAction<string | null>>,
  setEditFields: React.Dispatch<React.SetStateAction<Partial<User>>>
) => {
  // 편집 중인 사용자 ID를 null로 설정하여 편집 모드를 취소합니다.
  setEditingUserId(null);

  // 편집 필드를 빈 객체로 설정하여 모든 편집 필드를 초기화합니다.
  setEditFields({});
};
