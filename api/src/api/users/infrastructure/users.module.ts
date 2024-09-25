import { Module } from '@nestjs/common';
import { UserManagementController } from '../presentation/user_controller/user_controller';
import { UserFollowController } from '../presentation/user_follow/user_follow_controller';
import { UserCommandHandler } from '../application/command/handler/userCommand.handler';
import { UserQueryHandler } from '../application/query/handler/userQuery.handler';
import { QueryBuilder } from 'src/database/infrastructure/queryBuilder';
import { DatabaseService } from 'src/database/infrastructure/database.service';
import { AttendanceController } from '../presentation/Attendance/attendance_controller';

@Module({
  controllers: [
    UserManagementController,
    UserFollowController,
    AttendanceController,
  ],
  providers: [
    UserCommandHandler,
    UserQueryHandler,
    QueryBuilder,
    DatabaseService,
  ],
  exports: [QueryBuilder, DatabaseService],
})
export class UsersModule {}
