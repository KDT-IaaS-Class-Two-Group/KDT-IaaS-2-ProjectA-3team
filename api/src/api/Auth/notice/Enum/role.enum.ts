/**
 * @enum Role
 * @description 사용자 역할을 정의하는 열거형(enum)입니다.
 */
export enum Role {
  /**
   * @property Employee
   * @description 사용자 역할을 나타냅니다.
   */
  Employee = 'employee',

  /**
   * @property Leader
   * @description 팀 리더 역할을 나타냅니다.
   */
  Leader = 'leader',

  /**
   * @property Admin
   * @description 관리자 역할을 나타냅니다. 시스템의 모든 권한을 가진 역할입니다.
   */
  Admin = 'admin',

  /**
   * @property SubAdmin
   * @description 하위 관리자 역할을 나타냅니다. 일부 관리자 권한을 가진 역할입니다.
   */
  SubAdmin = 'sub_admin',
}
