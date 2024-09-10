import { Controller, Get, Query } from '@nestjs/common';
import { NoticeReadService } from '../../../application/notice_service/notice_read.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

/**
 * NoticeAdminController는 관리자 게시판의 공지사항을 조회하는 API 엔드포인트를 제공합니다.
 */
@ApiTags('Notice Admin API')
@Controller('authnotice')
export class NoticeAdminController {
  constructor(private readonly noticeReadService: NoticeReadService) {}

  /**
   * 관리자 게시판의 메인 공지사항 3개를 조회하는 엔드포인트입니다.
   * @returns {Promise<any>} - 메인 공지사항 3개의 리스트를 반환합니다.
   */
  @Get()
  @ApiOperation({
    summary: '관리자 게시판 공지사항 조회 (메인 3개)',
    description: '관리자 게시판의 공지사항을 메인에서 3개 조회하는 엔드포인트.',
  })
  async getAuthNotices() {
    return await this.noticeReadService.getAuthNotices();
  }

  /**
   * 관리자 게시판의 모든 공지사항을 페이지네이션하여 조회하는 엔드포인트입니다.
   * @param {string} page - 페이지 번호 (기본값: '1').
   * @param {string} limit - 페이지당 공지사항 수 (기본값: '8').
   * @returns {Promise<any>} - 요청된 페이지의 공지사항 리스트와 총 페이지 수를 반환합니다.
   */
  @Get('all')
  @ApiOperation({
    summary: '관리자 게시판 공지사항 조회 (모든 게시판)',
    description:
      '관리자 게시판의 모든 공지사항을 페이지네이션하여 조회하는 엔드포인트.',
  })
  async getAuthAllNotices(
    @Query('page') page: string = '1', // 쿼리 파라미터로부터 페이지 번호를 가져옵니다. 기본값은 '1'입니다.
    @Query('limit') limit: string = '8', // 쿼리 파라미터로부터 페이지당 항목 수를 가져옵니다. 기본값은 '8'입니다.
  ) {
    const pageNumber = parseInt(page, 10); // 페이지 번호를 10진수로 변환합니다.
    const limitNumber = parseInt(limit, 10); // 페이지당 항목 수를 10진수로 변환합니다.
    return await this.noticeReadService.getAuthAllNotices(
      pageNumber,
      limitNumber,
    );
  }
}
