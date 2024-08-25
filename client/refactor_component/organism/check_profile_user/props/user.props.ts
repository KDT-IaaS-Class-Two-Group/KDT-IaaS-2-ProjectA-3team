/**
 * @file user.props.ts
 * @brief 사용자 및 프로필 수정 요청 타입 정의
 * @details 이 파일은 사용자와 프로필 수정 요청에 관련된 타입을 정의합니다.
 * 
 * @author @zoeznm
 * @date 2024-08-25
 */

/**
 * @interface User
 * @brief 사용자 정보를 나타내는 인터페이스
 * @details 사용자의 상세 정보를 포함하는 객체의 구조를 정의합니다.
 * 
 * @property {string} user_id - 사용자의 고유 ID
 * @property {string} username - 사용자의 이름
 * @property {string} birth_date - 사용자의 생년월일 (YYYY-MM-DD 형식)
 * @property {string} address - 사용자의 주소
 * @property {string} phone - 사용자의 핸드폰 번호
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
 * @interface CheckprofileProps
 * @brief 프로필 수정 요청 컴포넌트에 전달되는 속성 정의
 * @details 프로필 수정 요청 컴포넌트가 받는 속성과 관련된 인터페이스입니다.
 * 
 * @property {function} onSave - 프로필 수정 요청 데이터를 저장하는 콜백 함수
 * @param {User[]} checkusers - 저장할 사용자 프로필 수정 요청 데이터 배열
 * @returns {Promise<void>} - 비동기 작업의 완료를 나타내는 프로미스
 */
export interface CheckprofileProps {
  onSave: (checkusers: User[]) => Promise<void>;
}
