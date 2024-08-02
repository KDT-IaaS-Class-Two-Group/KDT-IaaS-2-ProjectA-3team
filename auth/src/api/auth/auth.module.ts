import { Module } from '@nestjs/common';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { RegisterController } from './register/register.controller';
import { RegisterService } from './register/register.service';
import { LogoutController } from './login/logout.controller';

import { DatabaseService } from 'src/database/database.service';
import { VerifySessionController } from './verify/verifySession.controller';
import PendingUserRepository from 'src/database/pending_users.repository';
import { QueryBuilder } from 'src/database/queryBuilder';
import { NoticeService } from './notice/notice.service';
import { NoticeController } from './notice/notice.controller';

@Module({
  controllers: [
    LoginController,
    RegisterController,
    LogoutController,
    VerifySessionController,
    NoticeController,
  ],
  providers: [
    LoginService,
    RegisterService,

    DatabaseService,
    PendingUserRepository,
    QueryBuilder,
    NoticeService
  ],
})
export class AuthModule {}
