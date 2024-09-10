import { Injectable } from '@nestjs/common';
import { NoticeDTO } from '../../presentation/dto/notice.dto';
import { NoticeRead } from '../notice_db_crud/read_notice/read_notice';

/**
 * @class HomeNoticeRead
 * @description 홈 화면에서 공지사항을 가져오는 서비스 클래스
 * @param {NoticeRead} noticeRead - 공지사항 읽기 서비스
 */
@Injectable()
export class HomeNoticeRead {
  constructor(private readonly noticeRead: NoticeRead) {}

  /**
   * @method homeUserNotices
   * @description 사용자 공지사항을 읽어오는 메서드 (최근 5개)
   * @returns {Promise<Array>} 최근 5개의 사용자 공지사항을 반환
   */
  async homeUserNotices() {
    // noticeRead 서비스의 noticeAuthRead 메서드를 호출하여 'noticeTable'에서 최근 5개의 사용자 공지사항을 가져옴
    return await this.noticeRead.noticeAuthRead(NoticeDTO, 'noticeTable', 5);
  }

  /**
   * @method homeAuthNotices
   * @description 관리자용 공지사항을 읽어오는 메서드 (최근 5개)
   * @returns {Promise<Array>} 최근 5개의 관리자 공지사항을 반환
   */
  async homeAuthNotices() {
    // noticeRead 서비스의 noticeAuthRead 메서드를 호출하여 'noticeAuthTable'에서 최근 5개의 관리자 공지사항을 가져옴
    return await this.noticeRead.noticeAuthRead(
      NoticeDTO,
      'noticeAuthTable',
      5,
    );
  }
}
