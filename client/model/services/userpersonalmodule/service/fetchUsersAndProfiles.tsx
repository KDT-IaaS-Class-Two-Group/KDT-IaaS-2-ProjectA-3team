import { User, Profile } from "../interface/usertypes"; // 경로는 실제 위치로 변경

export const fetchUsersAndProfiles = async (): Promise<{
  users: User[];
  profiles: Map<string, string>;
}> => {
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

    // 응답 데이터를 JSON으로 변환
    const usersData: User[] = await userResponse.json();
    const profilesData: Profile[] = await profileResponse.json();

    // 프로필 데이터를 user_id를 키로 하는 Map으로 변환
    const profileMap = new Map<string, string>(
      profilesData.map((profile) => [profile.user_id, profile.bio])
    );

    return {
      users: usersData,
      profiles: profileMap,
    };
  } catch (error) {
    console.error("사용자 및 프로필 조회 실패:", error);
    throw error; // 호출 측에서 에러를 처리할 수 있도록 재던짐
  }
};
