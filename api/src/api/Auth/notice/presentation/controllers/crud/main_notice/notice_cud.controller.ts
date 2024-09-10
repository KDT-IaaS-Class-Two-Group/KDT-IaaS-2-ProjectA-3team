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
import { NoticeCUDService } from '../../../../application/notice_service/notice_cud.service';
import { NoticeDTO } from '../../../dto/notice.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Notice Main API')
@Controller('notice')
export class NoticeMainController {
  constructor(private readonly noticeCUDService: NoticeCUDService) {}

  /**
   * 공지사항을 작성하여 데이터베이스에 저장합니다.
   * @param {NoticeDTO} noticeDTO - 작성할 공지사항의 데이터.
   * @param {Request} req - 요청 객체, 사용자 세션 정보 포함.
   * @returns {Promise<any>} - 공지사항 작성 결과를 반환합니다.
   */
  @Post('send')
  @ApiOperation({
    summary: '공지사항 작성',
    description: '공지사항을 작성하여 데이터베이스에 저장하는 엔드포인트.',
  })
  async noticeCreate(@Body() noticeDTO: NoticeDTO, @Req() req: Request) {
    const session = req.session.user;
    const user_id = session?.user_id;
    const role = session?.role_name;
    return await this.noticeCUDService.createNotice(noticeDTO, user_id, role);
  }

  /**
   * 지정된 ID의 공지사항을 수정합니다.
   * @param {string} id - 수정할 공지사항의 ID.
   * @param {NoticeDTO} noticeDTO - 수정할 공지사항의 데이터.
   * @param {Request} req - 요청 객체, 사용자 세션 정보 포함.
   * @returns {Promise<any>} - 공지사항 수정 결과를 반환합니다.
   */
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
    return await this.noticeCUDService.updateNotice(
      id,
      noticeDTO,
      user_id,
      role,
    );
  }

  /**
   * 지정된 ID의 공지사항을 삭제합니다.
   * @param {string} id - 삭제할 공지사항의 ID.
   * @param {Request} req - 요청 객체, 사용자 세션 정보 포함.
   * @returns {Promise<any>} - 공지사항 삭제 결과를 반환합니다.
   */
  @Delete(':id')
  @ApiOperation({
    summary: '공지사항 삭제',
    description: '지정된 ID의 공지사항을 삭제하는 엔드포인트.',
  })
  async deleteNotice(@Param('id') id: string, @Req() req: Request) {
    const session = req.session.user;
    const user_id = session?.user_id;
    const role = session?.role_name;
    return await this.noticeCUDService.deleteNotice(id, user_id, role);
  }
}
