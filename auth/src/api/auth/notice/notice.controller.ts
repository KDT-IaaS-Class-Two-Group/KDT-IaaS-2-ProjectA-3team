import { Body, Controller, Post, Get, Req } from '@nestjs/common';

import { Request } from 'express';

import { NoticeService } from './notice.service';

import { NoticeDTO } from '@shared/DTO/DbDTO';

@Controller()
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Get('notices')
  async getAllNotices() {
    return await this.noticeService.getNotices();
  }

  @Post('send')
  async noticeCreate(@Body() noticeDTO: NoticeDTO, @Req() req: Request) {
    const session = req.session.user;
    const user_id = session.user_id;
    const role = session.role_name;
    console.log(user_id,role);
    return await this.noticeService.createNotice(noticeDTO, user_id, role);
  }
}