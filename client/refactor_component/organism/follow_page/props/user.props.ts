/**
 * @file usertype.ts
 * @brief 사용자 정보를 정의하는 타입
 * @details 이 파일은 사용자와 관련된 정보를 정의하는 `User` 인터페이스를 포함합니다.
 * 사용자 ID, 이름, 이메일, 그리고 팔로우 상태를 포함한 사용자 정보를 표현합니다.
 *
 * @author @zoeznm
 * @date 2024-08-25
 */

/**
 * @interface User
 * @brief 사용자 정보를 표현하는 인터페이스
 * @details 사용자 객체는 사용자 ID, 사용자 이름, 이메일, 그리고 팔로우 상태를 포함합니다.
 * 이 인터페이스는 사용자 목록을 처리하거나 사용자 관련 기능을 구현할 때 사용됩니다.
 *
 * @property {string} user_id - 사용자의 고유 ID
 * @property {string} username - 사용자의 이름
 * @property {string} email - 사용자의 이메일 주소
 * @property {boolean} isFollowing - 사용자가 현재 다른 사용자를 팔로우하고 있는지 여부
 */
export interface User {
  user_id: string;
  username: string;
  email: string;
  isFollowing: boolean;
}
