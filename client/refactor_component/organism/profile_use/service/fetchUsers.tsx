/**
 * @file fetchUsers.ts
 * @brief 사용자 및 프로필 정보를 비동기적으로 조회하는 함수
 * @details 이 파일은 사용자 및 프로필 정보를 서버에서 비동기적으로 가져오는 함수를 정의합니다.
 * 
 * @author @zoeznm
 * @date 2024-08-25
 */


// fetchUsers.tsx 파일 내 경로 수정
import { User, Profile } from "../interface/usertype.interface";



/**
 * @function fetchUsers
 * @brief 사용자와 프로필 정보를 서버에서 비동기적으로 가져오는 함수
 * @details 이 함수는 사용자 개인 정보와 프로필 정보를 비동기적으로 조회하여 상태를 업데이트합니다.
 * 
 * @param {React.Dispatch<React.SetStateAction<User[]>>} setUsers - 사용자 정보를 설정하는 상태 업데이트 함수
 * @param {React.Dispatch<React.SetStateAction<Map<string, string>>>} setProfiles - 사용자 프로필 정보를 설정하는 상태 업데이트 함수
 * @param {React.Dispatch<React.SetStateAction<Map<string, string>>>} setBios - 사용자 ID와 프로필 bio를 매핑하는 상태 업데이트 함수
 * @param {React.Dispatch<React.SetStateAction<Map<string, boolean>>>} setDisabledUsers - 사용자 ID와 비활성화 상태를 매핑하는 상태 업데이트 함수
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - 로딩 상태를 설정하는 상태 업데이트 함수
 * @returns {Promise<void>} - 비동기 작업의 완료를 나타내는 프로미스
 */
export const fetchUsers = async (
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  setProfiles: React.Dispatch<React.SetStateAction<Map<string, string>>>,
  setBios: React.Dispatch<React.SetStateAction<Map<string, string>>>,
  setDisabledUsers: React.Dispatch<React.SetStateAction<Map<string, boolean>>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  try {
    const [userResponse, profileResponse] = await Promise.all([
      fetch("http://localhost:3001/user/userpersonal", {
        credentials: "include", // 세션 기반 인증을 위한 쿠키 포함
      }),
      fetch("http://localhost:3001/user/userprofile", {
        credentials: "include", // 세션 기반 인증을 위한 쿠키 포함
      }),
    ]);

    if (!userResponse.ok || !profileResponse.ok) {
      throw new Error(`HTTP error! Status: ${userResponse.status}`);
    }

    const usersData: User[] = await userResponse.json();
    const profilesData: Profile[] = await profileResponse.json();

    if (Array.isArray(usersData) && Array.isArray(profilesData)) {
      setUsers(usersData);
      
      // 프로필 bio를 사용자 ID에 매핑합니다.
      const profileMap = new Map<string, string>(
        profilesData.map((profile) => [profile.user_id, profile.bio])
      );
      setProfiles(profileMap);

      // 사용자 ID와 프로필 bio를 매핑합니다.
      const biosMap = new Map<string, string>(
        usersData.map((user) => [
          user.user_id,
          profileMap.get(user.user_id) || "",
        ])
      );
      setBios(biosMap);

      // 사용자 ID와 비활성화 상태를 초기화합니다.
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
