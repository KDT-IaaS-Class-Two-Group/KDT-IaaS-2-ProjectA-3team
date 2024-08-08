import { Module } from '@nestjs/common';
import { CheckPendingUsers } from './application/services/checkPendingUser';
import { SetDefalutRole } from './application/services/setDefaultRole';
import { MigrationUserData } from './application/services/migrationUserData';
import { DeleteUsers } from './application/services/deleteUsers';
import { PendingUsersController } from './interface/pendingUsers.controller';
import { QueryBuilder } from 'src/database/queryBuilder';
import { DatabaseService } from 'src/database/database.service';
import { EmployeeRepository } from '../common/interface/Repository/employee.repository';
import { PendingUserRepository } from '../common/interface/Repository/pending_users.repository';
import { UserRepository } from '../common/interface/Repository/Users.repository';

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
export class PendingUsersModule {}
