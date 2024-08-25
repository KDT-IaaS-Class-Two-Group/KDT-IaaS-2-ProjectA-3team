/**
 * @file handleInputChange.ts
 * @brief 사용자 입력 변경을 처리하는 헬퍼 함수
 * @details 이 함수는 입력 필드의 변경을 처리하여 사용자 목록을 업데이트한다.
 *          입력된 값을 적절한 타입으로 변환하고, 해당 인덱스의 사용자의 정보를 업데이트한다.
 * @author @zoeznm
 * @date 2024-08-25
 */

import { User } from "../props/user.props"; 

/**
 * @function handleInputChange
 * @brief 입력 필드의 변경을 처리하여 사용자 목록을 업데이트하는 함수
 * @details 이 함수는 특정 인덱스의 사용자의 입력 필드를 변경하여 사용자 목록을 업데이트한다.
 *          필드 타입에 따라 값이 문자열 또는 숫자로 변환된다.
 * 
 * @param {number} index - 업데이트할 사용자의 인덱스
 * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - 입력 필드의 변경 이벤트
 * @param {keyof User} field_name - 업데이트할 사용자 필드의 이름
 * @param {User[]} users - 현재 사용자 목록
 * @param {React.Dispatch<React.SetStateAction<User[]>>} setUsers - 사용자 목록을 업데이트하는 상태 설정 함수
 * 
 * @return {void}
 * 
 * @example
 * // 사용자의 `salary` 필드를 업데이트
 * handleInputChange(0, event, "salary", users, setUsers);
 * 
 * @note `field_name`이 "salary"인 경우, 입력 값을 숫자로 변환한다.
 */
export const handleInputChange = (
  index: number,
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  field_name: keyof User,
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
) => {
  const value =
    field_name === "salary" ? Number(e.target.value) : e.target.value;
  const updatedUsers = users.map((u, i) =>
    i === index
      ? {
          ...u,
          [field_name]: value,
        }
      : u
  );
  setUsers(updatedUsers);
};
