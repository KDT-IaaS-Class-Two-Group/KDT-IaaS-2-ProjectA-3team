import { Module } from '@nestjs/common';
import { UserManagementController } from '../presentation/user_controller/user_controller';
import { UserCommandHandler } from '../application/command/handler/userCommand.handler';
import { UserQueryHandler } from '../application/query/handler/userQuery.handler';
import { QueryBuilder } from 'src/database/infrastructure/queryBuilder';
import { DatabaseService } from 'src/database/infrastructure/database.service'; // DatabaseService 임포트

@Module({
  controllers: [UserManagementController],
  providers: [
    UserCommandHandler,
    UserQueryHandler,
    QueryBuilder,
    DatabaseService,
  ],
})
export class UsersModule {}
