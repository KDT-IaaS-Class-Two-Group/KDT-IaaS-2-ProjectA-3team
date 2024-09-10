import { Controller, Get, Query } from '@nestjs/common';
import { NoticeReadService } from '../../../application/notice_service/notice_read.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Notice User API')
@Controller('notices')
export class NoticeUserController {
  constructor(private readonly noticeReadService: NoticeReadService) {}

  /**
   * 사용자 게시판의 공지사항을 페이지네이션하여 조회합니다.
   * @param {string} page - 조회할 페이지 번호 (기본값: 1).
   * @param {string} limit - 페이지당 공지사항 수 (기본값: 5).
   * @returns {Promise<any>} - 페이지네이션된 공지사항 목록과 총 페이지 수를 반환합니다.
   */
  @Get()
  @ApiOperation({
    summary: '사용자 게시판 공지사항 조회',
    description:
      '사용자 게시판의 공지사항을 페이지네이션하여 조회하는 엔드포인트.',
  })
  async getAllNotices(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ) {
    const pageNumber = parseInt(page, 10); // 페이지 번호를 10진수로 변환
    const limitNumber = parseInt(limit, 10); // 페이지당 공지사항 수를 10진수로 변환
    return await this.noticeReadService.getNotices(pageNumber, limitNumber);
  }
}
