// infrastructure/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from '../presentation/users.controller';
import { UserCommandHandler } from '../application/command/handler/userCommand.handler';
import { UserQueryHandler } from '../application/query/handler/userQuery.handler';
import { QueryBuilder } from 'src/database/queryBuilder';

@Module({
  controllers: [UsersController],
  providers: [UserCommandHandler, UserQueryHandler, QueryBuilder],
})
export class UsersModule {}
