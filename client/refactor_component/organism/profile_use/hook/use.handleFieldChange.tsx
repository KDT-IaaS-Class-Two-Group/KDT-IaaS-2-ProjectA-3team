/**
 * @file handleFieldChange.tsx
 * @brief 사용자 입력 필드 변경 핸들러
 * @details 이 파일은 사용자 입력 필드의 값을 변경하는 핸들러 함수를 정의합니다. 
 * 주어진 필드와 값을 사용하여 상태를 업데이트하는 데 사용됩니다.
 * 
 * @author @zoeznm
 * @date 2024-08-25
 */

import React from "react";
import { User } from "../interface/usertype.interface";
// ../interface/usertype.interface

/**
 * @function handleFieldChange
 * @brief 사용자 입력 필드의 값을 업데이트하는 함수
 * @details 주어진 필드와 값을 사용하여 `setEditFields` 함수를 호출하여 상태를 업데이트합니다.
 * 
 * @param {keyof User} field - 업데이트할 사용자 정보의 필드명. `User` 타입의 키 중 하나여야 함.
 * @param {string} value - 입력된 값. 업데이트할 필드의 새로운 값.
 * @param {React.Dispatch<React.SetStateAction<Partial<User>>>} setEditFields - 상태를 업데이트하는 함수. 
 *   `React.SetStateAction<Partial<User>>` 타입의 상태를 업데이트합니다.
 * 
 * @example
 * handleFieldChange('username', '새 사용자 이름', setEditFields);
 */
export const handleFieldChange = (
  field: keyof User,
  value: string,
  setEditFields: React.Dispatch<React.SetStateAction<Partial<User>>>
) => {
  setEditFields((prevFields) => ({
    ...prevFields,
    [field]: value,
  }));
};
