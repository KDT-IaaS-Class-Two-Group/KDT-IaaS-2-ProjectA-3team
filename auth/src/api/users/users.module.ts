import { Module } from '@nestjs/common';
import { UsersController } from './users.contorller';
import UsersRepository from 'src/database/users.repository';
import { DatabaseService } from 'src/database/database.service';
UsersRepository;
@Module({
  controllers: [UsersController],
  providers: [UsersRepository, DatabaseService],
})
export class UsersModule {}
