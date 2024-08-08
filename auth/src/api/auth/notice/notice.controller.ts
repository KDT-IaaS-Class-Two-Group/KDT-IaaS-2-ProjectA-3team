import { Body, Controller, Post, Get, Req, Put, Delete, Param } from '@nestjs/common';

import { Request } from 'express';

import { NoticeService } from './notice.service';

import { NoticeDTO } from '@shared/DTO/DbDTO';


@Controller()
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  //사용자게시판 fetch
  @Get('notices')
  async getAllNotices() {
    return await this.noticeService.getNotices();
  }

  //관리자게시판 fetch
  @Get('authnotices')
  async getAuthNotices() {
    return await this.noticeService.getAuthNotices();
  }
  
  //게시물 작성 fetch
  @Post('send')
  async noticeCreate(@Body() noticeDTO: NoticeDTO, @Req() req: Request) {
    const session = req.session.user;
    const user_id = session?.user_id;
    const role = session?.role_name;
    return await this.noticeService.createNotice(noticeDTO, user_id, role);
  }

  @Put('notice/:id')
  async updateNotice(@Param('id') id: string, @Body() noticeDTO: NoticeDTO, @Req() req: Request) {
    const session = req.session.user;
    const user_id = session?.user_id;
    const role = session?.role_name;
    return await this.noticeService.updateNotice(id, noticeDTO, user_id, role);
  }

  @Delete('notice/:id')
  async deleteNotice(@Param('id') id: string, @Req() req: Request) {
    const session = req.session.user;
    const user_id = session?.user_id;
    const role = session?.role_name;
    return await this.noticeService.deleteNotice(id, user_id, role);
  }
}
