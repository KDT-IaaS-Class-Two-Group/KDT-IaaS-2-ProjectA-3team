import { Module } from '@nestjs/common';
import { UsersController } from './users.contorller';
import UsersRepository from 'src/database/users.repository';
import { DatabaseService } from 'src/database/database.service';
import { QueryBuilder } from 'src/database/queryBuilder';
UsersRepository;
@Module({
  controllers: [UsersController],
  providers: [QueryBuilder, DatabaseService],
})
export class UsersModule {}
