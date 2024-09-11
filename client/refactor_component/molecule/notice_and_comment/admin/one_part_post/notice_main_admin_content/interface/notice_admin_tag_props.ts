/**
 * @interface NoticeTagsProps
 * @description
 * 공지사항의 태그 정보를 포함하는 데이터 구조를 정의합니다. 각 태그가 표시할 공지사항의 정보를 포함합니다.
 * 
 * @param {index: number} - 페이지네이션 인덱스 번호입니다.
 * @param {title: string} - 공지사항의 제목입니다.
 * @param {userId: string} - 공지사항 작성자의 사용자 ID입니다.
 * @param {createdAt: string} - 공지사항의 생성일입니다.
 */
export interface NoticeTagsProps {
  index: number; // 페이지 인덱스 번호
  title: string; // 공지사항의 제목
  userId: string; // 공지사항 작성자의 사용자 ID
  createdAt: string; // 공지사항의 생성일
}
