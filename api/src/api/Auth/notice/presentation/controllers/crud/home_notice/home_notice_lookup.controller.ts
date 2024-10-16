import { Controller, Get } from '@nestjs/common';
import { HomeNoticeRead } from '../../../../application/notice_service/home_read.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Notice Home API')
@Controller('homenotice')
export class NoticeHomeController {
  constructor(private readonly homeNoticeService: HomeNoticeRead) {}

  /**
   * 홈 화면에서 사용자에게 보여줄 공지사항을 조회합니다.
   * @returns {Promise<any>} - 사용자에게 보여줄 공지사항 목록을 반환합니다.
   */
  @Get('user')
  @ApiOperation({
    summary: '홈 사용자 공지사항 조회',
    description:
      '홈 화면에서 사용자에게 보여줄 공지사항을 조회하는 엔드포인트.',
  })
  async homeUserNotice() {
    return await this.homeNoticeService.homeUserNotices();
  }

  /**
   * 홈 화면에서 관리자에게 보여줄 공지사항을 조회합니다.
   * @returns {Promise<any>} - 관리자에게 보여줄 공지사항 목록을 반환합니다.
   */
  @Get('auth')
  @ApiOperation({
    summary: '홈 관리자 공지사항 조회',
    description:
      '홈 화면에서 관리자에게 보여줄 공지사항을 조회하는 엔드포인트.',
  })
  async homeAuthNotice() {
    return await this.homeNoticeService.homeAuthNotices();
  }
}
