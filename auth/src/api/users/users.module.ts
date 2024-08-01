import { Module } from '@nestjs/common';

import UsersRepository from 'src/database/users.repository';
import { DatabaseService } from 'src/database/database.service';
import { QueryBuilder } from 'src/database/queryBuilder';
import { UsersController } from './users.contorller';
UsersRepository;
@Module({
  controllers: [UsersController],
  providers: [QueryBuilder, DatabaseService],
})
export class UsersModule {}
