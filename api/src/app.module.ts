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
import { DatabaseService } from './database/database.service';
import { TableService } from './database/table.service';
import { PendingUsersModule } from './api/Account/pending_users/pendingUsers.module';
import { ProjectModule } from './api/project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    PendingUsersModule,
    ProjectModule,
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
