import { useState, useEffect } from "react";
import getPendingUsers from "client/model/services/getPendingUsersData";

export const usePendingUsers = () => {
  const [memberData, setMemberData] = useState<{ [key: string]: any }[]>([]);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const users = await getPendingUsers();
        setMemberData(users);
      } catch (error) {
        console.error("GET 요청 실패 : getPendingUserData", error);
      }
    };
    fetchPendingUsers();
  }, []);

  return [memberData, setMemberData] as const;
};