// handleSave.tsx
import React from "react";

// User 타입 정의
export interface User {
  user_id: string;
  username: string;
  birth_date: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

export const handleSave = async (
  onSave: ((users: User[]) => Promise<void>) | undefined,
  users: User[]
) => {
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
