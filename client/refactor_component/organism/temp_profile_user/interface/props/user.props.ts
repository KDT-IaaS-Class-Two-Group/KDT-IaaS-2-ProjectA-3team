/**
 * @file types.ts
 * @brief 사용자 및 프로필 관련 타입 정의
 * @details 이 파일은 사용자와 프로필에 대한 타입을 정의하며, 프로필 편집 및 사용자 데이터 처리를 위한 인터페이스를 제공합니다.
 *
 * @author @zoeznm
 * @date 2024-08-25
 */

/**
 * @interface User
 * @brief 사용자 정보를 나타내는 타입
 * @details 사용자 개인 정보와 관련된 속성을 정의합니다.
 *
 * @property {string} user_id - 사용자의 고유 식별자
 * @property {string} username - 사용자의 이름
 * @property {string} birth_date - 사용자의 생년월일
 * @property {string} address - 사용자의 주소
 * @property {string} phone - 사용자의 전화번호
 * @property {string} email - 사용자의 이메일 주소
 * @property {string} password - 사용자의 비밀번호
 */
export interface User {
  user_id: string;
  username: string;
  birth_date: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

/**
 * @interface Profile
 * @brief 사용자 프로필 정보를 나타내는 타입
 * @details 사용자 ID와 프로필 정보를 매핑하는 속성을 정의합니다.
 *
 * @property {string} user_id - 사용자의 고유 식별자
 * @property {string} bio - 사용자의 프로필 bio
 */
export interface Profile {
  user_id: string;
  bio: string;
}

/**
 * @interface UserPersonalProps
 * @brief 사용자 개인 정보 관련 프로퍼티
 * @details 사용자 정보를 저장할 때 사용할 수 있는 onSave 콜백을 선택적으로 받는 프로퍼티를 정의합니다.
 *
 * @property {((users: User[]) => Promise<void>) | undefined} onSave - 사용자 정보를 저장하는 비동기 함수
 */
export interface UserPersonalProps {
  onSave?: (users: User[]) => Promise<void>; // onSave를 선택적으로 받도록 수정
}

/**
 * @interface EditFields
 * @brief 사용자 편집 필드를 나타내는 타입
 * @details 사용자 정보를 편집할 때 사용할 수 있는 선택적 필드를 정의합니다.
 *
 * @property {string} [username] - 사용자의 이름
 * @property {string} [birth_date] - 사용자의 생년월일
 * @property {string} [address] - 사용자의 주소
 * @property {string} [phone] - 사용자의 전화번호
 * @property {string} [email] - 사용자의 이메일 주소
 * @property {string} [password] - 사용자의 비밀번호
 */
export interface EditFields {
  username?: string;
  birth_date?: string;
  address?: string;
  phone?: string;
  email?: string;
  password?: string;
}
