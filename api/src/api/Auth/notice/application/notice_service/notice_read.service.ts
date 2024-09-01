import { Injectable } from '@nestjs/common';
import { NoticeDTO } from '../../presentation/dto/notice.dto';
import { NoticeRead } from '../notice_db_crud/read_notice/read_notice';

@Injectable()
export class NoticeReadService {
  constructor(private readonly noticeRead: NoticeRead) {}
  async getNotices(page: number, limit: number) {
    const { notices, totalPages } = await this.noticeRead.noticeRead(
      NoticeDTO,
      'noticeTable',
      page,
      limit,
    );
    return { notices, totalPages };
  }

  async getAuthNotices() {
    return await this.noticeRead.noticeAuthRead(
      NoticeDTO,
      'noticeAuthTable',
      3,
    );
  }

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
