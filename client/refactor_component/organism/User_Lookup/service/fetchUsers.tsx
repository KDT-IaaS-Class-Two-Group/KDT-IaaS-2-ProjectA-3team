import { User, Field } from "../interface/usertypes";

export const fetchUsers = async (): Promise<[User[], string[]]> => {
  try {
    const [userResponse, fieldResponse] = await Promise.all([
      fetch("http://localhost:3001/getUser/pending"),
      fetch("http://localhost:3001/getUser/fields"),
    ]);

    if (!userResponse.ok || !fieldResponse.ok) {
      throw new Error(`HTTP error! Status: ${userResponse.status}`);
    }

    const usersData: User[] = await userResponse.json();
    const fieldsData: Field[] = await fieldResponse.json();
    const fields = fieldsData.map((field: Field) => field.field_name);

    return [usersData, fields];
  } catch (error) {
    console.error("사용자 조회 실패:", error);
    throw error;
  }
};
