/**
 * @interface NoticeLinkProps
 * @description
 * 공지사항 링크 컴포넌트에 전달되는 프로퍼티를 정의합니다. 각 프로퍼티는 공지사항의 세부 정보를 포함합니다.
 *
 * @param {string} noticeId - 공지사항의 고유 식별자입니다.
 * @param {number} index - 공지사항의 인덱스 번호입니다.
 * @param {string} title - 공지사항의 제목입니다.
 * @param {string} userId - 공지사항 작성자의 사용자 ID입니다.
 * @param {string} createdAt - 공지사항의 생성일입니다.
 */
export interface NoticeLinkProps {
  noticeId: string; // 공지사항의 고유 식별자
  index: number; // 공지사항의 인덱스 번호
  title: string; // 공지사항 제목
  userId: string; // 공지사항 작성자의 사용자 ID
  createdAt: string; // 공지사항의 생성일
}
