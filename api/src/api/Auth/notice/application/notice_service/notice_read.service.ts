import { Injectable } from '@nestjs/common';
import { NoticeDTO } from '../../presentation/dto/notice.dto';
import { NoticeRead } from '../notice_db_crud/read_notice/read_notice';

/**
 * @class NoticeReadService
 * @description 공지사항을 읽어오는 기능을 제공하는 서비스 클래스
 */
@Injectable()
export class NoticeReadService {
  constructor(private readonly noticeRead: NoticeRead) {}

  /**
   * @method getNotices
   * @description 공지사항 목록을 페이지네이션으로 가져오는 메서드
   * @param {number} page - 현재 페이지 번호
   * @param {number} limit - 페이지당 항목 수
   * @returns {Promise<{notices: any[], totalPages: number}>} 공지사항 목록과 총 페이지 수 반환
   */
  async getNotices(page: number, limit: number) {
    const { notices, totalPages } = await this.noticeRead.noticeRead(
      NoticeDTO,
      'noticeTable',
      page,
      limit,
    );
    return { notices, totalPages };
  }

  /**
   * @method getAuthNotices
   * @description 인증된 공지사항 목록을 가져오는 메서드 (페이지네이션 없이)
   * @returns {Promise<any[]>} 인증된 공지사항 목록 반환
   */
  async getAuthNotices() {
    return await this.noticeRead.noticeAuthRead(
      NoticeDTO,
      'noticeAuthTable',
      3,
    );
  }

  /**
   * @method getAuthAllNotices
   * @description 인증된 공지사항을 페이지네이션으로 가져오는 메서드
   * @param {number} page - 현재 페이지 번호
   * @param {number} limit - 페이지당 항목 수
   * @returns {Promise<{notices: any[], totalPages: number}>} 공지사항 목록과 총 페이지 수 반환
   */
  async getAuthAllNotices(page: number, limit: number) {
    const { notices, totalPages } = await this.noticeRead.noticeRead(
      NoticeDTO,
      'noticeAuthTable',
      page,
      limit,
    );
    return { notices, totalPages };
  }
}
