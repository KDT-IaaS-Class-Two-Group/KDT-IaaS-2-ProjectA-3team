import { Module } from '@nestjs/common';
import { LoginController } from './login/presentation/login.controller';
import { LoginService } from './login/login.service';
import { RegisterController } from './register/presentation/register.controller';
import { RegisterService } from './register/register.service';
import { LogoutController } from './login/presentation/logout.controller';

import { DatabaseService } from 'src/database/infrastructure/database.service';
import { VerifySessionController } from './verify/verifySession.controller';
import PendingUserRepository from 'src/database/pending_users.repository';
import { QueryBuilder } from 'src/database/infrastructure/queryBuilder';

import { NoticeModule } from './notice/notice.module';

@Module({
  imports: [NoticeModule],
  controllers: [
    LoginController,
    RegisterController,
    LogoutController,
    VerifySessionController,
  ],
  providers: [
    LoginService,
    RegisterService,

    DatabaseService,
    PendingUserRepository,
    QueryBuilder,
  ],
})
export class AuthModule {}
