/**
 * @interface ListNotice
 * @description
 * 공지사항 목록을 나타내는 데이터 구조를 정의합니다. 각 공지사항의 기본 정보를 포함합니다.
 *
 * @param {_id: string} - 공지사항의 고유 식별자입니다.
 * @param {title: string} - 공지사항의 제목입니다.
 * @param {user_id: string} - 공지사항 작성자의 사용자 ID입니다.
 * @param {createdAt: string} - 공지사항의 생성일입니다.
 */
export interface ListNotice {
  _id: string; // 공지사항의 고유 식별자
  title: string; // 공지사항의 제목
  user_id: string; // 공지사항 작성자의 사용자 ID
  createdAt: string; // 공지사항의 생성일
}
