/**
 * @file useFollowPage.ts
 * @brief 사용자 검색 및 팔로우 페이지 관리를 위한 커스텀 훅
 * @details 이 훅은 사용자 검색, 팔로우 상태 및 로딩 상태를 관리합니다. 
 * 세션 데이터를 활용하여 현재 사용자 정보를 추적하고, 사용자 목록을 가져옵니다.
 *
 * @author @zoeznm
 * @date 2024-08-25
 */

import { useState } from "react";
import { useSessionData } from "./useSessionData";
import { useLoading } from "./userLoading";
import { User } from "../interface/usertype";
import { fetchUsers } from "../service/fetchUsers";

/**
 * @brief 팔로우 페이지 관리를 위한 커스텀 훅
 * @details 이 훅은 사용자 검색어, 검색 결과로 반환된 사용자 목록, 
 * 로딩 상태 및 세션 데이터를 관리하며, 검색 및 전체 사용자 목록 가져오기 기능을 제공합니다.
 *
 * @return {object} 
 * - searchQuery: 현재 검색어 상태
 * - setSearchQuery: 검색어를 업데이트하는 함수
 * - users: 검색된 사용자 목록
 * - handleSearch: 검색을 실행하는 함수
 * - fetchAllUsers: 모든 사용자를 가져오는 함수
 * - loading: 로딩 상태
 * - sessionData: 현재 세션 데이터
 */
export const useFollowPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const sessionData = useSessionData();
  const { loading, setLoading } = useLoading();

  /**
   * @brief 사용자 검색을 처리하는 함수
   * @details 검색어를 기반으로 사용자를 검색하고 결과를 업데이트합니다. 
   * 검색어가 비어있을 경우, 모든 사용자를 가져옵니다.
   */
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchAllUsers();
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/getUser/search?query=${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const data: User[] = await response.json();
        setUsers(data);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error occurred while fetching users", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * @brief 모든 사용자를 가져오는 함수
   * @details 서버에서 모든 사용자 목록을 가져와 상태를 업데이트합니다.
   */
  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error occurred while fetching users", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    users,
    handleSearch,
    fetchAllUsers,
    loading,
    sessionData,
  };
};
