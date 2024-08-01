import { Body, Controller, Post } from '@nestjs/common';

import { NoticeService } from './notice.service';

import { NoticeDTO } from '@shared/DTO/DbDTO';

@Controller('send')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Post()
  async noticeCreate(@Body() noticeDTO: NoticeDTO) {
    return await this.noticeService.createNotice(noticeDTO);
  }
}
