import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/infrastructure/database.service';
import { QueryBuilder } from 'src/database/infrastructure/queryBuilder';
import { ProjectCommandController } from './presentation/interface/project.command.controller';
import { ProjectQueryController } from './presentation/interface/project.query.controller';
import { ProjectCommandHandler } from './application/command/handler/project_command.handler';
import { ProjectQueryHandler } from './application/query/handler/project_query.handler';
import { ProjectRepository } from './infrastructure/repository/project.repository';

@Module({
  imports: [],
  controllers: [ProjectCommandController, ProjectQueryController],
  providers: [
    QueryBuilder,
    DatabaseService,
    ProjectCommandHandler,
    ProjectQueryHandler,
    ProjectRepository,
  ],
})
export class ProjectModule {}
