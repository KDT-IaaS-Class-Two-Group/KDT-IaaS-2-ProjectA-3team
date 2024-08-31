/**
 * * Class : CommentDTO
 * 작성자 : @yun-21 / 2024-08-30
 * 편집자 : @yun-21 / 2024-08-30
 * Issue : 
 * @class CommentDTO


 * @param postId: string, userId: string, content: string, createdAt: string
 * @description 
 */
export class CommentDTO {
  postId: string;
  userId: string;
  content: string;
  createdAt: string;

  constructor(postId: string, userId: string, content: string, createdAt: string) {
    this.postId = postId;
    this.userId = userId;
    this.content = content;
    this.createdAt = createdAt;
  }
}