/**
 * @enum REDIRECT_PATH
 * @brief 다른 사용자 유형을 위한 리다이렉트 경로를 정의하는 열거형.
 */
export enum REDIRECT_PATH {
  /**
   * @brief 관리자 사용자가 메인 관리자 페이지로 접근하기 위한 경로.
   */
  ADMIN_MAIN = '/admin/home',

  /**
   * @brief 일반 사용자가 메인 사용자 페이지로 접근하기 위한 경로.
   */
  USER_MAIN = '/user/home',
}
