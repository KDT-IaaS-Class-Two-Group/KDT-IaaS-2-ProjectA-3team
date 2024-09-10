/**
 * * Class : CommentDTO
 * 작성자 : @yun-21 / 2024-08-30
 * 편집자 : @yun-21 / 2024-08-30
 * @class CommentDTO
 * @description 데이터 전송 객체(DTO)로, 댓글의 정보를 담기 위한 클래스입니다.
 * @param {string} postId - 댓글이 달린 게시물의 ID
 * @param {string} userId - 댓글 작성자의 사용자 ID
 * @param {string} content - 댓글 내용
 * @param {string} createdAt - 댓글 작성일시
 * @example
 * const comment = new CommentDTO('123', 'user1', 'This is a comment.', '2024-09-08T12:00:00Z');
 */
export class CommentDTO {
  postId: string;
  userId: string;
  content: string;
  createdAt: string;

  /**
   * @constructor
   * @param {string} postId - 댓글이 달린 게시물의 ID
   * @param {string} userId - 댓글 작성자의 사용자 ID
   * @param {string} content - 댓글 내용
   * @param {string} createdAt - 댓글 작성일시
   */
  constructor(
    postId: string,
    userId: string,
    content: string,
    createdAt: string,
  ) {
    this.postId = postId; // 댓글이 달린 게시물의 ID를 초기화합니다.
    this.userId = userId; // 댓글 작성자의 사용자 ID를 초기화합니다.
    this.content = content; // 댓글 내용을 초기화합니다.
    this.createdAt = createdAt; // 댓글 작성일시를 초기화합니다.
  }
}
