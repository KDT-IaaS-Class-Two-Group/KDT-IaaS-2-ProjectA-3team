import { Controller, Get } from '@nestjs/common';

import { NoticeService } from '../../../../application/notice.service';

import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('homenotice')
@ApiTags('Notice Home API')
export class NoticeHomeController {
  constructor(private readonly noticeService: NoticeService) {}
  @Get('user')
  @ApiOperation({
    summary: '홈 사용자 공지사항 조회',
    description:
      '홈 화면에서 사용자에게 보여줄 공지사항을 조회하는 엔드포인트.',
  })
  async homeUserNotice() {
    return await this.noticeService.homeUserNotices();
  }

  @Get('auth')
  @ApiOperation({
    summary: '홈 관리자 공지사항 조회',
    description:
      '홈 화면에서 관리자에게 보여줄 공지사항을 조회하는 엔드포인트.',
  })
  async homeAuthNotice() {
    return await this.noticeService.homeAuthNotices();
  }
}
