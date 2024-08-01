import { Body, Controller, Post, Get } from '@nestjs/common';

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
  async noticeCreate(@Body() noticeDTO: NoticeDTO) {
    return await this.noticeService.createNotice(noticeDTO);
  }
}
