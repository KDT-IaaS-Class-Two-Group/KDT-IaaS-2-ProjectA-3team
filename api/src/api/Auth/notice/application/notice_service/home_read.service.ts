import { Injectable } from '@nestjs/common';
import { NoticeDTO } from '../../presentation/dto/notice.dto';
import { NoticeRead } from '../notice_db_crud/read_notice/read_notice';

@Injectable()
export class HomeNoticeRead {
  constructor(private readonly noticeRead: NoticeRead) {}
  async homeUserNotices() {
    return await this.noticeRead.noticeAuthRead(NoticeDTO, 'noticeTable', 5);
  }

  async homeAuthNotices() {
    return await this.noticeRead.noticeAuthRead(
      NoticeDTO,
      'noticeAuthTable',
      5,
    );
  }
}
