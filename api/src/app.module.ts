import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LoggingMiddleware } from './middleware/logger.middleware';
import { AuthModule } from './api/Auth/auth.module';
import { UsersModule } from './api/users/users.module';
import { StructureController } from './api/tables/[tableName]/structure.controller';
import { DataController } from './api/tables/[tableName]/data.controller';
import { RowsController } from './api/tables/[tableName]/rows/rows.controller';
import { RowController } from './api/tables/[tableName]/rows/row.controller';
import { TablesController } from './api/tables/[tableName]/tables.controller';
import { DatabaseService } from './database/infrastructure/database.service';
import { TableService } from './database/infrastructure/table.service';
import { AccountModule } from './api/Account/Account.module';

import { StackModule } from './api/Stack/stack.module';
import { IssueModule } from './api/issue/issue.module';
import { ProjectModule } from './api/project/project.module';
import { TeamModule } from './api/_team/team.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    AccountModule,
    ProjectModule,
    TeamModule,
    StackModule,
    IssueModule,
  ],
  controllers: [
    StructureController,
    DataController,
    RowsController,
    RowController,
    TablesController,
  ],
  providers: [DatabaseService, TableService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
