// fetchUsers.ts

import { User, Profile } from "../userpersonalmodule/usertypes"; // User와 Profile 타입이 정의된 파일의 경로를 맞추세요

export const fetchUsers = async (
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  setProfiles: React.Dispatch<React.SetStateAction<Map<string, string>>>,
  setBios: React.Dispatch<React.SetStateAction<Map<string, string>>>,
  setDisabledUsers: React.Dispatch<React.SetStateAction<Map<string, boolean>>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const [userResponse, profileResponse] = await Promise.all([
      fetch("http://localhost:3001/getUser/userpersonal", {
        credentials: "include",
      }),
      fetch("http://localhost:3001/getUser/userprofile", {
        credentials: "include",
      }),
    ]);

    if (!userResponse.ok || !profileResponse.ok) {
      throw new Error(`HTTP error! Status: ${userResponse.status}`);
    }

    const usersData: User[] = await userResponse.json();
    const profilesData: Profile[] = await profileResponse.json();

    if (Array.isArray(usersData) && Array.isArray(profilesData)) {
      setUsers(usersData);
      const profileMap = new Map<string, string>(
        profilesData.map((profile) => [profile.user_id, profile.bio])
      );
      setProfiles(profileMap);

      const biosMap = new Map<string, string>(
        usersData.map((user) => [
          user.user_id,
          profileMap.get(user.user_id) || "",
        ])
      );
      setBios(biosMap);

      const disabledMap = new Map<string, boolean>(
        usersData.map((user) => [user.user_id, false])
      );
      setDisabledUsers(disabledMap);
    } else {
      console.error("Unexpected response format:", usersData, profilesData);
    }
  } catch (error) {
    console.error("사용자 조회 실패:", error);
  } finally {
    setLoading(false);
  }
};
