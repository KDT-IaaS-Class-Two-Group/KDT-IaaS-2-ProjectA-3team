import { Module } from '@nestjs/common';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { RegisterController } from './register/register.controller';
import { RegisterService } from './register/register.service';
import { LogoutController } from './login/logout.controller';
import UserRepository from 'src/database/users.repository';

import { DatabaseService } from 'src/database/database.service';
import { VerifySessionController } from './verify/verifySession.controller';

@Module({
  controllers: [
    LoginController,
    RegisterController,
    LogoutController,
    VerifySessionController,
  ],
  providers: [LoginService, RegisterService, UserRepository, DatabaseService],
})
export class AuthModule {}
