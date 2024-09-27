/**
 * @file user.props.ts
 * @brief 사용자 및 필드 관련 데이터 타입 정의
 * @details 이 파일은 사용자 정보와 필드 정보를 정의하는 데이터 타입 및 사용자 정보를 저장하는 콜백 함수의 타입을 정의한다.
 * @author @zoeznm
 * @date 2024-08-25
 */

/**
 * @interface User
 * @brief 사용자 정보를 정의하는 타입
 * @details 이 인터페이스는 사용자의 기본 정보와 선택적 속성을 포함한다.
 * 
 * @property {string} id - 사용자의 고유 ID
 * @property {string} username - 사용자의 사용자명
 * @property {number} [salary] - 사용자의 급여 (선택적)
 * @property {string} [role_name] - 사용자의 역할 이름 (선택적)
 * @property {string} [field_name] - 사용자의 필드 이름 (선택적)
 */
export interface User {
  id: string;
  username: string;
  salary?: number;
  role_name?: string;
  field_name?: string;
}
/**
 * @interface UserItemProps
 * @brief 사용자 정보를 기반으로 승인 및 취소 기능을 담당하는 컴포넌트의 props 정의
 * @details 이 인터페이스는 사용자 정보와 승인/취소 함수의 타입을 정의한다.
 *
 * @property {number} index - 사용자 인덱스
 * @property {User} item - 사용자 정보 객체
 * @property {(index: number, item: User) => Promise<void>} onApprove - 사용자를 승인하는 함수
 * @property {(index: number, item: User) => Promise<void>} onCancel - 사용자를 취소하는 함수
 */
export interface UserItemProps {
  index: number;
  item: User;
  onApprove: (index: number, item: User) => Promise<void>;
  onCancel: (index: number, item: User) => Promise<void>;
}

/**
 * @interface Field
 * @brief 필드 정보를 정의하는 타입
 * @details 이 인터페이스는 필드의 이름을 포함한다.
 * 
 * @property {string} field_name - 필드의 이름
 */
export interface Field {
  field_name: string;
}

/**
 * @interface UserLookupProps
 * @brief 사용자 정보를 저장하는 콜백 함수의 타입을 정의
 * @details 이 인터페이스는 사용자 정보를 저장하기 위한 콜백 함수의 타입을 정의한다.
 * 
 * @property {(users: User[]) => Promise<void>} onSave - 사용자 정보를 저장하는 콜백 함수
 */
export interface UserLookupProps {
  onSave: (users: User[]) => Promise<void>;
}
