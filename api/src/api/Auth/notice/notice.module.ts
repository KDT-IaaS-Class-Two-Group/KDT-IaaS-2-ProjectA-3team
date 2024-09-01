import { Module } from '@nestjs/common';

import { NoticeAdminController } from './presentation/controllers/admin/notice_admin_lookup.controller';
import { NoticeCommentController } from './presentation/controllers/comment/notice_comment.controller';
import { NoticeHomeController } from './presentation/controllers/crud/home_notice/home_notice_lookup.controller';
import { NoticeMainController } from './presentation/controllers/crud/main_notice/notice_cud.controller';
import { NoticeUserController } from './presentation/controllers/user/notice_user_lookup.controller';

import { DbConnect } from './infrastructure/database/db_connect/db_connect';
import { MongoQuery } from './infrastructure/database/db_query/mongo_query';
import { PostQuery } from './infrastructure/database/db_query/postgres_query';
import { NoticeCreate } from './application/notice_db_crud/create_notice/create_notice';
import { NoticeRead } from './application/notice_db_crud/read_notice/read_notice';
import { NoticeReadService } from './application/notice_service/notice_read.service';
import { HomeNoticeRead } from './application/notice_service/home_read.service';
import { NoticeCUDService } from './application/notice_service/notice_cud.service';
import { NoticeCommentService } from './application/notice_service/comment_crud.service';

@Module({
  controllers: [
    NoticeAdminController,
    NoticeCommentController,
    NoticeHomeController,
    NoticeMainController,
    NoticeUserController,
  ],
  providers: [
    DbConnect,
    MongoQuery,
    PostQuery,
    NoticeCreate,
    NoticeRead,
    NoticeReadService,
    HomeNoticeRead,
    NoticeCUDService,
    NoticeCommentService,
  ],
})
export class NoticeModule {}
