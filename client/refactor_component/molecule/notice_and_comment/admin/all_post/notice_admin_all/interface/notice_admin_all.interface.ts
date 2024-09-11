/**
 * @interface ListNotice
 * @description 공지사항 목록 항목을 나타내는 인터페이스입니다. 각 공지사항의 기본 정보를 포함합니다.
 */
export interface ListNotice {
  /**
   * @property _id
   * @type {string}
   * @description 공지사항의 고유 식별자입니다.
   */
  _id: string;

  /**
   * @property title
   * @type {string}
   * @description 공지사항의 제목입니다.
   */
  title: string;

  /**
   * @property user_id
   * @type {string}
   * @description 공지사항을 작성한 사용자의 ID입니다.
   */
  user_id: string;

  /**
   * @property createdAt
   * @type {string}
   * @description 공지사항이 생성된 날짜와 시간입니다. ISO 8601 형식의 문자열로 표현됩니다.
   */
  createdAt: string;
}
