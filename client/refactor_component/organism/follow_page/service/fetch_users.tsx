/**
 * @file fetchUsers.ts
 * @brief 사용자 목록을 가져오는 서비스
 * @details 서버로부터 모든 사용자 정보를 가져오는 함수로, GET 요청을 사용하여 데이터를 불러옵니다.
 *
 * @author @zoeznm
 * @date 2024-08-25
 */

import { User } from "../props/user.props";
import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";

/**
 * @brief 사용자 목록을 가져오는 함수
 * @details 서버에서 모든 사용자의 정보를 가져오는 비동기 함수입니다. 요청이 성공하면 사용자 목록을 반환하고, 실패하면 에러를 발생시킵니다.
 * 
 * @return {Promise<User[]>} 사용자 정보가 담긴 배열을 반환합니다.
 * @throws {Error} 서버 요청 실패 시 오류를 발생시킵니다.
 */
export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${REQUEST_URL.__LOGIN}/user/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return await response.json();
};
