import { Module } from '@nestjs/common';
import { LoginController } from './login/presentation/login.controller';
import { LoginService } from './login/login.service';
import { RegisterController } from './register/presentation/register.controller';
import { RegisterService } from './register/register.service';
import { LogoutController } from './login/presentation/logout.controller';
import { NoticeController } from './notice/presentation/controllers/notice.controller';
import { NoticeService } from './notice/notice.service';

import { DatabaseService } from 'src/database/database.service';
import { VerifySessionController } from './verify/verifySession.controller';
import PendingUserRepository from 'src/database/pending_users.repository';
import { QueryBuilder } from 'src/database/queryBuilder';

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
    NoticeService,
  ],
})
export class AuthModule {}
