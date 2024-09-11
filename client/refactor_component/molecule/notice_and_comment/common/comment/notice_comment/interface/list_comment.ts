/**
 * @interface ListComment
 * @description
 * 댓글의 정보를 정의하는 인터페이스입니다.
 * 
 * @param {string} _id - 댓글의 고유 식별자입니다.
 * @param {string} userId - 댓글 작성자의 사용자 ID입니다.
 * @param {string} content - 댓글의 내용입니다.
 * @param {string} createdAt - 댓글이 작성된 날짜와 시간입니다.
 */
export interface ListComment {
  _id: string; // 댓글의 고유 식별자
  userId: string; // 댓글 작성자의 사용자 ID
  content: string; // 댓글의 내용
  createdAt: string; // 댓글 작성일
}
