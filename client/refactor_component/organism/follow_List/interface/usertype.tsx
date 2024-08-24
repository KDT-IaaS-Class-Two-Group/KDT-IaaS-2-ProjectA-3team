/**
 * @file usertype.ts
 * @brief 사용자 정보를 정의하는 인터페이스
 * @details 이 파일은 애플리케이션에서 사용자 정보를 표현하기 위한 `User` 인터페이스를 정의합니다.
 * `User` 인터페이스는 사용자와 관련된 기본적인 정보 속성들을 포함하고 있습니다.
 *
 * @author @zoeznm
 * @date 2024-08-25
 */

/**
 * @interface User
 * @brief 사용자 정보를 나타내는 인터페이스
 * @details 이 인터페이스는 사용자에 대한 기본적인 정보를 정의합니다.
 * `user_id`, `username`, `email`을 포함하여 사용자의 주요 정보를 다룹니다.
 */
export interface User {
  /**
   * @property {string} user_id
   * @brief 사용자 고유 ID
   * @details 사용자를 구분하기 위한 고유한 식별자입니다. 데이터베이스에서 사용자의 레코드를 식별하는 데 사용됩니다.
   */
  user_id: string;

  /**
   * @property {string} username
   * @brief 사용자 이름
   * @details 사용자의 화면에 표시되는 이름입니다. 일반적으로 사용자에게 보여지는 이름입니다.
   */
  username: string;

  /**
   * @property {string} email
   * @brief 사용자 이메일
   * @details 사용자의 이메일 주소입니다. 이메일을 통한 사용자 식별 및 연락처로 사용됩니다.
   */
  email: string;
}
