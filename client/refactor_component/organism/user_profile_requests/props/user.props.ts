/**
 * @file user.props.ts
 * @brief 사용자 정보를 정의하는 인터페이스
 * @details 이 파일은 사용자 정보를 나타내는 `User` 인터페이스를 정의한다.
 * @author @zoeznm
 * @date 2024-08-25
 */

/**
 * @interface User
 * @brief 사용자 정보를 정의하는 인터페이스
 * @details 사용자의 개인 정보를 나타내는 데이터 구조로, 사용자 ID, 사용자 이름, 생일, 주소, 전화번호, 이메일, 비밀번호를 포함한다.
 * 
 * @property {string} user_id - 사용자의 고유 식별자
 * @property {string} username - 사용자의 이름
 * @property {string} birth_date - 사용자의 생일 (형식: YYYY-MM-DD)
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
