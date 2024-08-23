// client/model/services/checkprofilemodule/fetchCheckUsers.ts
import { User } from "./usertypes";

export const fetchCheckUsers = async (
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const response = await fetch(`http://localhost:3001/getUser/checkprofile`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: User[] = await response.json();
    setUsers(data);
  } catch (error) {
    console.error("사용자 정보 조회 실패:", error);
  } finally {
    setLoading(false);
  }
};
