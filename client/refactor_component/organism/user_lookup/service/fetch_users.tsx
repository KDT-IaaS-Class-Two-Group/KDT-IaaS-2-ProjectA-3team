/**
 * @file fetch_users.tsx
 * @brief 사용자 및 필드 데이터를 비동기적으로 가져오는 함수
 * @details 이 함수는 사용자와 필드 데이터를 비동기적으로 가져오고, 사용자 데이터와 필드 이름 배열을 반환한다.
 * @author @zoeznm
 * @date 2024-08-25
 */

import { User, Field } from "../props/user.props";

/**
 * @function fetchUsers
 * @brief 사용자 및 필드 데이터를 비동기적으로 가져오는 함수
 * @details 이 함수는 두 개의 API 엔드포인트로부터 사용자와 필드 데이터를 비동기적으로 가져온다.
 *          사용자 데이터는 `User` 배열 형태로 반환되고, 필드 데이터는 문자열 배열 형태로 반환된다.
 *
 * @return {Promise<[User[], string[]]>} 사용자 데이터와 필드 이름 배열을 포함하는 튜플을 반환하는 Promise
 *
 * @throws {Error} HTTP 요청이 실패하거나 상태 코드가 200이 아닌 경우 에러를 발생시킨다.
 */
export const fetchUsers = async (): Promise<[User[], string[]]> => {
  try {
    const [userResponse, fieldResponse] = await Promise.all([
      fetch("http://localhost:3001/user/pending"),
      fetch("http://localhost:3001/user/fields"),
    ]);

    if (!userResponse.ok || !fieldResponse.ok) {
      throw new Error(`HTTP error! Status: ${userResponse.status}`);
    }

    const usersData: User[] = await userResponse.json();
    const fieldsData: Field[] = await fieldResponse.json();
    const fields = fieldsData.map((field: Field) => field.field_name);

    return [usersData, fields];
  } catch (error) {
    console.error("사용자 조회 실패:", error);
    throw error;
  }
};
