import { useState, useEffect } from "react";
import getPendingUsers from "client/model/services/getPendingUsersData";

interface User {
  id: number;
  name: string;
  role: string;
  salary: number;
}

const usePendingUsers = () => {
  const [memberData, setMemberData] = useState<User[]>([]);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const usersData: { [key: string]: any }[] = await getPendingUsers();
        
        // User 타입에 맞게 데이터 변환
        const users: User[] = usersData.map(user => ({
          id: user.id,
          name: user.name,
          role: user.role,
          salary: user.salary
        }));
    
        setMemberData(users);
      } catch (error) {
        console.error("GET 요청 실패 : getPendingUserData", error);
      }
    };
    
    fetchPendingUsers();
  }, []);

  return [memberData, setMemberData] as const;
};
export default usePendingUsers;
