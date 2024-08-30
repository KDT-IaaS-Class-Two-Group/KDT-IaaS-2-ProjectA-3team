import {
  Body,
  Controller,
  Post,
  Req,
  Put,
  Delete,
  Param,
} from '@nestjs/common';

import { Request } from 'express';

import { NoticeService } from '../../../../notice.service';

import { NoticeDTO } from 'src/api/Auth/notice/presentation/dto/notice.dto';

import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('notice')
@ApiTags('Notice Main API')
export class NoticeMainController {
  constructor(private readonly noticeService: NoticeService) {}
  //게시물 작성 fetch
  @Post('send')
  @ApiOperation({
    summary: '공지사항 작성',
    description: '공지사항을 작성하여 데이터베이스에 저장하는 엔드포인트.',
  })
  async noticeCreate(@Body() noticeDTO: NoticeDTO, @Req() req: Request) {
    const session = req.session.user;
    const user_id = session?.user_id;
    const role = session?.role_name;
    return await this.noticeService.createNotice(noticeDTO, user_id, role);
  }

  @Put(':id')
  @ApiOperation({
    summary: '공지사항 수정',
    description: '지정된 ID의 공지사항을 수정하는 엔드포인트.',
  })
  async updateNotice(
    @Param('id') id: string,
    @Body() noticeDTO: NoticeDTO,
    @Req() req: Request,
  ) {
    const session = req.session.user;
    const user_id = session?.user_id;
    const role = session?.role_name;
    return await this.noticeService.updateNotice(id, noticeDTO, user_id, role);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '공지사항 삭제',
    description: '지정된 ID의 공지사항을 삭제하는 엔드포인트.',
  })
  async deleteNotice(@Param('id') id: string, @Req() req: Request) {
    const session = req.session.user;
    const user_id = session?.user_id;
    const role = session?.role_name;
    return await this.noticeService.deleteNotice(id, user_id, role);
  }
}