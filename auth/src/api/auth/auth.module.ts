import { Module } from '@nestjs/common';
import { NoticeService } from './notice/notice.service';
import { NoticeController } from './notice/notice.controller';
@Module({
  controllers: [NoticeController],
  providers: [NoticeService],
})
export class AuthModule {}
