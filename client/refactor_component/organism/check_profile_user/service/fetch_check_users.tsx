/**
 * @file fetch_check_users.tsx
 * @brief 사용자 프로필 수정 요청 조회 모듈
 * @details 이 파일은 사용자 프로필 수정 요청을 조회하기 위한 비동기 함수 `fetchCheckUsers`를 정의합니다.
 * 이 함수는 API 요청을 통해 사용자 데이터를 가져와 상태를 업데이트하며, 로딩 상태를 관리합니다.
 *
 * @author @zoeznm
 * @date 2024-08-23
 */

import { User } from "../props/user.props";

/**
 * @function fetchCheckUsers
 * @brief 사용자 프로필 수정 요청을 조회하는 함수
 * @details 서버에서 사용자 프로필 수정 요청 정보를 가져오고,
 * 이를 상태로 설정하며 로딩 상태를 관리하는 비동기 함수입니다.
 *
 * @param {React.Dispatch<React.SetStateAction<User[]>>} setUsers - 사용자 데이터를 설정하는 상태 업데이트 함수
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - 로딩 상태를 설정하는 상태 업데이트 함수
 * @returns {Promise<void>} - 비동기 작업의 완료를 나타내는 프로미스
 * @throws {Error} - 요청 중 발생한 오류를 던집니다.
 */
export const fetchCheckUsers = async (
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  // 로딩 상태를 시작
  setLoading(true);

  try {
    // API 요청을 통해 사용자 프로필 수정 요청 정보를 가져옴
    const response = await fetch(`http://localhost:3001/getUser/checkprofile`);

    // 응답 상태가 성공적이지 않으면 오류를 던짐
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // 사용자 데이터를 JSON 형태로 파싱
    const data: User[] = await response.json();

    // 사용자 상태를 업데이트
    setUsers(data);
  } catch (error) {
    // 오류가 발생하면 콘솔에 오류 메시지를 출력
    console.error("사용자 정보 조회 실패:", error);
  } finally {
    // 로딩 상태를 종료
    setLoading(false);
  }
};
