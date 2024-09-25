/**
 * @file fetch_check_profile.tsx
 * @brief 사용자 검토 프로필 데이터를 가져오는 커스텀 훅
 * @details 이 파일은 사용자의 검토 프로필 데이터를 비동기적으로 가져오는 `useFetchCheckProfile` 커스텀 훅을 정의한다.
 * @author @zoeznm
 * @date 2024-08-25
 */

import { useState, useEffect } from "react";
import { User } from "../props/user.props"; 

/**
 * @brief 사용자 검토 프로필 데이터를 가져오는 훅
 * @details 이 훅은 사용자 검토 프로필 데이터를 비동기적으로 가져오고, 로딩 및 오류 상태를 관리한다.
 * @returns {Object} 사용자 데이터, 로딩 상태, 오류 메시지, 데이터 새로 고침 함수
 */
const useFetchCheckProfile = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * @brief 사용자 검토 프로필 데이터를 가져오는 함수
   * @details 이 함수는 사용자 검토 프로필 데이터를 비동기적으로 가져오고 상태를 업데이트한다.
   * @throws {Error} HTTP 요청 실패 시 오류를 발생시킨다.
   */
  const fetchCheckProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/user/checkprofile");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: User[] = await response.json();
      setUsers(data);
    } catch (error) {
      setError("사용자 정보 조회 실패: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCheckProfile();
  }, []);

  return { users, loading, error, fetchCheckProfile };
};

export default useFetchCheckProfile;
