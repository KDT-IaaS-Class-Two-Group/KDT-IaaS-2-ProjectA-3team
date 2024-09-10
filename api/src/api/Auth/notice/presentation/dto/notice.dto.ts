/**
 * * Class : NoticeDTO
 * 작성자 : @yun-21 / 2024-07-31
 * 편집자 : @yun-21 / 2024-08-30
 * @class NoticeDTO
 * @description 공지사항의 정보를 담기 위한 데이터 전송 객체(DTO) 클래스입니다.
 * @param {string} title - 공지사항 제목
 * @param {string} content - 공지사항 내용
 * @param {string} createdAt - 공지사항 작성일시
 * @param {string} user_id - 공지사항 작성자의 사용자 ID
 * @param {string} role - 공지사항 작성자의 역할
 * @param {string} updatedAt - 공지사항 수정일시
 * @example
 * const notice = new NoticeDTO('공지 제목', '공지 내용', '2024-09-08T12:00:00Z', 'user1', 'admin', '2024-09-09T12:00:00Z');
 */
export class NoticeDTO {
  title: string;
  content: string;
  createdAt: string;
  user_id: string;
  role: string;
  updatedAt: string;

  /**
   * @constructor
   * @param {string} title - 공지사항 제목
   * @param {string} content - 공지사항 내용
   * @param {string} createdAt - 공지사항 작성일시
   * @param {string} user_id - 공지사항 작성자의 사용자 ID
   * @param {string} role - 공지사항 작성자의 역할
   * @param {string} updatedAt - 공지사항 수정일시
   */
  constructor(
    title: string,
    content: string,
    createdAt: string,
    user_id: string,
    role: string,
    updatedAt: string,
  ) {
    this.title = title; // 공지사항 제목을 초기화합니다.
    this.content = content; // 공지사항 내용을 초기화합니다.
    this.createdAt = createdAt; // 공지사항 작성일시를 초기화합니다.
    this.user_id = user_id; // 공지사항 작성자의 사용자 ID를 초기화합니다.
    this.role = role; // 공지사항 작성자의 역할을 초기화합니다.
    this.updatedAt = updatedAt; // 공지사항 수정일시를 초기화합니다.
  }
}
