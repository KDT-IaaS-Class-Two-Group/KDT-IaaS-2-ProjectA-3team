import { Module } from '@nestjs/common';
import { RegsiterController } from './register/register.controller';
import { RegisterService } from './register/register.service';
import { DatabaseService } from 'src/database/database.service';
import { LoginService } from './login/login.service';

import { LoginController } from './login/login.controller';
import UserRepository from 'src/database/users.repository';
import { LogoutController } from './login/logout.controller';

@Module({
  imports: [],
  controllers: [RegsiterController, LoginController, LogoutController],
  providers: [RegisterService, DatabaseService, LoginService, UserRepository],
})
export class AuthModule {}
