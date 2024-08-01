/**
 * * Class : NoticeDTO
 * 작성자 : @yun-21 / 2024-07-31
 * 편집자 : @yun-21 / 2024-07-31
 * Issue : yun-21
 * @class NoticeDTO


 * @param title: string, content: string
 * @description 
 */
export class NoticeDTO {
  title: string;
  content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}
