/**
 * @file handleEditClick.ts
 * @brief 사용자 편집 모드 전환 핸들러
 * @details 이 파일은 사용자가 특정 사용자를 편집할 때 필요한 상태를 설정하는 핸들러 함수를 정의합니다.
 * 클릭된 사용자 ID에 해당하는 사용자의 정보를 편집 필드에 설정하여 편집 모드로 전환합니다.
 *
 * @author @zoeznm
 * @date 2024-08-25
 */

import { User, EditFields } from "../interface/use.interface";

/**
 * @function handleEditClick
 * @brief 편집 모드로 전환하여 사용자의 정보를 설정하는 함수
 * @details 주어진 사용자 ID에 해당하는 사용자의 정보를 찾아서 편집 필드에 설정하고,
 * 편집 중인 사용자 ID를 업데이트합니다.
 *
 * @param {string} userId - 편집할 사용자의 ID.
 * @param {User[]} users - 전체 사용자 목록 배열. 이 목록에서 특정 사용자를 찾기 위해 사용됩니다.
 * @param {(id: string | null) => void} setEditingUserId - 편집 중인 사용자 ID를 설정하는 함수.
 *   `string` 또는 `null` 값을 사용하여 상태를 업데이트합니다.
 * @param {(fields: Partial<EditFields>) => void} setEditFields - 편집 필드를 설정하는 함수.
 *   `Partial<EditFields>` 타입의 필드를 사용하여 상태를 업데이트합니다.
 *
 * @example
 * handleEditClick('123', users, setEditingUserId, setEditFields);
 */
export const handleEditClick = (
  userId: string,
  users: User[],
  setEditingUserId: (id: string | null) => void,
  setEditFields: (fields: Partial<EditFields>) => void
) => {
  // 편집 중인 사용자 ID를 설정합니다.
  setEditingUserId(userId);

  // 주어진 사용자 ID를 가진 사용자를 찾습니다.
  const user = users.find((user) => user.user_id === userId);

  // 사용자가 존재하면, 편집 필드를 설정합니다.
  if (user) {
    setEditFields({
      username: user.username,
      birth_date: user.birth_date,
      address: user.address,
      phone: user.phone,
      email: user.email,
      password: user.password,
    });
  }
};
