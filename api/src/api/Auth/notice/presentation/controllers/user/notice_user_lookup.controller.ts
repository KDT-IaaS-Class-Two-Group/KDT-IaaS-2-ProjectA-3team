import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';

import { NoticeService } from '../../../notice.service';

import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Notice User API')
@Controller('notices')
export class NoticeUserController {
  constructor(private readonly noticeService: NoticeService) {}

  //사용자게시판 fetch
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
    const pageNumber = parseInt(page, 10); // 10진수로 변환
    const limitNumber = parseInt(limit, 10); // 10진수로 변환
    return await this.noticeService.getNotices(pageNumber, limitNumber);
  }
}