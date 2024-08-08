import { Module } from '@nestjs/common';
import { CheckPendingUsers } from './application/services/checkPendingUser';
import { SetDefalutRole } from './application/services/setDefaultRole';
import { MigrationUserData } from './application/services/migrationUserData';
import { DeleteUsers } from './application/services/deleteUsers';
import { PendingUsersController } from './interface/pendingUsers.controller';
import { QueryBuilder } from 'src/database/queryBuilder';
import { DatabaseService } from 'src/database/database.service';

const application = [
  CheckPendingUsers,
  SetDefalutRole,
  MigrationUserData,
  DeleteUsers,
];

const DatabaseProvider = [QueryBuilder, DatabaseService];

@Module({
  providers: [...application, ...DatabaseProvider],
  controllers: [PendingUsersController],
})
export class PendingUsersModule {}
