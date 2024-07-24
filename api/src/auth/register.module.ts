import { Module } from '@nestjs/common';
import { RegsiterController } from './register.controller';
import { RegisterService } from './register.service';
import { DatabaseService } from 'src/database.service';

@Module({
  imports: [],
  controllers: [RegsiterController],
  providers: [RegisterService, DatabaseService],
})
export class RegisterModule {}
