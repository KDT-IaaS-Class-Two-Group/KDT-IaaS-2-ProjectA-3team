import { Module } from '@nestjs/common';
import { CheckPendingUsers } from './pending_users/application/services/checkPendingUser';
import { SetDefalutRole } from './pending_users/application/services/setDefaultRole';
import { MigrationUserData } from './pending_users/application/services/migrationUserData';
import { DeleteUsers } from './pending_users/application/services/deleteUsers';
import { PendingUsersController } from './pending_users/interface/pendingUsers.controller';
import { QueryBuilder } from 'src/database/queryBuilder';
import { DatabaseService } from 'src/database/database.service';
import { EmployeeRepository } from './common/interface/Repository/employee.repository';
import { PendingUserRepository } from './common/interface/Repository/pending_users.repository';
import { UserRepository } from './common/interface/Repository/Users.repository';

const application = [
  CheckPendingUsers,
  SetDefalutRole,
  MigrationUserData,
  DeleteUsers,
];

const DatabaseProvider = [
  QueryBuilder,
  DatabaseService,
  EmployeeRepository,
  PendingUserRepository,
  UserRepository,
];

@Module({
  providers: [...application, ...DatabaseProvider],
  controllers: [PendingUsersController],
})
export class AccountModule {}
