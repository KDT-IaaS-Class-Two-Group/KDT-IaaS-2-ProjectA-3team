import { Controller, Get, Query } from '@nestjs/common';
import { NoticeReadService } from '../../../application/notice_service/notice_read.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Notice Admin API')
@Controller('authnotice')
export class NoticeAdminController {
  constructor(private readonly noticeReadService: NoticeReadService) {}
  //관리자게시판 fetch (게시판 main 3개)
  @Get()
  @ApiOperation({
    summary: '관리자 게시판 공지사항 조회 (메인 3개)',
    description: '관리자 게시판의 공지사항을 메인에서 3개 조회하는 엔드포인트.',
  })
  async getAuthNotices() {
    return await this.noticeReadService.getAuthNotices();
  }

  //관리자게시판 fetch (관리자 총 게시판)
  @Get('all')
  @ApiOperation({
    summary: '관리자 게시판 공지사항 조회 (모든 게시판)',
    description:
      '관리자 게시판의 모든 공지사항을 페이지네이션하여 조회하는 엔드포인트.',
  })
  async getAuthAllNotices(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '8',
  ) {
    const pageNumber = parseInt(page, 10); // 10진수로 변환
    const limitNumber = parseInt(limit, 10); // 10진수로 변환
    return await this.noticeReadService.getAuthAllNotices(
      pageNumber,
      limitNumber,
    );
  }
}
