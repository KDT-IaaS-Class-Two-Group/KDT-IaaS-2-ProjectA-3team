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
    const user_id = req.session.user.user_id;
    if (!user_id) {
      return { status: 'fail', message: 'session is not 존재' };
    }
    return await this.noticeService.createNotice(noticeDTO, user_id);
  }
}
