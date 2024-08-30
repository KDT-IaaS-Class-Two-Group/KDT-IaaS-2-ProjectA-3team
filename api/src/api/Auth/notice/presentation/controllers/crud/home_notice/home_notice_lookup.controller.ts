import {
  Controller,
  Get,
} from '@nestjs/common';

import { NoticeService } from '../../../../notice.service';

import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller()
@ApiTags('Notice API')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}
  @Get('homeusernotice')
  @ApiOperation({
    summary: '홈 사용자 공지사항 조회',
    description:
      '홈 화면에서 사용자에게 보여줄 공지사항을 조회하는 엔드포인트.',
  })
  async homeUserNotice() {
    return await this.noticeService.homeUserNotices();
  }

  @Get('homeauthnotice')
  @ApiOperation({
    summary: '홈 관리자 공지사항 조회',
    description:
      '홈 화면에서 관리자에게 보여줄 공지사항을 조회하는 엔드포인트.',
  })
  async homeAuthNotice() {
    return await this.noticeService.homeAuthNotices();
  }
}