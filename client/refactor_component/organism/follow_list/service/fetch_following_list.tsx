/**
 * @file fetch_following_list.tsx
 * @brief 사용자 팔로잉 리스트를 가져오는 함수
 * @details 이 파일은 사용자의 팔로잉 리스트를 서버로부터 가져오는 `fetchFollowingList` 함수를 정의합니다.
 * 함수는 사용자의 팔로잉 목록을 포함하는 `User` 객체의 배열을 반환합니다.
 *
 * @author @zoeznm
 * @date 2024-08-25
 */

import { User } from "../props/user.props"; 
import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";

/**
 * @function fetchFollowingList
 * @brief 사용자 팔로잉 리스트를 가져오는 함수
 * @details 서버로부터 현재 사용자가 팔로우하고 있는 사용자 목록을 가져옵니다.
 * 요청은 GET 메서드를 사용하며, 쿠키를 포함하여 세션 기반 인증을 지원합니다.
 * 성공적으로 데이터를 가져오면, `User` 객체 배열을 반환합니다.
 *
 * @returns {Promise<User[]>} 팔로잉 리스트를 포함하는 `User` 객체 배열을 반환하는 프로미스
 * @throws {Error} 요청이 실패할 경우 오류를 발생시킵니다.
 */
export const fetchFollowingList = async (): Promise<User[]> => {
  const response = await fetch(`http://localhost:3001${REQUEST_URL.FOLLOWING_LIST}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 세션 기반 인증을 위한 쿠키 포함
  });

  if (!response.ok) {
    throw new Error("Failed to fetch following list");
  }

  return await response.json();
};
