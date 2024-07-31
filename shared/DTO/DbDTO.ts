/**
 * * Class : NoticeDTO
 * 작성자 : @yun-21 / 2024-07-31
 * 편집자 : @yun-21 / 2024-07-31
 * Issue : yun-21
 * @class NoticeDTO


 * @param userId:string, title: string, content: string, date: Date
 * @description 
 */
export class NoticeDTO {
  userId: string;
  title: string;
  content: string;
  date: Date;
  
  constructor(userId:string ,title: string, content: string, date: Date) {
    this.userId = userId;
    this.title = title;
    this.content = content;
    this.date = date;
  }
}