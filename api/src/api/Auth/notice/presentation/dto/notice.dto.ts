/**
 * * Class : NoticeDTO
 * 작성자 : @yun-21 / 2024-07-31
 * 편집자 : @yun-21 / 2024-08-30
 * Issue : 
 * @class NoticeDTO


 * @param title: string, content: string
 * @description 
 */
export class NoticeDTO {
  title: string;
  content: string;
  createdAt: string;
  user_id: string;
  role: string;
  updatedAt: string;

  constructor(title: string, content: string, createdAt: string, user_id: string, role: string, updatedAt: string) {
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.user_id = user_id;
    this.role = role;
    this.updatedAt = updatedAt;
  }
}