/**
 * @file fetchUsersAndProfiles.ts
 * @brief 사용자와 프로필 정보를 조회하는 함수
 * @details 이 파일은 사용자와 그에 대한 프로필 정보를 동시에 조회하는 `fetchUsersAndProfiles` 함수를 정의한다.
 * @author @zoeznm
 * @date 2024-08-25
 */

import { User, Profile } from "../props/user.props";  // 경로는 실제 위치로 변경

/**
 * @function fetchUsersAndProfiles
 * @brief 사용자 및 프로필 정보를 조회하는 함수
 * @details 이 함수는 사용자 개인 정보와 사용자 프로필 정보를 동시에 조회하여 반환한다.
 * 
 * @return {Promise<{ users: User[]; profiles: Map<string, string> }>} 
 *         - `users`: `User` 객체 배열로 사용자의 개인 정보를 포함한다.
 *         - `profiles`: `Map` 객체로 사용자 ID를 키로 하고 프로필 bio를 값으로 갖는다.
 * 
 * @throws {Error} HTTP 요청이 실패하거나 데이터 처리 중 오류가 발생할 수 있다.
 * 
 * @example
 * const { users, profiles } = await fetchUsersAndProfiles();
 * console.log(users); // 사용자 개인 정보 출력
 * console.log(profiles); // 사용자 프로필 정보 출력
 */
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
