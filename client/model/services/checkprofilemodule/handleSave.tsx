import {User, CheckprofileProps } from "./usertypes"


export const handleSave = async (users: User[]): Promise<void> => {
  try {
    // 여기서 실제 API 요청이나 로컬 스토리지 저장 등의 로직을 처리
    console.log("사용자 정보 저장 성공");
  } catch (error) {
    console.error("사용자 정보 저장 실패:", error);
    throw error;
  }
};
