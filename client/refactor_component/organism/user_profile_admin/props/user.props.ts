/**
 * @file user.props.ts
 * @brief 사용자 및 프로필 데이터 타입 정의
 * @details 이 파일은 사용자 정보와 프로필 정보의 데이터 타입을 정의하고, 사용자 정보를 저장하는 콜백 함수의 타입을 정의한다.
 * @author @zoeznm
 * @date 2024-08-25
 */

/**
 * @interface User
 * @brief 사용자 정보를 정의하는 타입
 * @details 이 인터페이스는 사용자의 개인 정보를 포함한다.
 *
 * @property {string} user_id - 사용자의 고유 ID
 * @property {string} username - 사용자의 사용자명
 * @property {string} birth_date - 사용자의 생년월일 (형식: YYYY-MM-DD)
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
 * @brief 사용자 프로필 정보를 정의하는 타입
 * @details 이 인터페이스는 사용자의 프로필 정보 (자기소개)를 포함한다.
 *
 * @property {string} user_id - 사용자 고유 ID (외래 키)
 * @property {string} bio - 사용자 자기소개
 */
export interface Profile {
  user_id: string; // 외래 키
  bio: string; // 자기소개
}

/**
 * @interface UserPersonalProps
 * @brief 사용자 정보를 저장하는 콜백 함수의 타입을 정의
 * @details 이 인터페이스는 사용자 정보를 저장하기 위한 콜백 함수의 타입을 정의한다.
 *
 * @property {(users: User[]) => Promise<void>} onSave - 사용자 정보를 저장하는 콜백 함수
 */
export interface UserPersonalProps {
  onSave: (users: User[]) => Promise<void>;
}
