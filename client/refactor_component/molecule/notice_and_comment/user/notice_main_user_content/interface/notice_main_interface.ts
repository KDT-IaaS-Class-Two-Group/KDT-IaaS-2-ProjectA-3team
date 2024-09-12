/**
 * @interface ListNotice
 * @description
 * 공지 사항 데이터를 정의하는 인터페이스입니다. 각 공지 사항은 고유 ID, 제목, 사용자 ID, 생성 날짜를 포함합니다.
 */
export interface ListNotice {
  _id: string;  // 공지 사항의 고유 식별자
  title: string;    // 공지 사항 제목
  user_id: string;  // 공지 사항을 작성한 사용자 ID
  createdAt: string; // 공지 사항 생성일자
}