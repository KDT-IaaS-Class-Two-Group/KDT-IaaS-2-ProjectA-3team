import { Module } from '@nestjs/common';
import { RegsiterController } from './register/register.controller';
import { RegisterService } from './register/register.service';
import { DatabaseService } from 'src/database.service';
import { LoginService } from './login/login.service';
import { AuthService } from './auth.service';
import { LoginController } from './login/login.controller';

@Module({
  imports: [],
  controllers: [RegsiterController, LoginController],
  providers: [RegisterService, DatabaseService, LoginService, AuthService],
})
export class AuthModule {}
