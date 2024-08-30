import { Module } from '@nestjs/common';

import { NoticeAdminController } from './presentation/controllers/admin/notice_admin_lookup.controller';
import { NoticeCommentController } from './presentation/controllers/comment/notice_comment.controller';
import { NoticeHomeController } from './presentation/controllers/crud/home_notice/home_notice_lookup.controller';
import { NoticeMainController } from './presentation/controllers/crud/main_notice/notice_cud.controller';
import { NoticeUserController } from './presentation/controllers/user/notice_user_lookup.controller';

import { NoticeService } from './notice.service';


@Module({
  controllers: [
    NoticeAdminController,
    NoticeCommentController,
    NoticeHomeController,
    NoticeMainController,
    NoticeUserController,
  ],
  providers: [
    NoticeService,
  ],
})
export class NoticeModule {}
