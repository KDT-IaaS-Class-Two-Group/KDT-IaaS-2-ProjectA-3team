import { Module } from '@nestjs/common';
import { UserManagementController } from '../presentation/user_controller/user_controller';
import { UserFollowController } from '../presentation/user_follow/user_follow_controller'; // UserFollowController 추가
import { UserCommandHandler } from '../application/command/handler/userCommand.handler';
import { UserQueryHandler } from '../application/query/handler/userQuery.handler';
import { QueryBuilder } from 'src/database/infrastructure/queryBuilder';
import { DatabaseService } from 'src/database/infrastructure/database.service';

@Module({
  controllers: [UserManagementController, UserFollowController], // UserFollowController 추가
  providers: [
    UserCommandHandler,
    UserQueryHandler,
    QueryBuilder,
    DatabaseService,
  ],
})
export class UsersModule {}
