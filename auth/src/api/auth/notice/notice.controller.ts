import {
  Body,
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { NoticeService } from './notice.service';

import { NoticeDTO } from '@shared/DTO/DbDTO';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService){}

  // @Post()
  // async notice()
}