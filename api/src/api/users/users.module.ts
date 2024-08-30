import { Module } from '@nestjs/common';
import UsersRepository from 'src/database/application/users.repository';
import { DatabaseService } from 'src/database/infrastructure/database.service';
import { QueryBuilder } from 'src/database/infrastructure/queryBuilder';
import { UsersController } from './users.contorller';
UsersRepository;
@Module({
  controllers: [UsersController],
  providers: [QueryBuilder, DatabaseService],
})
export class UsersModule {}
